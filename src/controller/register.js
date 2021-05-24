const { createUser } = require('../service/user')

const create = async function (ctx) {
  const user = ctx.request.body
  // 数据库创建数据
  const result = await createUser(user)

  ctx.body = result
}

module.exports = {
  create
}