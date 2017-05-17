/**
 * Created by Administrator on 2017-05-17.
 */
var koa = require('koa')
var session = require('koa-session')
var logger = require('koa-logger')
var bodyParser = require('koa-bodyparser')

var app = new koa()

app.use(logger())
app.use(session(app))
app.use(bodyParser())

app.use(ctx => {
  ctx.body = {
    success: true
  }
})

app.listen(3000)
console.log('localhost:3000')