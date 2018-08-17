import particlesJson from './particles.json';
// const xxtea = require('common/xxtea.js');
require('particles.js');
particlesJS('particles-js', particlesJson);

$('.js-trans').on('click',function(){
  $(this).closest('.login-main').removeClass('active').siblings().addClass('active');
});


$('#register').validate({
  rules: {
    nickname: {
      required: true,
    },
    password: {
      required: true,
    }
  }
});