require('tsj-jcrop/js/Jcrop.min.js');

module.exports = function($element) {
  // $box = $('<div id="cropper" class="cropper"></div>');
  if ($('body').find('#cropper').length) {
    return;
  }

  let img = new Image();
  img.src = $element.attr('src');
  if (img.complete) {
    console.log();
  } else {
    img.onload = function () {
      console.log();
    };
  }

  $element.Jcrop({
    trueSize: [200, 200],
    setSelect: [0, 0, 10, 10],
    aspectRatio: 0.5,
    keySupport: false,
    allowSelect: false,
    onSelect() {
    }
  });
};