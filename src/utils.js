const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const which = promisify(require('which'));
const readPkgUp = require('read-pkg-up');

const access = promisify(fs.access);
const realpath = promisify(fs.realpath);

const hasFile = file =>
  realpath(process.cwd(), null)
    .then(cwd => readPkgUp({ cwd }))
    .then(({ path: pkgPath }) => {
      const projectDir = path.dirname(pkgPath);
      const fromRoot = (...p) => path.join(projectDir, ...p);

      return access(fromRoot(file), fs.constants.F_OK).then(
        () => true,
        () => false,
      );
    });

const getPackageManager = () =>
  Promise.all([which('yarn'), hasFile('yarn.lock')])
    .then(([hasBin, hasLockFile]) => (hasBin && hasLockFile ? 'yarn' : 'npm'))
    .catch(() => 'npm');

module.exports = {
  hasFile,
  getPackageManager,
};
