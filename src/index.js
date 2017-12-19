const spawn = require('cross-spawn');
const { getPackageManager } = require('./utils');

const MODULE_NAME = 'semantic-release-build';

async function publish(options) {
  if (
    options != null &&
    options.flags != null &&
    typeof options.flags !== 'string'
  )
    throw new Error(`[${MODULE_NAME}] options.flags must be a string`);

  const pm = await getPackageManager();
  const flags =
    options && options.flags
      ? [pm === 'npm' ? '--' : null, ...options.flags.split(' ')].filter(
          Boolean,
        )
      : [];

  const result = spawn.sync(pm, ['run', 'build', ...flags]);

  if (result.status > 0) throw new Error(`[${MODULE_NAME}] Error running `);
}

module.exports = { publish };
