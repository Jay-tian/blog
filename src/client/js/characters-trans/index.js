let pinyin = require('pinyin');

class Py {
  constructor($element) {
    this.$element = $element;
    this.showPy(this.$element.val());
    this.init();
  }

  init() {
    let self = this;
    this.$element.on('input propertychange', function(){
      self.showPy();
    });

    $('.js-donwload').on('click', function() {
      window.open($(this).data('url')+'?data='+$('.js-py').text());
    });
  }

  showPy() {
    $('.py-hz').html(this.buildHtml()); 
    $('.js-py').text(JSON.stringify(this.pyJson)); 
  }

  buildHtml() {
    let hz = this.$element.val();
    let pys = pinyin(hz, {
      heteronym: true,              // 启用多音字模式
      segment: true 
    });
    console.log(pys);
    hz = hz.split('');
    let hzs = [], hzTmp = '';
    var re= /^[\u4e00-\u9fa5]+$/;
    hz.forEach((element) => {
      if(re.test(element)) {
        if (hzTmp) {
          hzs.push(hzTmp);
          hzTmp = '';
        }
        hzs.push(element);
      } else {
        hzTmp += element;
      }
    }); 
    if (hzTmp) {
      hzs.push(hzTmp);
      hzTmp = '';
    }

    let pyJson = {};

    let result = '';
    hzs.forEach((element, index) => {
      let py = pys[index];
      let showpy = py.length > 1 ? py[0] + '(多音)' : py[0];
      let showpys = py.join('／');

      let s = `<span>${element}<span class='py' title= ${showpys} >${showpy}</span></span>`;
      result += s;
      pyJson[index] = {
        zh: element,
        py: py
      };
    });

    this.pyJson = pyJson;

    return result;
  }
}

new Py($('#cct'));