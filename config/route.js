/**
 * Created by Administrator on 2017-05-19.
 */
var Router = require('koa-router')
var User = require('../controller/user')

module.exports = function () {
  var router = new Router({
    prefix: '/api/v1'
  })

  router.get('/signup',User.signup)
  router.get('/vertify',User.vertify)
  router.get('/update',User.update)




  return router
}