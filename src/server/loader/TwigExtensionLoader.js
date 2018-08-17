const glob = require('glob');
const Twig = require('twig');
const path = require('path');
const parameters = require('./ConfigLoader.js');


let extensionFunctions = {
  function: 'extendFunction',
  filter: 'extendFilter',
};

let extensions = glob.sync(path.join(__dirname, '../twig-extension/**/*.js'));
extensions = extensions.concat(glob.sync(path.join(parameters.serverPath, 'twig-extension/**/*.js')));

(function(extensions){
  for (var key in extensions) {
    let fileName = path.basename(extensions[key], '.js');
    let name = fileName.split('-').pop();
    let extendName = extensionFunctions[name];
    if (!extendName) {
      return;
    }

    let functions = require(extensions[key]);
    for (let name in functions) {
      Twig[extendName](name, functions[name]);
    }
  }
})(extensions);