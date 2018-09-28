let $article = $('#article');
let uploader = require('../../component/uploader.js');
let Cropper = require('../../component/cropper.js');

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
upload.on('uploadSuccess', function(file, response ) {
  $('#cover').val(response.url);
  $('#uploader-list').html(`<img id="articleCover" width="200" class="mb2 img-responsive" src="${response.url}" />`);
});


$article.validate({
  rules: {
    contentMd: {
      required: true,
    },
    title: {
      required: true,
      minlength: 5,
      maxlength: 25,
    },
    subTitle: {
      required: true,
      minlength: 10,
      maxlength: 50,
    },
  },
  messages: {
    subTitle: {
      minlength: '不能小于10个字符',
      maxlength: '不能大于50个字符',
    },
    title: {
      minlength: '不能小于5个字符',
      maxlength: '不能大于25个字符',
    },
  }
});

$('#crop').on('click',function() {
  let $this = $(this);
  let callback = function(data){
    $('#cover').val(data.path);
    if ($this.data('save')) {
      $.post($this.data('save'), {cover: data.path}, function() {
      });
    }
  };

  new Cropper($($this.data('target')), {aspectRatio: $this.data('rate'), url: $this.data('cropperUrl')}, callback);
});