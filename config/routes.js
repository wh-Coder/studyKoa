/**
 * Created by Administrator on 2017-05-17.
 */
const Router = require('koa-router')
const User = require('../controller/user')
const App = require('../controller/app')

module.exports = () => {
  let router = new Router({
    prefix: '/api/v1'
  })

  // test
  router.get('/u/test', User.test)

  // user
  router.get('/u/signup', User.signup)
  router.post('/u/verify', User.verify)
  router.post('/u/update', User.update)

  // app
  router.post('/signature', App.signature)

  return router
}