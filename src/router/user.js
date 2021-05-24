const Router = require('koa-router')

const { verifyLogin } = require('../middleware/auth')
const { create, avatarInfo } = require('../controller/user')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/', verifyLogin, create)

userRouter.get('/:userId/avatar', avatarInfo)


module.exports = userRouter