/* eslint-disable no-underscore-dangle */

const { publish } = require('..');
const spawn = require('cross-spawn');
const utils = require('../utils');

jest.mock('cross-spawn');
jest.mock('../utils');

test('Calling cross-spawn', async () => {
  await publish();
  const { calls } = spawn.sync.mock;

  expect(calls.length).toBe(1);
  expect(calls[0]).toEqual(['npm', ['run', 'build']]);
});

test('Accepts flags as config', async () => {
  await publish({ flags: '--out-dir build' });
  const { calls } = spawn.sync.mock;

  expect(calls.length).toBe(2);
  expect(calls[1]).toEqual([
    'npm',
    ['run', 'build', '--', '--out-dir', 'build'],
  ]);
});

test('Skips extra -- when packagemanger is yarn', async () => {
  utils.__setPackageManager('yarn');
  await publish({ flags: '--out-dir build' });
  const { calls } = spawn.sync.mock;

  expect(calls.length).toBe(3);
  expect(calls[2]).toEqual([
    'yarn',
    ['run', 'build', '--out-dir', 'build'],
  ]);
});

test('Throws if options.flags is set but not as string', async () => {
  await expect(publish({ flags: 123 })).rejects.toThrow();
});

test('Throws if spawn return non-0 status', async () => {
  spawn.__setStatus(1);
  await expect(publish()).rejects.toThrow();
});
