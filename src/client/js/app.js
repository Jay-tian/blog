const version = require('../../../config/version.js');
require('bootstrap');

window.app = {
  version: version,
};

$('.js-delete').on('click', function() {
  let url = $(this).data('url');
  let $target = $($(this).data('target'));
  if (confirm('确定要删除吗')) {
    $.post(url, function() {
      $('body').trigger('js-delete', $target);
    });
  }
});


$('body').on('click', '.js-page-nav a', function(){
  let $a = $(this);
  let $elm = $a.closest('.js-page-nav');
  console.log($elm);
  if ($elm.data('async')) {
    $.get($a.attr('href'), function(res){
      $($elm.data('box')).html(res);
    });

    return false;
  }
});