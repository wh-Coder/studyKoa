/**
 * Created by Administrator on 2017-05-19.
 */
var mongoose = require('mongoose')
var User = mongoose.model('User')
exports.signup = function *() {
  var phoneNumber = this.query.phoneNumber

  var user = new User({
    phoneNumber: phoneNumber
  })

  user = yield user.save()

  console.log(user)
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