const version = require('../../../config/version.js');
require('bootstrap');

window.app = {
  version: version,
};

$('.js-delete').on('click', function() {
  let url = $(this).data('url');
  $.post(url, function() {
    alert(123);
  });
});