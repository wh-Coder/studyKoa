- koa中间键的引入：app.use(Middleware)

- session引入需要传入koa实例：app.use(session(app))

- 设置cookies密码：app.keys，
   只有this.cookies.set('name', 'tobi', { signed: true });生效

- koa-router固定套路
```
    app
      .use(router.routes())
      .use(router.allowedMethods())
```

- router模块的引入：var router = require('./config/route')()注意最后的括号

- router实例化配置：prefix: '/api/v1'

- 创建mongoose表

```
1. 连接
const mongoose = require('mongoose')
const db = 'mongodb://localhost/koa'
mongoose.connect(db)

2. 建表
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({}）

3. 导出导入
module.exports = mongoose.model('User', UserSchema)
const User = mongoose.model('User')
```

- 由于mongoose不是promise需要bluebird
    mongoose.Promise = require('bluebird')

- 建表之前把时间更新一下
```
    // 时间戳
    meta: {
        createAt: {
          type: Date,
          default: Date.now()
        },
        updateAt: {
          type: Date,
          default: Date.now()
        }
    }

    UserSchema.pre('save', function (next) {
      if (!this.isNew) {
        this.meta.updateAt = Date.now();
      }
      next()
    })
```

- signup 流程：
    获取电话号码 -> 查找电话号码 -> 创建验证码 -> 有电话号码就更新验证码，
    没有就添加并生成accessToken -> 保存(try/catch) -> 发送验证码(try/catch) -> 完

- verify 流程
     获取电话和验证码 -> 校验数据库 -> 校验成功添加字段verifed -> 保存数据
     -> 失败/成功 -> 完

- update 流程
     获取表单数据 -> 保存 -> 完
 ```
   const fields = 'avatar,gender,age,nickname,breed'.split(',')

   fields.forEach((field) => {
     if (body[field]) {
       user[field] = body[field]
     }
   })

   user = await user.save()
 ```

- 创建accessToken:
    const accessToken = uuid.v4()

- 创建4位验证码
    speakeasy.totp({secret:'xxxx',digits: 4})

- 使用 User.findOne({}).exec()  记得exec

- 几个问题：

    - next 到底怎么用？

    - return next / return  /  return next() ????哪一个

- 树
```
F:.
│  .gitignore
│  app.js
│  package.json
│
├─config
│      routes.js
│
├─controller
│      app.js
│      user.js
│
├─models
│      user.js
│
└─service
        sms.js

```