const jwt = require('jsonwebtoken')

const { getUserByName } = require('../service/user')
const { md5Password } = require('../utils/passwordHandle')
const errorTypes = require('../constants/errorTypes')
const { PUBLIC_KEY } = require('../app/config')
const { checkPremission } = require('../service/auth')
const labelService = require('../service/label')

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 名字和密码校验
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_CANNOT_BE_EMPTY)
    return ctx.app.emit('error', error, ctx)
  }
  // 查看用户是否存在
  const result = await getUserByName(name);
  if (!result.length) {
    const error = new Error(errorTypes.USER_NOT_EXIST)
    return ctx.app.emit('error', error, ctx)
  }
  // 密码校验
  if (md5Password(password) !== result[0].password) {
    const error = new Error(errorTypes.PASSWORD_ERROR)
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = result[0]

  await next()
}

// 验证token
const verifyAuth = async (ctx, next) => {
  // 获取token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  try {
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })

    // 保存到上下文，供后续中间件获取用户信息
    ctx.user = res
  } catch (error) {
    const err = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', err, ctx)
  }

  await next()
}

// 验证用户权限
const verifyPremission = async (ctx, next) => {
  const { id } = ctx.user
  const [resuoreKey] = Object.keys(ctx.params)
  const tableName = resuoreKey.replace('Id', '')
  const momentId = ctx.params[resuoreKey]

  const res = await checkPremission(id, momentId, tableName)
  // 没有查到数据 => 没有权限
  if (!res.length) {
    const error = new Error(errorTypes.UNPREMISSION)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

// 验证添加标签权限
const verifyLabelsExist = async (ctx, next) => {
  const { labels } = ctx.request.body,
    { momentId } = ctx.params,
    newLabels = []

  for (let name of labels) {
    let label = { momentId }
    // 查询标签是否存在
    const res = await labelService.getLabelByName(name)
    if (!res) {
      // 先添加标签
      const result = await labelService.create(name)
      label.id = result.insertId
    } else {
      label.id = res.id
    }

    // 每个标签信息添加到
    newLabels.push(label)
  }

  ctx.labels = newLabels
  await next()
}

module.exports = {
  verifyAuth,
  verifyLogin,
  verifyPremission,
  verifyLabelsExist
}