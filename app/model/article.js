'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ArticleSchema = new Schema({
    title: { type: String }, // 文章标题
    word: { type: String }, // 文章内容
    tags: { type: Array }, // 文章标签
    userId: { type: String }, // 作者id
    hits: { type: String }, // 点击量
    wordNumber: { type: String }, // 文章的字数
  }, { timestamps: { createTime: 'created', updateTime: 'updated' } });

  return mongoose.model('Article', ArticleSchema);
};
