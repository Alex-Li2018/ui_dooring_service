'use strict';
const Controller = require('../core/baseController');
// 需要加载qiniu模块的
const qiniu = require('qiniu');
const accessKey = '9yc4Idc9w9NKCRslcArjoGtseVAQwHdawBcYEmtD';
const secretKey = 'pBp9uStsfacCiIpHjLgouF1nEIxL-Ot6xd3OND-1';
const bucket = 'ui-dooring';

class QiniuTokenController extends Controller {
  // 查询
  async index() {
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
      scope: bucket,
      expires: 3600 * 24,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    if (uploadToken) {
      this.success({
        uploadToken,
      }, '查询成功');
    } else {
      this.error({}, '查询详情失败');
    }
  }
}

module.exports = QiniuTokenController;
