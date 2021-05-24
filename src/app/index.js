const Koa = require('koa');
const bodyParser = require('koa-bodyparser')

const errorHandlel = require('../app/errorHandler')
const { useRouter } = require('../router')

const app = new Koa()

// 解析请求参数中间件
app.use(bodyParser())
useRouter(app)
// 错误处理
app.on('error', errorHandlel)

module.exports = app