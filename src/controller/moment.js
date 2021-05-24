const fs = require('fs')

const { PICTURE_PATH } = require('../constants/file_path')
const { createMoment, getMomentById, getMoment, updateService, removeService } = require('../service/moment')
const labelService = require('../service/label')
const fileService = require('../service/file')

const create = async (ctx) => {
  const id = ctx.user.id,
    content = ctx.request.body.content

  const res = await createMoment(content, id)
  // 添加评论到数据库
  ctx.body = res
}

const detail = async (ctx) => {
  const id = ctx.params.id
  const res = await getMomentById(id)
  ctx.body = res
}

const list = async (ctx) => {
  const { offset, size } = ctx.query
  const res = await getMoment(offset, size)
  ctx.body = res
}

// 修改动态
const update = async (ctx) => {
  const { momentId } = ctx.params
  const { content } = ctx.request.body

  const res = await updateService(momentId, content)

  ctx.body = res
}

// 删除动态操作
const remove = async (ctx, next) => {
  // 动态id 
  const { momentId } = ctx.params

  const res = await removeService(momentId)

  ctx.body = res
}

const addLabels = async (ctx) => {
  for (let labelObj of ctx.labels) {
    const { momentId, id } = labelObj
    // 查看当前动态是否存在这个标签
    const isLabelExist = await labelService.isExist(momentId, id)

    // 标签不存在 添加
    if (!isLabelExist) {
      await labelService.addLabels(momentId, id)
    }
  }
  ctx.body = '添加标签成功~'
}

const pictureInfo = async (ctx) => {
  let { filename } = ctx.params
  const { type } = ctx.query

  const types = ['large', 'middle', 'small']

  if (types.includes(type)) {
    filename += `-${type}`
  }
  // 获取图片信息
  const pictureInfo = await fileService.getPictureByName(filename)
  const { mimetype } = pictureInfo
  ctx.response.set('content-type', mimetype)
  ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
}

module.exports = {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  pictureInfo
}