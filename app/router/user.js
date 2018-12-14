'use strict';

module.exports = app => {
  // 登录
  app.router.post('/api/user/login', app.controller.user.login);
  // 注册
  app.router.post('/api/user/signIn', app.controller.user.signIn);
  // 得到用户列表
  app.router.get('/api/user/getList', app.controller.user.getList);
};
