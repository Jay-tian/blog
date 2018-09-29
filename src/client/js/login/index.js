import particlesJson from './particles.json';
require('particles.js');
particlesJS('particles-js', particlesJson);
let register;

$('.js-trans').on('click',function(){
  if (!register) {
    $('#register').validate({
      rules: {
        nickname: {
          required: true,
          remote: {},
        },
        password: {
          required: true,
        },
        email: {
          required: true,
          email: true,
          remote: {},
        }
      },
      messages: {
        nickname: {
          remote: '昵称已占用！'
        },
        email: {
          remote: '邮箱已占用！'
        }
      }
    });
  }

  $(this).closest('.login-main').removeClass('active').siblings().addClass('active');
});

$('#login').validate({
  rules: {
    nickname: {
      required: true,
    },
    password: {
      required: true,
    }
  }
});

