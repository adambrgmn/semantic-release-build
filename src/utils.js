const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const which = promisify(require('which'));
const readPkgUp = require('read-pkg-up');

const access = promisify(fs.access);

let pkgData = null;
const getPkgData = () => {
  if (pkgData) return Promise.resolve(pkgData);

  return readPkgUp().then(data => {
    pkgData = { ...data, cached: true };
    return { ...data, cached: false };
  });
};

const hasFile = async file => {
  const { path: pkgPath } = await getPkgData();
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
    const [hasBin, hasLockFile] = await Promise.all([
      which('yarn'),
      hasFile('yarn.lock'),
    ]);

    return hasBin && hasLockFile ? 'yarn' : 'npm';
  } catch (err) {
    return 'npm';
  }
};

module.exports = {
  getPkgData,
  hasFile,
  getPackageManager,
};
