/**
 * Created by Administrator on 2017-05-17.
 */
var koa = require('koa')
var session = require('koa-session')
var logger = require('koa-logger')
var bodyParser = require('koa-bodyparser')

var app = koa()

app.use(logger())
app.use(session(app))
app.use(bodyParser())

app.use(function *(next) {
  this.body = {
    success: true
  }
  yield next
})

app.listen(3000)
console.log('localhost:3000')