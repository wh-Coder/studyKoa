/**
 * Created by Administrator on 2017-05-17.
 */
var mongodb = 'mongodb://localhost/koa1'
var mongoose = require("mongoose")
mongoose.Promise = require('bluebird')
mongoose.connect(mongodb)
require('./models/user')

var koa = require('koa')
var session = require('koa-session')
var logger = require('koa-logger')
var bodyParser = require('koa-bodyparser')

var app = koa()

app.keys = ['hello']
app.use(logger())
app.use(session(app))
app.use(bodyParser())

var router = require('./config/route')()

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
console.log('localhost:3000')