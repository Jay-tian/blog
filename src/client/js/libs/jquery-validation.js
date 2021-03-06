import 'jquery-validation';

$.validator.setDefaults({
  errorClass: 'form-error-message',
  errorElement: 'p',
  onkeyup: false,
  ignore: '',
  ajax: false,
  currentDom: null,
  errorPlacement: function(error, element) {
    let $text = `<div class="form-error">
      <div class="content">
        <i class="iconfont icon-gantanhao"></i>
        ${error.text()} 
      </div>
    </div>`;
    element.closest('.form-group').find('.form-error').remove();
    element.closest('.form-group').append($text);
  },
  unhighlight: function(element) {
    $(element).removeClass('form-error-message').closest('.form-group').find('.form-error').remove();
  },
  invalidHandler: function(data, validator) {
    const errorNum = validator.numberOfInvalids();
    if (errorNum) {
      $(validator.errorList[0].element).focus();
    }
  },
});

$.extend($.validator.messages, {
  required: '这是必填字段',
  remote: '请修正此字段',
  email: '请输入有效的邮箱',
  url: '请输入有效的网址',
  date: '请输入有效的日期',
  dateISO: '请输入有效的日期 (YYYY-MM-DD)',
  number: '请输入有效的数字',
  digits: '只能输入数字',
  creditcard: '请输入有效的信用卡号码',
  equalTo: '你的输入不相同',
  extension: '请输入有效的后缀',
  maxlength: $.validator.format('最多可以输入 {0} 个字符'),
  minlength: $.validator.format('最少要输入 {0} 个字符'),
  rangelength: $.validator.format('请输入长度在 {0} 到 {1} 之间的字符串'),
  range: $.validator.format('请输入范围在 {0} 到 {1} 之间的数值'),
  max: $.validator.format('请输入不大于 {0} 的数值'),
  min: $.validator.format('请输入不小于 {0} 的数值')
});

$.validator.addMethod('remote', function(value, element, params) {
  if (!value) {
    return this.optional(element);
  }

  let url = $(element).data('url') ? $(element).data('url') : null;
  if (!url) {
    return true;
  }
  url = decodeURIComponent(url).replace('$', value);

  let type = params.type ? params.type : 'GET';
  this.valueCache ? this.valueCache : {};
  let cacheKey = url + type;

  if (cacheKey in this.valueCache) {
    $.validator.messages.remote = this.valueCache[cacheKey].message;
    return this.optional(element) || this.valueCache[cacheKey].isSuccess;
  }

  $.ajax({
    url: url,
    async: false,
    type: type,
    dataType: 'json',
    success: (response) => {
      console.log(response);
      this.valueCache[cacheKey] = {};
      this.valueCache[cacheKey].isSuccess = !response;
    }
  });
  
  return this.optional(element) || this.valueCache[cacheKey].isSuccess;

});