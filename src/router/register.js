const Router = require('koa-router')

const { create } = require('../controller/register')
const { checkFiled, handlePassword } = require('../middleware/user')

const rejisterRouter = new Router()


rejisterRouter.post('/rejister', checkFiled, handlePassword, create)

module.exports = rejisterRouter