'use strict';
const Controller = require('../core/baseController');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class PageController extends Controller {
  // 查询
  async index() {
    const ctx = this.ctx;
    const userId = ctx.state.user.uid;
    const query = {
      limit: toInt(ctx.query.page_size),
      offset: (toInt(ctx.query.page) - 1) * toInt(ctx.query.page_size),
      where: {
        user_id: userId,
      },
    };
    try {
      const res = await ctx.model.Page.findAll(query);
      res.forEach(item => {
        item.content = JSON.parse(item.content);
      });
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
      const userId = ctx.state.user.uid;
      const data = await ctx.model.Page.findByPk(toInt(ctx.params.id));
      if (data.user_id !== userId) {
        this.error({}, '你不是该页面实例的创建者!');
      } else {
        data.content = JSON.parse(data.content);
        this.success(data, '查询详情成功');
      }
    } catch (err) {
      this.error(err, '查询详情失败');
    }
  }
  // 新增
  async create() {
    const { ctx } = this;
    const { name, content } = ctx.request.body;

    try {
      // 参数验证
      ctx.validate({
        name: { type: 'string', required: true, desc: '页面名称' },
      });
      if (ctx.paramErrors) {
        return this.error(ctx.paramErrors, '参数校验不通过');
      }
      const userId = ctx.state.user.uid;
      const page = await ctx.model.Page.create({ name, content: JSON.stringify(content || {}), user_id: userId });
      page.content = JSON.parse(page.content);
      this.success(page, '新增成功');
    } catch (err) {
      this.error(err, '新增失败');
    }
  }
  // 更新
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const page = await ctx.model.Page.findByPk(id);
    if (!page) {
      this.error({}, '查找id失败');
      return;
    }

    const { name, content } = ctx.request.body;
    try {
      // 参数验证
      ctx.validate({
        name: { type: 'string', required: true, desc: '页面名称' },
      });
      if (ctx.paramErrors) {
        return this.error(ctx.paramErrors, '参数校验不通过');
      }
      const userId = ctx.state.user.uid;
      const data = await page.update({ name, content: JSON.stringify(content || {}) });
      if (data.user_id !== userId) {
        this.error({}, '你不是该页面实例的创建者!');
      } else {
        data.content = JSON.parse(data.content);
        this.success(data, '更新成功');
      }
    } catch (err) {
      this.error(err, '更新失败');
    }
  }
  // 删除
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const page = await ctx.model.Page.findByPk(id);
    if (!page) {
      ctx.status = 404;
      return;
    }
    const userId = ctx.state.user.uid;
    if (page.user_id !== userId) {
      this.error({}, '你不是该页面实例的创建者!');
    } else {
      try {
        await page.destroy();
        this.success({}, '删除成功');
      } catch (err) {
        this.error(err, '删除失败');
      }
    }

  }
}

module.exports = PageController;
