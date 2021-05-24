const { verify } = require('jsonwebtoken')
const Router = require('koa-router')

const { create, detail, list, update, remove, addLabels, pictureInfo } = require('../controller/moment')
const { verifyAuth, verifyPremission, verifyLabelsExist } = require('../middleware/auth')

const momentRouter = new Router({ prefix: '/moment' })
// 发布动态
momentRouter.post('/', verifyAuth, create)
// 获取单个评论
momentRouter.get('/:id', detail)
// 获取分页评论
momentRouter.get('/', list)
// 修改动态
momentRouter.patch('/:momentId', verifyAuth, verifyPremission, update)
// 删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPremission, remove)

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPremission, verifyLabelsExist, addLabels)

// 获取动态图片
momentRouter.get('/images/:filename', pictureInfo)
module.exports = momentRouter