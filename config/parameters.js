const process = require('process');
const path = require('path');
const version = require('./version.js');
let rootPath = process.cwd();

module.exports = {
  rootPath: rootPath,
  serverPath: path.join(rootPath + '/src/server/'),
  version: version,
  // distAddress: 'http://dist.koa-dev.com',
};