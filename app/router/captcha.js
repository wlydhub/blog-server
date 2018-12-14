'use strict';

module.exports = app => {
  // 得到一个验证码
  app.router.get('/api/captcha/getCode', app.controller.captcha.getCode);
};
