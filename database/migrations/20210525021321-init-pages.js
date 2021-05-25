'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 pages 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('pages', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: {
        type: STRING(30),
        allowNull: false,
      },
      content: TEXT,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 pages 表
  down: async queryInterface => {
    await queryInterface.dropTable('pages');
  },
};
