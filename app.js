let app = require('koa-symphony/src/kernel.js');
app.listen(3000);

// let app = require('koa-symphony/src/kernel.js');
// var Router = require('koa-router');
// var router = new Router();

 
// const websockify = require('koa-websocket');
// const wsOptions = {};
// app = websockify(app, wsOptions);
 
// router.get('websocket', (ctx) => {
//   ctx.websocket.on('message', function(message) {
//     console.log(message);
//   });
// });


// app.ws.use(router.allowedMethods());
// app.listen(3000);