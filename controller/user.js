/**
 * Created by Administrator on 2017-05-19.
 */
var mongoose = require('mongoose')
var User = mongoose.model('User')
var sms = require('../service/sms')
var uuid = require('uuid')


exports.signup = function *() {
  var that = this
  var phoneNumber = this.request.body.phoneNumber

  var user = yield User.findOne({
    phoneNumber: phoneNumber
  })

  var verifyCode = sms.getCode()

  if (user) {
    user.verifyCode = verifyCode
  } else {
    var accessToken = uuid.v4()
    user = new User({
      phoneNumber: phoneNumber,
      accessToken: accessToken,
      verifyCode: verifyCode,
      nickname: '哈哈哈'
    })
  }

  try {
    user = yield user.save()
  } catch (e) {
    that.body = {
      success: false,
      err: '用户保存失败'
    }
    return
  }

  try {
    // sms.sendCode(phoneNumber, verifyCode)
    console.log(verifyCode)
    console.log(phoneNumber)
  } catch (e) {
    that.body = {
      success: false,
      err: '验证码发送失败'
    }
    return
  }


  this.body = {
    success: true
  }
}

exports.verify = function *() {
  var that = this
  var phoneNumber = this.request.body.phoneNumber
  var verifyCode = this.request.body.verifyCode

  var user = yield User.findOne({
    phoneNumber: phoneNumber,
    verifyCode: verifyCode
  })

  if (user) {
    user.verifed = true
  } else {
    that.body = {
      success: false,
      err: '验证码错误'
    }
    return
  }

  try {
    user = yield user.save()
  } catch (e) {
    that.body = {
      success: false,
      err: '数据保存失败'
    }
    return
  }

  this.body = {
    success: true
  }

}

exports.update = function *() {
  var user = this.session.user
  var body = this.request.body

  const fields = 'avatar,gender,age,nickname,breed'.split(',')

  fields.forEach((field) => {
    if (body[field]) {
      user[field] = body[field]
    }
  })

  try {
    user = yield user.save()
  } catch (e) {
    that.body = {
      success: false,
      err: '数据保存失败'
    }
    return
  }


  this.body = {
    success: true
  }
}