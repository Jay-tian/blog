module.exports = {
  priority: 0,
  middleware: async (ctx, next) => {
    try{
        await next()
    } catch(err){
      ctx.app.emit('error', err, ctx);
      if ([500,403,404].indexOf(err.status) >= 0) {
        return ctx.render(`common/error/${err.status}.twig`, {
          error: err,
        });
      }

      return ctx.render(`common/error/error.twig`, {
        error: err,
      });
    }
  }
};