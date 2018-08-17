const koaBody = require('koa-body');
const path = require('path');
const parameters = require('../loader/ConfigLoader.js');
const toolkit = require('../../common/toolkit.js');

module.exports = {
  priority: 0,
  middleware: koaBody({
    multipart: true, // 支持文件上传
    formidable:{
      keepExtensions: true,    // 保持文件的后缀
      maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
      hash: 'md5',
      onFileBegin:(name, file) => {
        let ext = file.name.split('.');
        ext = ext[ext.length - 1];
        let filePath = ['jpg', 'png', 'gif', 'jpeg'].indexOf(ext) >= 0 ? 'images' : 'files';

        filePath += '/'+toolkit.getYMD();
        filePath = path.join(parameters.rootPath, 'public/data/'+filePath);
        toolkit.checkDirExist(filePath);

        let fileName = file.path.split('/');
        fileName = fileName[fileName.length - 1];
        file.path = `${filePath}/${fileName}`;
      },
      onError:(err)=>{
        console.log(err);
      }
    }}),
};