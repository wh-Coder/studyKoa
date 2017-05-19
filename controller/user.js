/**
 * Created by Administrator on 2017-05-19.
 */
var mongoose = require('mongoose')
var User = mongoose.model('User')
var sms = require('../service/sms')



exports.signup = function *() {
  var phoneNumber = this.query.phoneNumber

  var user = User.findOne({
    phoneNumber: phoneNumber
  })

  var vertifyCode = sms.getCode()

  if( user ){
    user.verifyCode = vertifyCode
  }else{
    user = new User({
      nick: '哈哈哈',
      accessToken: accessToken
    })
  }
  //
  // var user = new User({
  //   phoneNumber: phoneNumber
  // })

  user = yield user.save()

  this.body = {
    success: true
  }
}

exports.vertify = function () {

  this.body = {
    success: true
  }

}

exports.update = function () {

  this.body = {
    success: true
  }
}