let $article = $('#article');
editormd({
  id: 'content',
  path: '/dist/js/libs/editor.md/lib/',
  height: '100%',
  width: '100%',
  imageUpload: true,
  saveHTMLToTextarea: true,
  imageUploadURL: $article.data('imageSave'),
});

// let article = new Article($form);

// document.onkeydown=function(e)   {
//   if (e.keyCode == 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
//     $('#article').submit();
//     return false;
//   }
// };

$article.validate({
  invalidHandler: function(data, validate) {
    let errorTip = validate.errorMap[Object.keys(validate.errorMap)[0]];
    if (errorTip) {
      alert(errorTip);
    }
  },
  rules: {
    contentMd: {
      required: true,
    },
    title: {
      required: true,
      minlength: 10,
      maxlength: 25,
    },
  },
  messages: {
    contentMd: {
      required: '请输入正文内容',
    },
    title: {
      required: '请输入标题',
      minlength: '标题不能小于10个字符',
      maxlength: '标题不能大于25个字符',
    },
  }
});