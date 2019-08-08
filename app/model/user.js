'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    nickname: { type: String }, // 用户昵称
    password: { type: String }, // 用户密码
    email: { type: String }, // 用户邮箱 -> 用于找回密码
  }, { timestamps: { createTime: 'created', updateTime: 'updated' } });

  return mongoose.model('User', UserSchema);
};
