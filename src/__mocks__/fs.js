/* eslint-disable no-underscore-dangle */
const fs = jest.genMockFromModule('fs');

fs.__accessValue = true;

fs.__setAccess = val => {
  fs.__accessValue = val;
};

fs.access = function access(...args) {
  const callback = args[args.length - 1];
  setImmediate(() => {
    if (fs.__accessValue) {
      callback(null);
    } else {
      const err = new Error('No access');
      callback(err);
    }
  });
};

fs.readFile = function readFile(...args) {
  const callback = args[args.length - 1];
  setImmediate(() => {
    callback(
      null,
      JSON.stringify({
        name: 'module-name',
        version: '0.0.0-development',
      }),
    );
  });
};

fs.writeFile = function writeFile(...args) {
  const callback = args[args.length - 1];
  setImmediate(() => callback(null));
};

fs.constants = {
  F_OK: 'F_OK',
};

module.exports = fs;
