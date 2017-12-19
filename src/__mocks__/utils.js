const getPackageManager = jest.fn(() => Promise.resolve('yarn'));
module.exports = { getPackageManager };
