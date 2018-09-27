const jsonformat = require('./json-format.js');
let $show = $('.show');

$('#json-src').on('change', function() {
  let $this = $(this);
  try{
    window.jsonlint.parse($this.val());
    $show.html(jsonformat($this.val()))  ;
  } catch(e){
    $show.html('<p style="color: red">' + e + '</p>');
  }
});
