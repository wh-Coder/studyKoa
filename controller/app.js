/**
 * Created by Administrator on 2017-05-17.
 */
const mongoose = require('mongoose')
const User = mongoose.model('User')
const robot = require('../service/robot')

exports.signature = (ctx) => {
  let body = this.request.body
  let key = body.key
  let token

  if (key) {
    token = robot.getQiniuToken(key)
  } else {
    token = robot.getCloudinaryToken(body)
  }

  ctx.body = {
    success: true,
    data: token
  }
}

exports.hasBody = async (ctx, next) => {
  const body = ctx.request.body || {}
  if (Object.keys(body).length === 0) {
    ctx.body = {
      success: false,
      err: '是不是漏了什么'
    }
    return
  }
  await next()
}

exports.hasToken = async (ctx, next) => {
  let accessToken = ctx.query.accessToken

  if (!accessToken) {
    accessToken = ctx.request.body.accessToken
  }

  if (!accessToken) {
    ctx.body = {
      success: false,
      err: '没有签名'
    }
    return
  }

  let user = await User.findOne({
    accessToken: accessToken
  }).exec()

  if (!user) {
    ctx.body = {
      success: false,
      err: '用户没有登录'
    }
    return
  }

  ctx.session = ctx.session || {}
  ctx.session.user = user

  await next()
}