require('tsj-jcrop/js/Jcrop.min.js');

module.exports  = class Cropper {
  constructor($element, config) {
    if ($('body').find('#cropper').length) {
      return;
    }
    this.jcropApi = {};
    this.$element = $element;
    this._createImage();
    this.config = Object.assign({
      trueSize: [this.img.width, this.img.height],
      setSelect: [0, 0, this.img.width, this.img.height],
      aspectRatio: 1,
      keySupport: false,
      allowSelect: false,
      onSelect: (data) => {
        this.selectData = data;
      }
    }, config);

    this.init();
  }

  _createImage() {
    let img = new Image();
    img.src = this.$element.attr('src');
    this.img = img;
  }

  init() {
    let img = new Image();
    img.src = this.$element.attr('src');
    if (img.complete) {
      this._initImage(img);
    } else {
      img.onload = function () {
        this._initImage(img);
      };
    }
  }

  _initImage(img) {
    let $body = $('body');
    let $box = $(`<div id="cropper" class="cropper">
      <div class="cropper-image">
        <i class="iconfont icon-loadingspinner circle"></i>
      </div>
    </div>`);
    $body.append($box);

    let $cropper = $box.find('.cropper-image');
    let standardWidth = $body.width() * 0.5;
    let standardHeight = $body.height() * 0.5;
    let originImageWidth = img.width;
    if (img.width > standardWidth) {
      $cropper.width(standardWidth);
      $cropper.height(img.height/(img.width/standardWidth));
    }
    if ($cropper.height() > standardHeight) {
      if (img.height/standardHeight > img.width/standardHeight) {
        $cropper.width(img.width/(img.height/standardHeight));
      }
      $cropper.height(standardHeight);
    }

    $cropper.css({marginLeft:$cropper.width()/-2, marginTop: $cropper.height()/-2 });

    $cropper.html(img).append('<span class=\'cropper-btn btn btn-primary\'>截图</span>');
    let self = this;
    $(img).Jcrop(this.config, function() {
      self.jcropApi = this;
    });

    $('#cropper').on('click', '.cropper-btn', () => {
      let rate = originImageWidth/$(img).width();
      let selection = this.jcropApi.ui.selection.last;
      let cropperConfig = {
        width: rate*selection.w,
        height: rate*selection.h,
        x: selection.x,
        y: selection.y,
      };
      
    });
  }
};