'use strict';

const Controller = require('egg').Controller;

class CaptchaController extends Controller {

  // 获取自己的验证码
  async getCode() {
    console.log('111111111')
    const result = await this.ctx.service.captcha.getCode();
    this.ctx.body = { result };
  }

}

module.exports = CaptchaController;
