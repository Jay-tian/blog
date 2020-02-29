require('clipboard.js/dist/clipboard.min.js');
$('#copy').on('click', function(){
  window.Clipboard.copy($('#output').val(),function(){
    alert('复制成功');
  });
});

$('#input').on('blur',function(){
  var content = $('#input').val();
  var array = content.split(/[\s\n]/);
  $('#count').text(array.length);
  $('#output').val('\''+array.join('\',\'')+'\'');
});