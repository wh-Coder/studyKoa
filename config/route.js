/**
 * Created by Administrator on 2017-05-19.
 */
var Router = require('koa-router')
var User = require('../controller/user')
var App = require('../controller/app')


module.exports = function () {
  var router = new Router({
    prefix: '/api/v1'
  })

  router.get('/signup', App.hasBody, User.signup)
  router.get('/vertify', App.hasBody, User.vertify)
  router.get('/update', App.hasBody, App.hasToken, User.update)

  return router
}