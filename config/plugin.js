'use strict';

// had enabled by egg
// exports.static = true;
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
// 加载以解决跨域问题
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
