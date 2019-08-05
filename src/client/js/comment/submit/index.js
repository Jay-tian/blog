
$('#reply').on('click', function () {
  $('.reply-form').removeAttr('style');
});

$('.js-delete-reply').on('click', function(){
  $('.reply-target').addClass('hide');
  $('#replyId').val(0);
});

$('body').on('click', '.js-reply-btn', function(){
  let floor = $(this).data('floor');
  let id = $(this).data('id');
  $('.reply-target').removeClass('hide').find('.reply-target-content').text(floor+'楼');
  $('#replyId').val(id);
  location.href = '#comments-action'; 
});

$('body').on('click', '.js-reply-all', function(){

  let $box = $(this).closest('.comments-item').find('.reply-box');
  if ($.trim($box.text())) {
    $box.show();
    return;
  }
  $.get($(this).data('url'), function(res){
    $box.html(res);
  });
});

$('#comment-form').validate({
  rules: {
    content: {
      required: true,
    },
  },
  messages: {
    content: {
      required: '评论不能为空'
    }
  }
});


