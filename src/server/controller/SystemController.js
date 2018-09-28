const BaseController = require('koa-symphony/src/controller/BaseController');

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

  imageCropper() {
    return async (ctx, next) => {
      let result = await global.symphony.cropper(global.symphony.parameters.rootPath + '/public'+ctx.request.body.value, ctx.request.body);
      ctx.body = {success: 1, path: '/'+result.replace(global.symphony.parameters.publicPath, '')};

      return;
    };
  }
}

module.exports = SystemController;