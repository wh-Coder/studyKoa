/**
 * Created by Administrator on 2017-05-17.
 */
const mongoose = require('mongoose')
const db = 'mongodb://localhost/koa'
mongoose.Promise = require('bluebird')
mongoose.connect(db)
require('./models/user')
require('./models/video')

const koa = require('koa')
const session = require('koa-session')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')

const app = new koa()

app.keys = ['hello']
app.use(cors());
app.use(logger())
app.use(session(app))
app.use(bodyParser())

const router = require('./config/routes')()

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
console.log('localhost:3000')