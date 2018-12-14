'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  // 获取自己的验证码
  async getOne() {
    const result = await this.ctx.service.user.fun();
    this.ctx.body = { result };
  }

}

module.exports = UserController;
