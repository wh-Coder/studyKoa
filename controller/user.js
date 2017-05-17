/**
 * Created by Administrator on 2017-05-17.
 */
const mongoose = require('mongoose')
const xss = require('xss')
const User = mongoose.model('User')

exports.test = (ctx) => {
  ctx.body = {
    success: true
  }
}

exports.signup = async (ctx) => {
  // const phoneNumber = ctx.request.body.phoneNumber
  const phoneNumber = ctx.query.phoneNumber

  let user = await User.findOne({
    phoneNumber: phoneNumber
  }).exec()

  if(!user){
    user = new User({
      phoneNumber: xss(phoneNumber)
    })
  }else{
    user.verifyCode = '1212'
  }
  try {
    user = await user.save()
  }catch (e){
    ctx.body = {
      success: true
    }
    return
  }
  ctx.body = {
    success: true
  }
}

exports.verify = (ctx) => {
  ctx.body = {
    success: true
  }
}

exports.update = (ctx) => {
  ctx.body = {
    success: true
  }
}

