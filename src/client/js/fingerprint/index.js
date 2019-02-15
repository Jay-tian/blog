let Fingerprint = require('web-fingerprint');

let fingerprint = new Fingerprint();

$('#change').on('click', function() {
  fingerprint.resetText($('#text').val());
});