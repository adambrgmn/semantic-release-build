/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import which from 'which';
import * as utils from '../utils';

jest.mock('read-pkg-up');
jest.mock('fs');
jest.mock('which');

beforeEach(() => {
  jest.resetAllMocks();
});

test('utils.getPkgData', async () => {
  const data = await utils.getPkgData();
  expect(data.path).toBe('/package.json');
  expect(data.cached).toBe(false);

  expect((await utils.getPkgData()).cached).toBe(true);
});

test('utils.hasFile', async () => {
  await expect(utils.hasFile('package.json')).resolves.toBe(true);

  fs.__setAccess(false);
  await expect(utils.hasFile('no-file.js')).resolves.toBe(false);
});

test('utils.getPackageManager', async () => {
  fs.__setAccess(true);
  which.__setBinAccess(true);
  expect(await utils.getPackageManager()).toBe('yarn');

  fs.__setAccess(false);
  which.__setBinAccess(true);
  expect(await utils.getPackageManager()).toBe('npm');

  fs.__setAccess(true);
  which.__setBinAccess(false);
  expect(await utils.getPackageManager()).toBe('npm');

  fs.__setAccess(false);
  which.__setBinAccess(false);
  expect(await utils.getPackageManager()).toBe('npm');
});
