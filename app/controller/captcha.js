/* eslint-disable no-mixed-spaces-and-tabs */
'use strict';

const Controller = require('egg').Controller;

class CaptchaController extends Controller {

  // 获取自己的验证码
  async getCode() {
    const { ctx, service } = this;
    const query = ctx.query;
    const result = service.captcha.getCode(query.email);
    if (result) {
      ctx.body = {
        success: true,
        code: 0,
      };
    } else {
	    ctx.body = {
		    success: false,
		    code: 0,
	    };
    }
  }

}

module.exports = CaptchaController;
