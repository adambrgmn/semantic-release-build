const { publish } = require('.');
const spawn = require('cross-spawn');

jest.mock('./utils', () => ({
  getPackageManager: () => Promise.resolve('npm'),
}));

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
