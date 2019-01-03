/* eslint-disable no-mixed-spaces-and-tabs */
'use strict';

const Controller = require('egg').Controller;

class CaptchaController extends Controller {

  // 获取自己的验证码
  async getCode() {
    const { ctx, service } = this;
    const query = ctx.query;
	  const crearRule = {
		  email: { type: 'email' },
	  };
	  try {
		  ctx.validate(crearRule, query);
	  } catch (e) {
		  ctx.body = { code: 1001, msg: e };
		  return;
	  }
    const result = await service.captcha.getCode(query.email);
    if (result) {
      ctx.body = {
        data: result,
        sucess: true,
      };
    } else {
	    ctx.body = {
		    success: false,
		    code: 1002,
	    };
    }
  }

}

module.exports = CaptchaController;
