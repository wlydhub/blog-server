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
    // (1)声明需要用的参数
    const { ctx, service } = this;
    const body = ctx.request.body;
    // (1)首先验证传入参数的基本格式是否正确
    const crearRule = {
      accound: { type: 'string' },
      captcha: { type: 'string' },
      email: { type: 'string' },
      name: { type: 'string' },
      password: { type: 'string' },
      secondPassword: { type: 'string' },
    };
    try {
      ctx.validate(crearRule);
    } catch (e) {
      ctx.body = { success: false, msg: e };
      return;
    }
    // (2)验证账号是否存在相同的
    const userCount = await service.user.count({ accound: body.accound });
    if (userCount) {
      ctx.body = { success: false, msg: '账号已存在' };
      return;
    }
    // (3)验证验证码是否正确
    const code = await service.captcha.getCodeFromEmail(ctx.request.body.email);
    if (body.captcha && code !== body.captcha.toUpperCase()) {
      ctx.body = { success: false, msg: '无效的验证码' };
      return;
    }
    // (4)验证两次密码是否一致
    if (body.password !== body.secondPassword) {
      ctx.body = { success: false, msg: '两次密码不一致' };
      return;
    }
    delete body.captcha;
    delete body.secondPassword;
    const user = await service.user.add(body);
    ctx.body = { data: { user, toke: 'qweasd' }, success: true };
  }

  // 获取用户列表
  async getList() {
    const result = await this.ctx.service.user.fun();
    this.ctx.body = { result, success: true };
  }

}

module.exports = UserController;
