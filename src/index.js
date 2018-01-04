const { promisify } = require('util');
const fs = require('fs');
const execa = require('execa');
const { getPackageManager, getPkgData } = require('./utils');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const MODULE_NAME = 'semantic-release-build';

async function replaceVersion(newVersion, logger) {
  logger.log('Replace package.json version with new version');
  const { path: pkgPath } = await getPkgData();
  const pkg = await readFile(pkgPath);

  const newPkg = { ...JSON.parse(pkg), version: newVersion };
  await writeFile(pkgPath, JSON.stringify(newPkg, null, 2));

  return async function restoreVersion() {
    logger.log('Restoring original package.json');
    await writeFile(pkgPath, pkg);
  };
}

async function publish(opts, { nextRelease: { version }, logger }) {
  if (opts != null && opts.flags != null && typeof opts.flags !== 'string') {
    return Promise.reject(
      new Error(`[${MODULE_NAME}] options.flags must be a string`),
    );
  }

  const pm = await getPackageManager();
  const flags =
    opts && opts.flags
      ? [pm === 'npm' ? '--' : null, ...opts.flags.split(' ')].filter(Boolean)
      : [];

  const restore = await replaceVersion(version, logger);
  await execa(pm, ['run', 'build', ...flags]);
  return restore();
}

exports.publish = publish;
