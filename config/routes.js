/**
 * Created by Administrator on 2017-05-17.
 */
const Router = require('koa-router')
const User = require('../controller/user')
const App = require('../controller/app')
const Creation = require('../controller/creation')

module.exports = () => {
  let router = new Router({
    prefix: '/api'
  })

  // test
  router.get('/u/test', User.test)

  // user
  router.post('/u/signup', App.hasBody, User.signup)
  router.post('/u/verify', App.hasBody, User.verify)
  router.post('/u/update', App.hasBody, App.hasToken, User.update)

  // app
  router.post('/signature', App.hasBody, App.hasToken, App.signature)
  router.post('/creations/video', App.hasBody, App.hasToken, Creation.video)


  return router
}