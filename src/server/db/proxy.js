class ProxyDao {
  constructor(dao) {
    this.dao = dao;
  }

}

module.exports = function (db) {
  return new Proxy(db, {
    get: function(target, name){
      return name in target ? target[name] : 37;
    }
  });
}