const spawn = jest.genMockFromModule('cross-spawn');
spawn.sync = jest.fn(() => ({ status: 0 }));
module.exports = spawn;
