const parameters = require('./ConfigLoader.js');
const path = require('path');

class ServiceLoader {
  load(type, name) {
    let poolName = type+'_'+name;
    let service = {};
    if (ServiceLoader.pools[poolName]) {
      return ServiceLoader.pools[poolName];
    }
    try {
      let servicePath = path.join(parameters.serverPath, type, name);
      service = require(servicePath);
    } catch (error) {
      service = require(`../${type}/` + name);
    }

    ServiceLoader.pools[poolName] = service;
    return ServiceLoader.pools[poolName];
  }
}

ServiceLoader.pools = {};

module.exports = new ServiceLoader();