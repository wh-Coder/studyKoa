/**
 * Created by Administrator on 2017-05-17.
 */
const koa = require('koa')
const session = require('koa-session')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')

const app = new koa()

app.keys = ['hello']
app.use(logger())
app.use(session(app))
app.use(bodyParser())

const router = require('./config/routes')()

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
console.log('localhost:3000')