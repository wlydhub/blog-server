'use strict';
/*
 * 这里引入router目录下的所有路由
 */
module.exports = app => {
  require('./router/user')(app);
  require('./router/captcha')(app);
  require('./router/article')(app);
  require('./router/leaveWord')(app);

};
