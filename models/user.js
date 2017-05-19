/**
 * Created by Administrator on 2017-05-19.
 */
var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  phoneNumber: String,
  vertifyCode: String
})

module.exports = mongoose.model('User', UserSchema)