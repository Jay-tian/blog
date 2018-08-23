let $article = $('#article');
let uploader = require('libs/uploader.js');

editormd({
  id: 'content',
  path: '/dist/js/libs/editor.md/lib/',
  height: '100%',
  width: '100%',
  imageUpload: true,
  saveHTMLToTextarea: true,
  imageUploadURL: $article.data('imageSave'),
});

let upload = uploader();

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
upload.on( 'uploadSuccess', function(file, response ) {
  $('#cover').val(response.url);
  $('#uploader-list').html(`<img width="200" class="mb2 img-responsive" src="${response.url}" />`);
});


$article.validate({
  rules: {
    contentMd: {
      required: true,
    },
    title: {
      required: true,
      minlength: 6,
      maxlength: 25,
    },
    subTitle: {
      required: true,
      minlength: 10,
      maxlength: 50,
    },
  },
  messages: {
    contentMd: {
      required: '请输入正文内容',
    },
    subTitle: {
      required: '请输入副标题',
      minlength: '标题不能小于10个字符',
      maxlength: '标题不能大于50个字符',
    },
    title: {
      required: '请输入标题',
      minlength: '标题不能小于6个字符',
      maxlength: '标题不能大于25个字符',
    },
  }
});