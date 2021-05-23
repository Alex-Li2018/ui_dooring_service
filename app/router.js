'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // RESTful 的方式来定义路由
  router.resources('users', '/users', controller.user);
};
