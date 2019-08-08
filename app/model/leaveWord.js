'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const LeaveWordSchema = new Schema({
    articleId: { type: String }, // 文章id
    leaveWordId: { type: String }, // 留言id
    word: { type: String }, // 留言内容
    userId: { type: String }, // 留言者id
    receiverId: { type: String }, // 接收者id
  }, { timestamps: { createTime: 'created', updateTime: 'updated' } }); // 创建时间和更新时间

  return mongoose.model('LeaveWord', LeaveWordSchema);
};
