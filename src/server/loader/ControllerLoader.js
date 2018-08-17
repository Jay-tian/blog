const parameters = require('./ConfigLoader.js');
const glob = require('glob');
const path = require('path');

let controllers = {}; 
let controllerPaths = glob.sync(path.join(parameters.serverPath, '/controller/**/*Controller.js'));
controllerPaths.forEach(function(controlerPath) {
  let baseName = path.basename(controlerPath, 'Controller.js');
  let Controller = require(controlerPath);

  controllers[baseName] = new Controller();
}, this);

module.exports = controllers;
