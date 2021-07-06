'use strict';
const Controller = require('../core/baseController');
// 需要加载qiniu模块的
const qiniu = require('qiniu');
const accessKey = '9yc4Idc9w9NKCRslcArjoGtseVAQwHdawBcYEmtD';
const secretKey = 'pBp9uStsfacCiIpHjLgouF1nEIxL-Ot6xd3OND-1';
const bucket = 'ui-dooring';

function fetchUrlHandler(resUrl) {
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const config = new qiniu.conf.Config();
  config.useHttpsDomain = true;
  config.zone = qiniu.zone.Zone_z2;
  const bucketManager = new qiniu.rs.BucketManager(mac, config);
  const key = `image_${new Date().getTime()}.png`;
  return new Promise(function(reslove, reject) {
    bucketManager.fetch(resUrl, bucket, key, function(err, respBody, respInfo) {
      if (err) {
        reject(err);
      } else {
        if (respInfo.statusCode === 200) {
          reslove(respInfo);
        } else {
          reject(err);
        }
      }
    });
  });
}

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

  async fetchUrl() {
    const ctx = this.ctx;
    const resUrl = ctx.query.url;

    try {
      const res = await fetchUrlHandler(resUrl);
      if (res.statusCode === 200) {
        this.success(res.data, '上传链接成功');
      } else {
        this.error(res.data, '上传链接失败');
      }
    } catch (err) {
      this.error(err, '上传链接失败');
    }
  }
}

module.exports = QiniuTokenController;
