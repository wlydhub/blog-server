'use strict';

const Service = require('egg').Service;
const db = 'Captcha';

class CaptchaService extends Service {

  async getCode(email) {
    const count = await this.ctx.service.base.dbBase.count(db, { email });
    const code = this.config.createCode();
    if (count) {
      await this.ctx.service.base.dbBase.update(db, { email, code });
    } else {
      await this.ctx.service.base.dbBase.add(db, { email, code });
    }
    await this.ctx.service.email.send(email, code);
    return true;
  }

  async getCodeFromEmail(email) {
    const data = await this.ctx.service.base.dbBase.findOne(db, { query: { email } });
    if (data && (Date.now() - data.updatedAt.getTime() < 1000 * 60 * 5)) {
      return data.code;
    }
    return null;
  }

}

module.exports = CaptchaService;
