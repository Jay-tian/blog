module.exports = class {
  constructor(user) {
    this.user = user;
  }

  isLogin() {
    return this.user ? true : false;
  }

  isAdmin() {
    if (!this.user) {
      return false;
    }

    return this.user.get('roles').indexOf('admin') >= 0 ? true : false ;
  }

  getUserId() {
    if (!this.user) {
      return 0;
    }

    return this.user.get('id');
  }

  getNickname() {
    if (!this.user) {
      return '';
    }

    return this.user.get('nickname');
  }

  get(key) {
    if (!this.user) {
      return '';
    }

    return this.user.get(key);
  }
};