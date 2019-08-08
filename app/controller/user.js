'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 登录
  async login() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const crearRule = {
      email: { type: 'string' },
      password: { type: 'string' },
    };
    try {
      ctx.validate(crearRule);
    } catch (e) {
      ctx.body = { success: false, msg: e };
      return;
    }
    // (1)验证账号是否存在相同的
    const user = await service.user.getOne({ query: { email: body.email } });
    if (!user) {
      this.ctx.body = { success: false, msg: '账号不存在' };
      return;
    }
    if (user.password !== body.password) {
      this.ctx.body = { success: false, msg: '密码不正确' };
      return;
    }
    delete user.password;
    const data = user;
    ctx.cookies.set('id', user._id.toString(), {
      httpOnly: true, // 默认就是 true
      encrypt: true, // 加密传输
      maxAge: 1000 * 60 * 60 * 24 * 7, // 有效时间
    });
    ctx.body = { success: true, data };
  }

  // 注册
  async signIn() {
    // (1)声明需要用的参数
    const { ctx, service } = this;
    const body = ctx.request.body;
    // (1)首先验证传入参数的基本格式是否正确
    const crearRule = {
      email: { type: 'string' },
      nickname: { type: 'string' },
      captcha: { type: 'string' },
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
    const password = 'md5';
    const data = {
      email: body.email,
      password,
    };
    const user = await service.user.add(data);
    delete user.password;
    ctx.cookies.set('id', user._id.toString(), {
      httpOnly: true, // 默认就是 true
      encrypt: true, // 加密传输
      maxAge: 1000 * 60 * 60 * 24 * 7, // 有效时间
    });
    ctx.body = { data: user, success: true };
  }

  // 登出
  async logout() {
    const { ctx } = this;
    ctx.cookies.set('id', '', {
      httpOnly: true, // 默认就是 true
      encrypt: true, // 加密传输
      maxAge: 1000 * 60 * 60 * 24 * 7, // 有效时间
    });
    ctx.body = { data: 'success', success: true };
  }

  // 改
  async update() {
    const { ctx, service } = this;
    const { body } = ctx.request;
    const user = ctx.decoded;
    const crearRule = {
      id: { type: 'string' },
      nickname: { type: 'string', required: false },
    };
    try {
      ctx.validate(crearRule);
    } catch (e) {
      ctx.body = { sucess: false, msg: e };
      return;
    }
    // 检查是否有权限
    if (body.id !== user.id) {
      ctx.body = { sucess: false, msg: '无法修改他人信息' };
    }
    // 收集参数
    const query = { _id: body.id };
    const data = {};
    if (body.nickname) {
      data.nickname = body.nickname;
    }
    const result = await service.user.update(query, data);
    ctx.body = {
      data: result,
      sucess: true,
    };
  }

}

module.exports = UserController;
