const Router = require('koa-router')

const { verifyAuth, verifyPremission } = require('../middleware/auth')
const { handleAvatar, saveAvatarInfo, handlePicture, resizePicture, savePictureInfo } = require('../middleware/file')

const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post('/avatar', verifyAuth, handleAvatar, saveAvatarInfo)
fileRouter.post('/:momentId/picture', verifyAuth, verifyPremission, handlePicture, resizePicture, savePictureInfo)

module.exports = fileRouter