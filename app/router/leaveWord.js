'use strict';

module.exports = app => {
  // 取出需要用的app的参数
  const { router, controller, middleware } = app;
  // 检查是用户是否扥估的中间件
  const verifyUser = middleware.verifyUser();

  router.post('/api/leaveWord/add', verifyUser, controller.leaveWord.add);
  router.post('/api/leaveWord/del', verifyUser, controller.leaveWord.del);
  router.post('/api/leaveWord/update', verifyUser, controller.leaveWord.update);
  router.get('/api/leaveWord/list', controller.leaveWord.list);

};
