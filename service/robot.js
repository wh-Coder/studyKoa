/**
 * Created by Administrator on 2017-06-03.
 */
'use strict'

const qiniu = require('qiniu')
const sha1 = require('sha1')
const Promise = require('bluebird')
const cloudinary = require('cloudinary')
const config = require('../config/config')
const uuid = require('uuid')

// https://developer.qiniu.com/kodo/sdk/1289/nodejs
qiniu.conf.ACCESS_KEY = config.qiniu.AK
qiniu.conf.SECRET_KEY = config.qiniu.SK

cloudinary.config(config.CLOUDINARY)

//构建上传策略函数
// function uptoken(bucket, key) {
//   let putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
//
//   // putPolicy.callbackUrl = 'http://your.domain.com/callback';
//   // putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)';
//
//   return putPolicy.token();
// }

exports.getQiniuToken = function (body) {
  let type = body.type
  let key = uuid.v4()
  let putPolicy
  let options ={
    persistentNotifyUrl: config.notify
  }

  if(type === 'avatar'){
    key += '.jpeg'
    putPolicy = new qiniu.rs.PutPolicy('avatar' + ":" + key);
  }else if(type === 'video'){
    key += '.mp4'
    options.scope = 'video:' + key
    options.persistentOps = 'avthumb/mp4/an/1'
    putPolicy = new qiniu.rs.PutPolicy2(options);
  }else if(type === 'audio'){
    //
  }

  let token = putPolicy.token();
  return {
    token:token,
    key: key
  }
}

exports.uploadToCloudinary = function (url) {
  return new Promise(function (resolve, reject) {
    cloudinary.uploader.upload(url, function (result) {
      if(result.public_id){
        console.log('resolve')
        resolve(result)
      }else{
        console.log('reject')
        reject(result)
      }
    }, {
      resource_type: 'video',
      folder: 'video'
    })
  })
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