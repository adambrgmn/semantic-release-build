/* eslint-disable no-underscore-dangle */
const fs = jest.genMockFromModule('fs');

fs.__accessValue = true;

fs.__setAccess = val => {
  fs.__accessValue = val;
};

fs.access = function access(path, opts, callback) {
  setImmediate(() => {
    if (fs.__accessValue) {
      callback(null);
    } else {
      const err = new Error('No access');
      callback(err);
    }
  });
};

fs.realpath = function realpath(path, opts, callback) {
  setImmediate(() => {
    callback(null, path);
  });
};

fs.constants = {
  F_OK: 'F_OK',
};

module.exports = fs;
