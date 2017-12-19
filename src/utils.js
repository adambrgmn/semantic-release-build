const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const which = promisify(require('which'));
const readPkgUp = require('read-pkg-up');

const exists = promisify(fs.exists);
const realpath = promisify(fs.realpath);

const hasFile = async file => {
  const { path: pkgPath } = await readPkgUp({
    cwd: await realpath(process.cwd()),
  });

  const projectDir = path.dirname(pkgPath);
  const fromRoot = (...p) => path.join(projectDir, ...p);
  return exists(fromRoot(file));
};

const getPackageManager = async () => {
  try {
    await which('yarn');
  } catch (err) {
    return which('npm');
  }

  if (await hasFile('yarn.lock')) return 'yarn';
  return 'npm';
};

module.exports = {
  getPackageManager,
};
