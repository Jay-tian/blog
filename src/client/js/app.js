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