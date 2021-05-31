'use strict';
const { Controller } = require('egg');
const {
  SUCCESS,
  ERROR_STATUS,
  ERROR_NOT_FOUND,
} = require('./statusCode');

class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(data, msg) {
    this.ctx.body = {
      code: SUCCESS,
      data,
      msg,
    };
  }

  error(data, msg) {
    this.ctx.body = {
      code: ERROR_STATUS,
      data,
      msg,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(ERROR_NOT_FOUND, msg);
  }
}


module.exports = BaseController;
