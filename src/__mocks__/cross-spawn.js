/* eslint-disable no-underscore-dangle */
const spawn = jest.genMockFromModule('cross-spawn');

spawn.__status = 0;
spawn.__setStatus = s => {
  spawn.__status = s;
};

spawn.sync = jest.fn(() => ({ status: spawn.__status }));

module.exports = spawn;
