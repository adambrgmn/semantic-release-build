/* eslint-disable no-underscore-dangle */

class ExecaError extends Error {
  constructor(msg, { stdout, stderr, code, killed, signal, cmd, timedOut }) {
    super(msg);
    this.stdout = stdout;
    this.stderr = stderr;
    this.code = code;
    this.killed = killed;
    this.signal = signal;
    this.cmd = cmd;
    this.timedOut = timedOut;
  }
}

const execa = jest.fn((cmd, args) => {
  const ret = {
    stdout: 'Success',
    stderr: '',
    code: 0,
    failed: false,
    killed: false,
    signal: null,
    cmd: `${cmd} ${args.join(' ')}`,
    timedOut: false,
  };

  if (execa.__shouldThrow) {
    const msg = `${ret.cmd} failed`;
    const err = new ExecaError(msg, {
      ...ret,
      stdout: '',
      stderr: msg,
      code: 1,
      failed: true,
    });

    return Promise.reject(err);
  }

  return Promise.resolve(ret);
});

execa.__shouldThrow = false;
execa.__setShouldThrow = b => {
  execa.__shouldThrow = b;
};

module.exports = execa;
