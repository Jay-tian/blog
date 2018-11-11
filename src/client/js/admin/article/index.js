$('.js-publish').on('click', function(){
  $.post($(this).data('url'), function(){
    alert('发布成功');
    window.location.reload();
  });
});