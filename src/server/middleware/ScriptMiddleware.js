let middleware =  async (ctx, next) => {
  ctx.state.scriptList = {};
  
  await next();
};

module.exports = {
  priority: 0,
  middleware: middleware,
};