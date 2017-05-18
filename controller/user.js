/**
 * Created by Administrator on 2017-05-17.
 */
const mongoose = require('mongoose')
const xss = require('xss')
const User = mongoose.model('User')
const uuid = require('uuid')
const sms = require('../service/sms')

exports.test = (ctx) => {
  ctx.body = {
    success: true
  }
}

exports.signup = async (ctx, next) => {
  const phoneNumber = xss(ctx.request.body.phoneNumber.trim())

  let user = await User.findOne({
    phoneNumber: phoneNumber
  }).exec()

  const verifyCode = sms.getCode()

  if (!user) {
    const accessToken = uuid.v4()

    user = new User({
      nickname: '小狗狗',
      phoneNumber: xss(phoneNumber),
      verifyCode: verifyCode,
      accessToken: accessToken
    })
  } else {
    user.verifyCode = verifyCode
  }

  try {
    user = await user.save()
  } catch (e) {
    ctx.body = {
      success: false,
      message: '用户保存失败'
    }
    return
  }

  try {
    sms.send(user.phoneNumber, verifyCode)
  } catch (e) {
    ctx.body = {
      success: false,
      message: '短信服务异常'
    }
    return
  }

  ctx.body = {
    success: true
  }
}

exports.verify = async (ctx, next) => {
  const verifyCode = ctx.request.body.verifyCode
  const phoneNumber = ctx.request.body.phoneNumber

  let user = await User.findOne({
    phoneNumber: phoneNumber,
    verifyCode: verifyCode
  }).exec()

  if (user) {
    user.verifed = true
    user = await user.save()

    ctx.body = {
      success: true,
      data: {
        nickname: user.nickname,
        accessToken: user.accessToken
      }
    }
  }else {
    ctx.body = {
      success: false,
      err: '验证码错误'
    }
  }
}

exports.update = async (ctx, next) => {
  const body = ctx.request.body
  let user = ctx.session.user

  const fields = 'avatar,gender,age,nickname,breed'.split(',')

  fields.forEach((field) => {
    if (body[field]) {
      user[field] = body[field]
    }
  })

  user = await user.save()

  ctx.body = {
    success: true,
    data: {
      avatar: user.avatar,
      gender: user.gender,
      age: user.age,
      nickname: user.nickname,
      breed: user.breed,
      accessToken: user.accessToken,
      _id: user._id
    }
  }
}

