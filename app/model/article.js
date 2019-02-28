'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ArticleSchema = new Schema({
    title: { type: String }, // 文章标题
    content: { type: String }, // 文章内容
    userId: { type: String }, // 作者id
    count: { type: String }, // 点击量
  }, { timestamps: { createTime: 'created', updateTime: 'updated' } });

  return mongoose.model('Article', ArticleSchema);
};
