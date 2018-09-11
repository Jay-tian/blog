module.exports = {
  priority: 5,
  middleware: async (ctx, next) => {
    let user = ctx.state.user;
    if (user.get('locked') && user.isLogin() && 0 != ctx.request.url.indexOf('/register/email/verify')) {
      return ctx.render(`common/error/user-verify.twig`, {
      });
    }

    return next();
  }
};