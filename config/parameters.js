const process = require('process');
const path = require('path');
const version = require('./version.js');
let rootPath = process.cwd();

module.exports = {
  rootPath: rootPath,
  serverPath: path.join(rootPath + '/src/server/'),
  publicPath: path.join(rootPath + '/public/'),
  version: version,
  // distAddress: 'http://dist.koa-dev.com',
  email: {
    service: 'qq',
    port: 465,
    secureConnection: true,
    auth: {
      user: '806338233@qq.com',
      pass: '**********',
    }
  }
};