module.exports = class BaseService{
  constructor() {
  }

  delete() {
    
  }

  count() {
  }

  search(condition, order, start, limit) {
    return this.getCurrentDao().search(condition, order, start, limit);
  }

  getById(id) {
    return this.getCurrentDao().getById(id);
  }

  findByIds() {
  }

  createDao(name) {
    return global.service.load('dao', name);
  }
};