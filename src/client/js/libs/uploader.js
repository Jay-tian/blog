const WebUploader = require('webuploader');

let uploader = function(config = {}) {
  config = Object.assign({
    fileSizeLimit: 2*1024*1024,
    auto: true,
    server: window.app.imageUploadUrl,
    pick: '#filePicker',
    // 只允许选择图片文件。
    accept: {
      title: 'Images',
      extensions: 'gif,jpg,jpeg,bmp,png,ico',
      mimeTypes: 'image/*'
    }
  }, config);
  
  return WebUploader.create(config);
};

module.exports = uploader;