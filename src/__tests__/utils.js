/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const which = require('which');
const { hasFile, getPackageManager } = require('../utils');

jest.mock('fs');
jest.mock('which');
jest.mock('read-pkg-up');

test('utils.hasFile', async () => {
  await expect(hasFile('package.json')).resolves.toBe(true);
  
  fs.__setAccess(false);
  await expect(hasFile('no-file.js')).resolves.toBe(false);
});

test('utils.getPackageManager', async () => {
  fs.__setAccess(true);
  which.__setBinAccess(true);
  expect(await getPackageManager()).toBe('yarn');

  fs.__setAccess(false);
  which.__setBinAccess(true);
  expect(await getPackageManager()).toBe('npm');

  fs.__setAccess(true);
  which.__setBinAccess(false);
  expect(await getPackageManager()).toBe('npm');

  fs.__setAccess(false);
  which.__setBinAccess(false);
  expect(await getPackageManager()).toBe('npm');
});
