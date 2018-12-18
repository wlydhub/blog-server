'use strict';

const Service = require('egg').Service;

class CaptchaService extends Service {

  async getCode() {
    const code = await this.ctx.model.captcha.create({
      code: '12345',
    });
    console.log('code', code);
    await this.ctx.service.email.send('123456');
    return null;
  }


}

module.exports = CaptchaService;
