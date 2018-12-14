'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 登录
  async login() {
    const result = await this.ctx.service.user.fun();
    this.ctx.body = { result };
  }

  // 注册
  async signIn() {
    const result = await this.ctx.service.user.fun();
    this.ctx.body = { result };
  }

  // 获取用户列表
  async getList() {
    const result = await this.ctx.service.user.fun();
    this.ctx.body = { result };
  }

}

module.exports = UserController;
