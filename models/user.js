/**
 * Created by Administrator on 2017-05-19.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var User = new Schema({
  phoneNumber: String,
  vertifyCode: String
})

module.exports = User