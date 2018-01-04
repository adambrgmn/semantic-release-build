/* eslint-disable no-underscore-dangle */

let __packageManager = 'npm';
const __setPackageManager = pm => {
  __packageManager = pm;
};

const getPackageManager = async () => __packageManager;

const getPkgData = async () => ({ path: '/package.json' });

module.exports = {
  getPkgData,
  getPackageManager,
  __setPackageManager,
};
