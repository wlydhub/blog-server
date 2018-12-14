'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CaptchaSchema = new Schema({
    code: { type: String }, // 验证码
    email: { type: String, unique: true }, // 邮箱地址（邮箱账号）
  }, { timestamps: { createTime: 'created', updateTime: 'updated' } }); // 创建时间和更新时间

  return mongoose.model('Captcha', CaptchaSchema);
};
