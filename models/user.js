/**
 * Created by Administrator on 2017-05-19.
 */
var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  phoneNumber: {
    unique: true,
    type: String
  },
  vertifyCode: String,
  nickname: String
})

module.exports = mongoose.model('User', UserSchema)