const spawn = require('cross-spawn');
const { getPackageManager } = require('./utils');

const MODULE_NAME = 'semantic-release-build';

function publish(options) {
  if (
    options != null &&
    options.flags != null &&
    typeof options.flags !== 'string'
  ) {
    return Promise.reject(
      new Error(`[${MODULE_NAME}] options.flags must be a string`),
    );
  }

  return getPackageManager().then(pm => {
    const flags =
      options && options.flags
        ? [pm === 'npm' ? '--' : null, ...options.flags.split(' ')].filter(
            Boolean,
          )
        : [];

    const result = spawn.sync(pm, ['run', 'build', ...flags]);
    if (result.status > 0) {
      return Promise.reject(
        new Error(`[${MODULE_NAME}] Error running "${pm} run build"`),
      );
    }

    return Promise.resolve();
  });
}

module.exports = { publish };
