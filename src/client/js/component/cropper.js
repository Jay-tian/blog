require('tsj-jcrop/js/Jcrop.min.js');

module.exports = function($element) {
  let $box = $(`<div id="cropper" class="cropper">
    <div class="cropper-image">
      <i class="iconfont icon-loadingspinner circle"></i>
    </div>
  </div>`);
  if ($('body').find('#cropper').length) {
    return;
  }
  $('body').append($box);

  let img = new Image();
  img.src = $element.attr('src');
  if (img.complete) {
    console.log(img);
  } else {
    img.onload = function () {
      console.log(img);
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