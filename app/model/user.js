'use strict';
const moment = require('moment');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    password: STRING(60),
    age: INTEGER,
    sex: INTEGER,
    created_at: {
      type: DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    updated_at: {
      type: DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  }, {
    // 去除createAt updateAt
    timestamps: true,
    // 使用自定义表名
    freezeTableName: true,
    // 实例对应的表名
    tableName: 'users',
    // 如果需要sequelize帮你维护createdAt,updatedAt和deletedAt必须先启用timestamps功能
    // 将createdAt对应到数据库的created_at字段
    createdAt: 'created_at',
    // 将updatedAt对应到数据库的updated_at字段
    updatedAt: 'updated_at',
    deletedAt: false,
  });

  return User;
};
