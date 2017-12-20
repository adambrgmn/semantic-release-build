const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const which = promisify(require('which'));
const readPkgUp = require('read-pkg-up');

const access = promisify(fs.access);
const realpath = promisify(fs.realpath);

const hasFile = async file => {
  const { path: pkgPath } = await readPkgUp({
    cwd: await realpath(process.cwd(), null),
  });

  const projectDir = path.dirname(pkgPath);
  const fromRoot = (...p) => path.join(projectDir, ...p);

  try {
    await access(fromRoot(file), fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

const getPackageManager = async () => {
  try {
    await which('yarn');
  } catch (err) {
    return 'npm';
  }

  const hasYarnLockFile = await hasFile('yarn.lock');
  if (hasYarnLockFile) return 'yarn';

  return 'npm';
};

module.exports = {
  hasFile,
  getPackageManager,
};
