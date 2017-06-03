/**
 * Created by Administrator on 2017-06-03.
 */
'use strict'

const qiniu = require('qiniu')
const sha1 = require('sha1')
const config = require('../../config')
// https://developer.qiniu.com/kodo/sdk/1289/nodejs
qiniu.conf.ACCESS_KEY = config.qiniu.AK
qiniu.conf.SECRET_KEY = config.qiniu.SK

//要上传的空间
const bucket = 'avatar';

//构建上传策略函数
function uptoken(bucket, key) {
  let putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);

  // putPolicy.callbackUrl = 'http://your.domain.com/callback';
  // putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)';

  return putPolicy.token();
}

exports.getQiniuToken = function (key) {
  let token = uptoken(bucket, key)
  return token
}

exports.getCloudinaryToken = function (body) {
  let type = body.type
  let timestamp = body.timestamp
  let folder
  let tags

  if(type === 'avatar'){
    folder = 'avatar'
    tags = 'app,avatar'
  }else if(type === 'video'){
    folder = 'video'
    tags = 'app,video'
  }else if(type === 'audio'){
    folder = 'audio'
    tags = 'app,audio'
  }
  let signature = 'folder=' + folder + '&tags=' + tags + '&timestamp=' + timestamp + config.CLOUDINARY.api_secret

  signature = sha1(signature)
  return signature
}