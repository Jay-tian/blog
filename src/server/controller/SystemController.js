const BaseController = require('./BaseController');
const fs = require('fs');
const os = require('os');
const path = require('path');

class SystemController extends BaseController {
  constructor(){
    super();
  }

  imageUpload() {
    return async (ctx, next) => {
      let subKey = 'public';
      let files = ctx.request.files;
      let url = '';

      for (let value in files) {
        let index =  files[value].path.indexOf(subKey) + subKey.length;
        url =  files[value].path.substring(index);
      }

      ctx.body = {
        message: '上传成功', 
        success: 1, 
        url: url,
      };
      
      return;
    };      
  }
}

module.exports = SystemController;