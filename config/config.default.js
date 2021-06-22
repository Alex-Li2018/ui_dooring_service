/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1621497217042_6056';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 允许访问接口的白名单
    domainWhiteList: [ 'http://localhost:8080', 'http://47.108.182.74' ],
  };
  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.middleware = [ 'jwtMiddleWare' ];
  config.jwtMiddleWare = {
    exclude: [
      '/index',
      '/v1/qiniu-token',
      '/v1/login',
      '/v1/register',
    ],
  };
  config.jwt = {
    secret: 'aVwCkQeOrT',
  };

  // sequelize数据库
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'ui-dooring-dev',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '5520830',
    timezone: '+08:00', // 东八时区
  };

  config.valparams = {
    locale: 'zh-cn',
    throwError: false,
  };
  // 参数校验
  config.validate = {
    // 对参数可以使用convertType规则进行类型转换
    convert: false,
    // validateRoot: false,
  };

  // 配置模板引擎
  config.view = {
    mapping: {
      // 模板文件以html结尾
      '.html': 'ejs',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
