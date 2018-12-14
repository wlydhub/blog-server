'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  async count(data) {
    // 直接传入查询条件即可
    const result = await this.ctx.model.User.count(data);
    return result;
  }

  async add(data) {
    // 创建单个数据直接传入数据模型obj即可，如果想要创建多个数据可以直接传入数组 [{},{}]
    // 参考https://mongoosejs.com/docs/api.html#model_Model.createCollection
    const result = await this.ctx.model.User.create(data);
    return result;
  }

  async deleteMany(data) {
    // 将符合条件的全部删除
    const result = await this.ctx.model.User.deleteMany(data);
    return result;
  }

  async deleteOne(data) {
    // 删除一个
    const result = await this.ctx.model.User.deleteOne(data);
    return result;
  }

  async fun() {
    const data = { userName: { $in: [ '111', '222' ] } };
    const result = await this.ctx.model.User.remove(data);
    return result;
  }

}

module.exports = UserService;
