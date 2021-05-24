const fs = require('fs')

const jwt = require('jsonwebtoken')

const { PRIVATE_KEY } = require('../app/config')
const { AVATAR_PATH } = require('../constants/file_path')
const userService = require('../service/user')

const create = async (ctx) => {
  const { id, name } = ctx.user
  let user = {
    id,
    name
  }
  // 生成token
  const token = jwt.sign(user, PRIVATE_KEY, {
    expiresIn: 60 * 60 * 24,
    algorithm: 'RS256'
  })
  // 派发token
  ctx.body = {
    ...user,
    token
  }
}

// 获取用户头像
const avatarInfo = async (ctx, next) => {
  const { userId } = ctx.params

  const avatarInfo = await userService.getAvatarById(userId)
  const { filename, mimetype } = avatarInfo
  // 设置响应头
  ctx.response.set('content-type', mimetype)
  // 返回流信息
  ctx.body = fs.createReadStream(`${AVATAR_PATH}/${filename}`)
}

module.exports = { create, avatarInfo }