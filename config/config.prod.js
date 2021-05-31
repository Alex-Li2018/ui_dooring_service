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
  config.keys = appInfo.name + '_1606231535920_3042';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 从 `Node.js 性能平台` 获取对应的接入参数
  config.alinode = {
    appid: '87799',
    secret: 'a8881f5aada261aac48b20521fc90b6cc006014a',
  };

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'ui-dooring-prod',
    host: '39.98.238.242',
    port: '3306',
    username: 'root',
    password: 'lyp5520830',
    timezone: '+08:00', // 东八时区
  };

  config.cluster = {
    listen: {
      port: 5000,
      hostname: '0.0.0.0', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
      // path: '/var/run/egg.sock',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
