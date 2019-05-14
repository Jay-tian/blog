
$('#reply').on('click', function () {
  $('.reply-form').removeAttr('style');
});

$('.js-delete-reply').on('click', function(){
  $('.reply-target').addClass('hide');
  $('#replyId').val(0);
});



// $('#register').validate({
//   rules: {
//     nickname: {
//       required: true,
//       remote: {},
//     },
//     password: {
//       required: true,
//     },
//     email: {
//       required: true,
//       email: true,
//       remote: {},
//     }
//   },
//   messages: {
//     nickname: {
//       remote: '昵称已占用！'
//     },
//     email: {
//       remote: '邮箱已占用！'
//     }
//   }
// });


