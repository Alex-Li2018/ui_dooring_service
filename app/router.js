'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller } = app;
  app.router.get('/index', controller.home.index);
  // 设置命名空间
  const apiV1Router = app.router.namespace('/v1');

  apiV1Router.get('/qiniu-token', controller.qiniuToken.index);
  apiV1Router.get('/fetch-url', controller.qiniuToken.fetchUrl);
  apiV1Router.post('/register', controller.user.create);
  apiV1Router.post('/login', controller.user.login);
  apiV1Router.get('/logout', controller.user.logout);
  // RESTful 的方式来定义路由
  apiV1Router.resources('users', '/users', controller.user);
  apiV1Router.resources('pages', '/pages', controller.page);
};
