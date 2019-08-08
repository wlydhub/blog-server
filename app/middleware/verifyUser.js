'use strict';

// const jwt = require('jsonwebtoken');

module.exports = () => {
  return async function(ctx, next) {
    // const token = ctx.request.body['x-access-token'] || ctx.request.headers['x-access-token'];
    // if (token) {
    //   const decoded = jwt.verify(token, ctx.app.config.secret_key);
    //   const user = await ctx.model.User.count({ _id: decoded.id });
    //   if (!user) {
    //     ctx.throw(404, '用户未找到');
    //   }
    //   ctx.decoded = decoded;
    //   await next();
    // } else {
    //   ctx.throw(404, 'err: no_token\nurl: ' + ctx.request.url);
    // }


    // 根据session得到decoded
    const decoded = ctx.cookies.get('id');
    console.log('decoded:', decoded);
    if (decoded) {
      ctx.decoded = { id: decoded };
      await next();
    } else {
      ctx.body = {
        success: false,
        msg: 'cookie失效,请重新登录',
      };
    }
  };
};
