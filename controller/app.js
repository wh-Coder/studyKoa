/**
 * Created by Administrator on 2017-05-19.
 */
var mongoose = require('mongoose')
var User = mongoose.model('User')

exports.hasBody = function *(next) {
  var body = this.request.body || {}
  var that = this
  if(Object.keys(body).length === 0){
    that.body = {
      success : false,
      err: '参数不能为空'
    }
    return
  }
  yield next
}


exports.hasToken = function *(next) {
  let accessToken = this.query.accessToken

  if (!accessToken) {
    accessToken = this.request.body.accessToken
  }

  if (!accessToken) {
    this.body = {
      success: false,
      err: '没有签名'
    }
    return
  }

  let user = yield User.findOne({
    accessToken: accessToken
  }).exec()

  if (!user) {
    this.body = {
      success: false,
      err: '用户没有登录'
    }
    return
  }

  this.session = this.session || {}
  this.session.user = user

  yield next
}