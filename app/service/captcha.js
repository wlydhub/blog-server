'use strict';

const Service = require('egg').Service;

class CaptchaService extends Service {

  async getCode() {
    // 创建单个数据直接传入数据模型obj即可，如果想要创建多个数据可以直接传入数组 [{},{}]
    // 参考https://mongoosejs.com/docs/api.html#model_Model.createCollection
    // const result = await this.ctx.model.User.create(data);
    await this.ctx.service.email.send('123456');
    return null;
  }


}

module.exports = CaptchaService;
