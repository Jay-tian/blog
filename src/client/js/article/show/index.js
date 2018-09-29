const hljs = require('highlightjs');

$('pre code').each(function(i, block) {
  hljs.highlightBlock(block);
});