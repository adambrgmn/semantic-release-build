/* eslint-disable no-underscore-dangle */
import execa from 'execa';
import * as utils from '../utils';
import { publish } from '../index';

jest.mock('fs');
jest.mock('execa');
jest.mock('../utils');

const logger = { log: jest.fn() };
const getReleaseConfig = () => ({ nextRelease: { version: '1.0.0' }, logger });

beforeEach(() => {
  jest.resetAllMocks();
});

test('Calls execa', async () => {
  await publish({}, getReleaseConfig());
  expect(execa.mock.calls).toMatchSnapshot();
});

test('Accepts flags as config', async () => {
  await publish({ flags: '--out-dir build' }, getReleaseConfig());
  expect(execa.mock.calls).toMatchSnapshot();
});

test('Skips extra -- when packagemanger is yarn', async () => {
  utils.__setPackageManager('yarn');
  await publish({ flags: '--out-dir build' }, getReleaseConfig());
  expect(execa.mock.calls).toMatchSnapshot();
});

test('Throws if options.flags is set but not as string', async () => {
  await expect(publish({ flags: 123 }, getReleaseConfig())).rejects.toThrow();
});

test('Throws if spawn return non-0 status', async () => {
  execa.__setShouldThrow(true);
  await expect(publish()).rejects.toThrow();
});
