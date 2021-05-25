'use strict';
const moment = require('moment');

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Page = app.model.define('pages', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: STRING(30),
      allowNull: false,
    },
    content: TEXT,
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
    tableName: 'pages',
    // 如果需要sequelize帮你维护createdAt,updatedAt和deletedAt必须先启用timestamps功能
    // 将createdAt对应到数据库的created_at字段
    createdAt: 'created_at',
    // 将updatedAt对应到数据库的updated_at字段
    updatedAt: 'updated_at',
    deletedAt: false,
  });

  return Page;
};
