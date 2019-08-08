'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken');
const db = 'User';

class UserService extends Service {
  // 创建用户token
  async createTokenUser(user) {
    return jwt.sign({
      id: user._id,
      name: user.name,
    },
    this.config.secret_key,
    { expiresIn: 60 * 60 * 24 * 30 });
  }

  async add(data) {
    return await this.ctx.service.base.dbBase(db, data);
  }
}

module.exports = UserService;
