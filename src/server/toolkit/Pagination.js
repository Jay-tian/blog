let paginationCount = 20;
class Pagination {
  constructor(request, allCount, pageCount = paginationCount) {
    this.request = request;
    this.allCount = allCount;
    this.pageCount = pageCount;
    this.querystring = require('querystring');
    this.interval = 3;
  }

  getUrl(page = 1) {
    let query = { ... this.request.query };
    query.page = page;
    return this.request.protocol +'://'+ this.request.header.host + this.request.path + '?' + this.querystring.stringify(query);
  }

  getPages() {
    let pages = [], startPage = this.request.query.page - 3;
    let allPages = Math.ceil(this.allCount / this.pageCount);
    for(let i = 1;i< this.interval * 2;i++) {
      startPage += 1;
      if (startPage > 0 && startPage <= allPages) {
        pages.push(startPage);
      }
    }

    return pages;
    
  }

  getCurrentPage() {
    return this.request.query.page;
  }

  getNextPage() {
    return this.getCurrentPage() < Math.ceil(this.allCount / this.pageCount)  ? this.getCurrentPage() + 1 : 0;
  }

  getPrePage() {
    return this.getCurrentPage() > 1 ? this.getCurrentPage() - 1 : 0;
  }

  isShow() {
    return this.allCount < this.pageCount ? false : true;
  }
}

Pagination.pageCount = paginationCount;
module.exports = Pagination;