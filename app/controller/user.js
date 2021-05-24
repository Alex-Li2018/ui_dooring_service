'use strict';
const Controller = require('../core/baseController');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  // 登录
  async login() {
    
  }
  // 查询
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    try {
      const res = await ctx.model.User.findAll(query);
      this.success(res, '查询成功');
    } catch (err) {
      this.error(err, '查询失败');
    }
  }
  // 查询单个
  async show() {
    const ctx = this.ctx;
    if (toInt(ctx.params.id)) {
      this.error({}, 'id参数有误');
    }
    try {
      const data = await ctx.model.User.findByPk(toInt(ctx.params.id));
      this.success(data, '查询详情成功');
    } catch {
      this.error(err, '查询详情失败');
    }
  }
  // 新增
  async create() {
    const { ctx, app } = this;
    const { name, password } = ctx.request.body;
    try {
      const user = await ctx.model.User.create({ name, password });
      // 验证token，请求时在header配置 Authorization=`Bearer ${token}`
      const token = app.jwt.sign({
        user_name: user.name,
        uid: user.id,
      }, app.config.jwt.secret, {
        expiresIn: '1 days',
      });
      this.success({
        name: user.name,
        id: user.id,
        token
      }, '新增成功');
    } catch (err) {
      this.error(err, '新增失败');
    }
  }
  // 更新
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      this.error({}, '查找id失败');
      return;
    }

    const { name, password } = ctx.request.body;
    try {
      const userData = await user.update({ name, password });
      this.success(userData, '新增成功');
    } catch (err) {
      this.error(err, '新增失败');
    }
  }
  // // 删除
  // async destroy() {
  //   const ctx = this.ctx;
  //   const id = toInt(ctx.params.id);
  //   const user = await ctx.model.User.findByPk(id);
  //   if (!user) {
  //     ctx.status = 404;
  //     return;
  //   }

  //   await user.destroy();
  //   ctx.status = 200;
  // }
}

module.exports = UserController;
