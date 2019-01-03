'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: { type: String },
    accound: { type: String },
    password: { type: String },
    email: { type: String },
    phone: { type: String },
  }, { timestamps: { createTime: 'created', updateTime: 'updated' } });

  return mongoose.model('User', UserSchema);
};
