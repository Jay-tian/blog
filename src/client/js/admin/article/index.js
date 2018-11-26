$('.js-publish').on('click', function(){
  $.post($(this).data('url'), function(){
    window.location.reload();
  });
});