const process = require('process');
const path = require('path');
const fs = require('fs');
const toolkit = require('../../common/toolkit.js');

let rootPath = process.cwd();
let parametersPath = path.join(rootPath, 'config/parameters.js');
let config;

let exists = fs.existsSync(parametersPath);
if(exists){
  config = require(parametersPath);

  if (!toolkit.requires(config, ['rootPath', 'serverPath', 'version'])) {
    throw new Error('请正确填写配置文件！');
  }
} else {
  throw new Error('请填写配置文件！');
}
config['viewPath'] = path.join(config.serverPath, '/view/');
config['env'] =  process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
module.exports = config;