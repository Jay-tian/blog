
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

$('#comment-form').validate({
  rules: {
    content: {
      required: true,
    },
  },
  messages: {
    content: {
      required: '评论不能唯恐'
    }
  }
});


