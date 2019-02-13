/* eslint-disable no-trailing-spaces */
'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1544001677738_9869';

  // add your config here
  config.middleware = [];
  config.mongoose = {
    url: 'mongodb://127.0.0.1/blog',
    options: {
    },
  };

  // CORS配置
  exports.cors = {
    origin: '*',
  };

  // 禁用安全设置
  exports.security = {
    csrf: {
      enable: false,
    },
  };

  config.createCode = () => {
    // 首先默认code为空字符串
    let code = '';
    // 设置随机字符
    const random = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
    // 循环
    for (let i = 0; i < 4; i++) {
      // 设置随机数范围,这设置为0 ~ 36
      const index = Math.floor(Math.random() * 36);
      // 字符串拼接 将每次随机的字符 进行拼接
      code += random[index];
    }
    // 将拼接好的字符串赋值给展示的Value
    return code;
  };

  return config;
};
