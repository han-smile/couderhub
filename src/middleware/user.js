const { NAME_OR_PASSWORD_CANNOT_BE_EMPTY, USER_ALREADY_EXISTS } = require('../constants/errorTypes')
const { getUserByName } = require('../service/user')
const { md5Password } = require('../utils/passwordHandle')

const checkFiled = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 名字和密码校验
  if (!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_CANNOT_BE_EMPTY)
    return ctx.app.emit('error', error, ctx)
  }

  // 用户是否存在
  const result = await getUserByName(name)
  if (result.length) {
    const error = new Error(USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 通过全部校验
  await next()
}

// 密码加密
const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body
  ctx.request.body.password = md5Password(password)
  await next()
}

module.exports = {
  checkFiled,
  handlePassword
}