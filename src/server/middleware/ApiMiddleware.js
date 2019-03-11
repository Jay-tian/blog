let middleware =  async (ctx, next) => {
  if (0 == ctx.request.url.indexOf('/api/')) {
    ctx.body =  JSON.stringify({});
    ctx.response.status = 404;
    return;
  }
  
  await next();
};

module.exports = {
  priority: 6,
  middleware: middleware,
};