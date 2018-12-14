'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    userName: { type: String },
    password: { type: String },
  }, { timestamps: { createTime: 'created', updateTime: 'updated' } });

  return mongoose.model('User', UserSchema);
};
