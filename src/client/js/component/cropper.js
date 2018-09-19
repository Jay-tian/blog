require('tsj-jcrop/js/Jcrop.min.js');

module.exports = function($element) {
  
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