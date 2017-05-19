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

  router.post('/u/signup', App.hasBody, User.signup)
  router.post('/u/verify', App.hasBody, User.verify)
  router.post('/u/update', App.hasBody, App.hasToken, User.update)

  return router
}