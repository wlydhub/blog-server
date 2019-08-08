'use strict';

const Service = require('egg').Service;
const db = 'Article';

class ArticleService extends Service {

  async add(data) {
    const result = await this.ctx.service.base.db.add(db, data);
    return result;
  }

  async del(data) {
    const result = await this.ctx.service.base.db.deleteOne(db, data);
    return result;
  }

  async update(query, data) {
    const result = await this.ctx.service.base.db.update(db, query, data);
    return result;
  }

  async count(data) {
    const result = await this.ctx.service.base.db.count(db, data);
    return result;
  }

  async getOne(data) {
    const result = await this.ctx.service.base.db.findOne(db, data);
    return result;
  }

  async getList(data) {
    const result = await this.ctx.service.base.db.find(db, data);
    return result;
  }

  async getListAndCount(data) {
    const list = await this.ctx.service.base.db.find(db, data);
    const count = await this.ctx.service.base.db.count(db, data.query);
    return { list, count };
  }

}

module.exports = ArticleService;
