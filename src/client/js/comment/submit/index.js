
$('#reply').on('click', function () {
  $('.reply-form').removeAttr('style');
});

$('.js-delete-reply').on('click', function(){
  $('.reply-target').addClass('hide');
  $('#replyId').val(0);
});

$('body').on('click', '.js-reply-btn', function(){
  let id = $(this).data('id');
  $('.reply-target').removeClass('hide').find('.reply-target-content').text(id+'楼');
  $('#replyId').val(id);
  location.href = '#comments-action'; 
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


