const { NAME_OR_PASSWORD_CANNOT_BE_EMPTY, USER_ALREADY_EXISTS, USER_NOT_EXIST, PASSWORD_ERROR, UNAUTHORIZATION, UNPREMISSION } = require('../constants/errorTypes')

const errorHandler = (err, ctx) => {
  let status,
    message;
  console.log('errType', err.message)

  switch (err.message) {
    case NAME_OR_PASSWORD_CANNOT_BE_EMPTY:
      status = 400
      message = '账号或密码不能为空~'
      break
    case USER_ALREADY_EXISTS:
      status = 409
      message = '用户已存在~'
      break
    case USER_NOT_EXIST:
      status = 400
      message = '用户不存在~'
      break
    case PASSWORD_ERROR:
      status = 400
      message = '密码错误~'
      break
    case UNAUTHORIZATION:
      status = 401
      message = 'token失效，请重新登录~'
      break
    case UNPREMISSION:
      status = 401
      message = '对不起，你不具备操作权限~'
      break
    default:
      status = 404
      message = 'NOT FOUNT'
  }

  ctx.status = status
  ctx.body = message
}

module.exports = errorHandler