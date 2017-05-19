/**
 * Created by Administrator on 2017-05-19.
 */
var mongoose = require('mongoose')
var User = mongoose.model('User')
var sms = require('../service/sms')
var uuid = require('uuid')


exports.signup = function *() {
  var that = this
  var phoneNumber = this.query.phoneNumber

  var user = User.findOne({
    phoneNumber: phoneNumber
  })

  var vertifyCode = sms.getCode()

  if (user) {
    user.verifyCode = vertifyCode
  } else {
    var accessToken = uuid.v4()
    user = new User({
      phoneNumber: phoneNumber,
      accessToken: accessToken,
      nick: '哈哈哈'
    })
  }

  try {
    user = yield user.save()
  } catch (e) {
    that.body = {
      success: false,
      err: '用户保存失败'
    }
  }

  try {
    sms.sendCode(phoneNumber, vertifyCode)
  } catch (e) {
    that.body = {
      success: false,
      err: '验证码发送失败'
    }
  }


  this.body = {
    success: true
  }
}

exports.vertify = function *() {
  var that = this
  var phoneNumber = this.request.body.phoneNumber
  var vertifyCode = this.request.body.vertifyCode

  var user = yield User.findOne({
    phoneNumber: phoneNumber,
    verifyCode: vertifyCode
  })

  if (user) {
    user.verifed = true
  } else {
    that.body = {
      success: false,
      err: '验证码错误'
    }
  }

  try {
    user = yield user.save()
  } catch (e) {
    that.body = {
      success: false,
      err: '数据保存失败'
    }
  }

  this.body = {
    success: true
  }

}

exports.update = function *() {
  var user = this.session.user

  const fields = 'avatar,gender,age,nickname,breed'.split(',')

  fields.forEach((field) => {
    if (body[field]) {
      user[field] = body[field]
    }
  })

  user = yield user.save()


  this.body = {
    success: true
  }
}