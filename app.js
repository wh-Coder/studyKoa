/**
 * Created by Administrator on 2017-05-17.
 */
var mongoose = require('mongoose')
var mongodb = 'mongodb://localhost/koa1'
mongoose.connect(mongodb)

var koa = require('koa')
var session = require('koa-session')
var logger = require('koa-logger')
var bodyParser = require('koa-bodyparser')

var app = koa()

app.use(logger())
app.use(session(app))
app.use(bodyParser())

var router = require('./config/route')()

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
console.log('localhost:3000')