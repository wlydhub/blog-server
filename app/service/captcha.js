'use strict';

const Service = require('egg').Service;

class CaptchaService extends Service {

  async getCode(email) {
    const count = await this.ctx.model.Captcha.count({ email });
    const code = this.config.createCode();
    if (count) {
      await this.ctx.model.Captcha.update({ email, code });
    } else {
      await this.ctx.model.Captcha.create({ email, code });
    }
    await this.ctx.service.email.send(email, code);
    return true;
  }

  async getCodeFromEmail(email) {
    const data = await this.ctx.model.Captcha.findOne({ email });
    if (data && (Date.now() - data.updatedAt.getTime() < 1000 * 60 * 5)) {
      return data.code;
    }
    return null;
  }

}

module.exports = CaptchaService;
