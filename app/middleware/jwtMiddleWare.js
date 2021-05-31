'use strict';
const {
  ERROR_TOKEN_EMPTY,
  ERROR_TOKEN_INVALID,
} = require('../core/statusCode');

module.exports = options => {
  // 页面token鉴权统一处理
  return async function jwt(ctx, next) {
    // 先判断是否需要鉴权
    const { exclude } = options;
    const requestUrl = ctx.request.url;

    if (!ctx.request.header.authorization) {
      ctx.body = {
        code: ERROR_TOKEN_EMPTY,
        data: {},
        msg: 'token为空',
      };
    }

    if (!exclude.includes(requestUrl.replace(/\?.*$/g, ''))) {
      let token = ctx.request.header.authorization;
      let decode;
      if (token) {
        try {
          // 解码token
          token = token.replace('Bearer ', '');
          decode = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
          console.log(decode);
          await next();
        } catch (error) {
          ctx.body = {
            code: ERROR_TOKEN_INVALID,
            data: error,
            msg: 'token无效',
          };
          return;
        }
      } else {
        ctx.body = {
          code: ERROR_TOKEN_EMPTY,
          data: {},
          msg: 'token为空',
        };
        return;
      }
    } else {
      await next();
    }
  };
};
