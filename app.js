let app = require('koa-symphony/src/kernel.js');
app.listen(3000, '0.0.0.0');

// var schedule = require('node-schedule');

// function scheduleCronstyle(){
//   schedule.scheduleJob('1-10 * * * * *', function(){
//     console.log('scheduleCronstyle:' + new Date());
//   }); 
// }

// scheduleCronstyle();



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