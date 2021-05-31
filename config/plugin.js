'use strict';

/** @type Egg.EggPlugin */
exports.routerPlus = {
  enable: true,
  package: 'egg-router-plus',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

// 参数校验
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

// 模板
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};
