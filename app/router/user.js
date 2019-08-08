'use strict';

module.exports = app => {
  // 登录
  app.router.post('/api/user/login', app.controller.user.login);
  // 注册
  app.router.post('/api/user/signIn', app.controller.user.signIn);
  // 注册
  app.router.post('/api/user/logout', app.controller.user.logout);
};
