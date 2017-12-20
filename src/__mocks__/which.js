/* eslint-disable no-underscore-dangle */

function which(bin, callback) {
  setImmediate(() => {
    if (which.__hasBin) callback(null, bin);
    callback(new Error(`${bin} no found`));
  });
}

which.__hasBin = true;
which.__setBinAccess = val => {
  which.__hasBin = val;
};

module.exports = which;
