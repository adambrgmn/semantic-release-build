/* eslint-disable no-underscore-dangle */

let __packageManager = 'npm';
const __setPackageManager = pm => {
  __packageManager = pm;
};

const getPackageManager = async () => __packageManager;

module.exports = {
  getPackageManager,
  __setPackageManager,
};
