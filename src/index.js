/* eslint-disable global-require, import/no-dynamic-require */
const path = require('path');
const fs = require('fs');
const spawn = require('cross-spawn');
const which = require('which');
const readPkgUp = require('read-pkg-up');
const pkg = require('../package.json');

const { path: pkgPath } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});

const resolveBin = (
  modName,
  { executable = modName, cwd = process.cwd() } = {},
) => {
  let pathFromWhich;
  try {
    pathFromWhich = fs.realpathSync(which.sync(executable));
  } catch (_error) {
    // ignore _error
  }

  try {
    const modPkgPath = require.resolve(`${modName}/package.json`);
    const modPkgDir = path.dirname(modPkgPath);
    const { bin } = require(modPkgPath);
    const binPath = typeof bin === 'string' ? bin : bin[executable];
    const fullPathToBin = path.join(modPkgDir, binPath);
    if (fullPathToBin === pathFromWhich) {
      return executable;
    }
    return fullPathToBin.replace(cwd, '.');
  } catch (error) {
    if (pathFromWhich) {
      return executable;
    }
    throw error;
  }
};

const appDirectory = path.dirname(pkgPath);
const fromRoot = (...p) => path.join(appDirectory, ...p);
const hasFile = (...p) => fs.existsSync(fromRoot(...p));

const getPackageManagerBin = () => {
  try {
    resolveBin('yarn');
  } catch (err) {
    return 'npm';
  }

  if (hasFile('yarn.lock')) return 'yarn';
  return 'npm';
};

async function publish(options) {
  if (typeof options.flags !== 'string')
    throw new Error(`[${pkg.name}] options.flags must be a string`);

  const pm = getPackageManagerBin();
  const flags = options.flags
    ? [pm === 'npm' ? '--' : null, ...options.flags.split(' ')].filter(Boolean)
    : [];

  const result = spawn.sync(pm, ['run', 'build', ...flags]);

  if (result.status > 0) throw new Error(`[${pkg.name}] Error running `);
}

module.exports = { publish };
