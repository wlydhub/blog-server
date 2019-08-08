/* eslint-disable no-mixed-spaces-and-tabs */
'use strict';

const Controller = require('egg').Controller;

class CaptchaController extends Controller {

  // 新增
  async add() {
    const { ctx, service } = this;
    const { body, decoded } = ctx;
	  const crearRule = {
      articleId: { type: 'string', required: false },
      leaveWordId: { type: 'string', required: false },
      word: { type: 'string' },
      receiverId: { type: 'string' },
	  };
	  try {
		  ctx.validate(crearRule);
	  } catch (e) {
		  ctx.body = { sucess: false, msg: e };
		  return;
    }
    if (!body.articleId && !body.articleId) {
      ctx.body = { sucess: false, msg: '必须有articleId或articleId' };
		  return;
    }
    // 收集参数
    const data = {
      word: body.word,
      userId: decoded.id,
    };
    if (body.articleId) {
      data.articleId = body.articleId;
    }
    if (body.leaveWordId) {
      data.leaveWordId = body.leaveWordId;
    }
    if (body.receiverId) {
      data.receiverId = body.receiverId;
    }
    const result = await service.leaveWord.add(data);
    ctx.body = {
      data: result,
      sucess: true,
    };
  }

  // 删除
  async del() {
    const { ctx, service } = this;
    const { body } = ctx;
	  const crearRule = {
      id: { type: 'string' },
	  };
	  try {
		  ctx.validate(crearRule);
	  } catch (e) {
		  ctx.body = { sucess: false, msg: e };
		  return;
    }
    const result = await service.leaveWord.del(body.id);
    ctx.body = {
      data: result,
      sucess: true,
    };
  }

  // 改
  async update() {
    const { ctx, service } = this;
    const { body } = ctx.request;
    const user = ctx.decoded;
    const crearRule = {
      id: { type: 'string' },
      word: { type: 'string', required: false },
    };
    try {
      ctx.validate(crearRule);
    } catch (e) {
      ctx.body = { sucess: false, msg: e };
      return;
    }
    // 检查是否有权限
    const count = await service.article.leaveWord({
      userId: user.id,
      _id: body.id,
    });
    if (count !== 1) {
      ctx.body = { sucess: false, msg: '没有修改权限' };
    }
    // 收集参数
    const query = { _id: body.id };
    const data = {};
    if (body.word) {
      data.word = body.word;
    }
    const result = await service.leaveWord.update(query, data);
    ctx.body = {
      data: result,
      sucess: true,
    };
  }

  // 查
  // 获取列表-有分页
  async list() {
    const { ctx, config, service } = this;
    const query = ctx.request.query;
    const crearRule = {
      articleId: { type: 'string', required: false },
      sortName: { type: 'string', required: false },
      sort: { type: 'string', required: false },
      skip: { type: 'string', required: false },
      limit: { type: 'string', required: false },
      select: { type: 'string', required: false },
    };
    try {
      ctx.validate(crearRule, query);
    } catch (e) {
      ctx.body = { code: config.responseCode.invalidParams, msg: JSON.stringify(e) };
      return;
    }
    const data = {
      query: { },
      skip: Number(query.skip) || 1,
      limit: Number(query.limit) || 10,
      sort: (query.sortName && query.sort) ? { [query.sortName]: Number(query.sort) } : { _id: -1 },
    };
    if (query.select) {
      data.select = query.select;
    }
    if (query.articleId) {
      data.query.articleId = query.articleId;
    }
    const result = await service.leaveWord.getListAndCount(data);
    ctx.body = {
      sucess: true,
      data: result,
    };
  }

}

module.exports = CaptchaController;
