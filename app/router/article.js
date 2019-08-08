'use strict';

module.exports = app => {
  // 取出需要用的app的参数
  const { router, controller, middleware } = app;
  // 检查是用户是否扥估的中间件
  const verifyUser = middleware.verifyUser();

  router.post('/api/article/add', verifyUser, controller.article.add);
  router.post('/api/article/del', verifyUser, controller.article.del);
  router.post('/api/article/update', verifyUser, controller.article.update);
  router.get('/api/article/list', controller.article.list);
  router.get('/api/article/detail', controller.article.detail);

};
