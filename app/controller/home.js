'use strict';
const Controller = require('../core/baseController');

class HomeController extends Controller {
  // 查询
  async index() {
    await this.ctx.render('home');
  }
}

module.exports = HomeController;
