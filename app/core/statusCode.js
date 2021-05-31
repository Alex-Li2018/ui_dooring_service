'use strict';
/**
 * 定义http状态码
 * @type {number}
 */

// 成功状态码
const SUCCESS = 200;

// Access Token 不能为空
const ERROR_TOKEN_EMPTY = 2030;

// Access Token 无效
const ERROR_TOKEN_INVALID = 2040;

// 错误
const ERROR_STATUS = 400;

// 未找到
const ERROR_NOT_FOUND = 404;

module.exports = {
  SUCCESS,
  ERROR_TOKEN_EMPTY,
  ERROR_TOKEN_INVALID,
  ERROR_STATUS,
  ERROR_NOT_FOUND,
};

