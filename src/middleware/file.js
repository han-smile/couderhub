const path = require('path')

const jimp = require('jimp')
const multer = require('koa-multer')

const { APP_HOST, APP_PORT } = require('../app/config')
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file_path')
const fileService = require('../service/file')
const { AUTO } = require('jimp')

// 头像上传服务器处理
const storageAvatar = multer.diskStorage({
  destination: AVATAR_PATH,
  filename(req, files, cb) {
    cb(null, Date.now())
  }
})
const uploadAvatar = multer({
  storage: storageAvatar
})
const handleAvatar = uploadAvatar.single('avatar')


// 动态图片上传处理
const uploadPicture = multer({
  dest: PICTURE_PATH
})
const handlePicture = uploadPicture.array('file', 9); // 最多接收9张

// 保存头像到服务器
const saveAvatarInfo = async (ctx, next) => {
  try {
    const file = ctx.req.file
    const { filename, mimetype, size } = file
    const { id } = ctx.user
    console.log(file)
    // 1.保存数据库
    // 查询当前用户是否已经上传过
    const isAvatarExist = await fileService.checkAvatarExist(id)
    if (isAvatarExist) {
      // 更新数据
      await fileService.updateAvatar(filename, mimetype, size, id)
    } else {
      // 添加数据
      await fileService.createAvatar(filename, mimetype, size, id)
    }

    // 2.保存用户头像url
    const avaterUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`
    const res = await fileService.updateAvatarByUserId(avaterUrl, id)

    ctx.body = res
  } catch (error) {
    console.log(error)
  }


}


// 重置图片大小  保存大中小  适用不同场景 优化体验
const resizePicture = async (ctx, next) => {
  const { files } = ctx.req

  for (const file of files) {
    /*  图片信息
    fieldname: 'file',
    originalname: 'k3.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: './upload/picture',
    filename: '66d5d69611002c6095da3dfe82a94d2e',
    path: 'upload\\picture\\66d5d69611002c6095da3dfe82a94d2e',
  */
    jimp.read(file.path).then((image) => {
      image.resize(1280, jimp.AUTO).write(file.path + '-large')
      image.resize(640, jimp.AUTO).write(file.path + '-middle')
      image.resize(320, jimp.AUTO).write(file.path + '-small')
    })
  }

  await next()
}

// 保存多张动态图片
const savePictureInfo = async (ctx, next) => {
  const { momentId } = ctx.params
  const { id } = ctx.user
  const files = ctx.req.files


  for (const file of files) {
    const { filename, mimetype, size } = file
    // 保存到数据库
    await fileService.createPicture(filename, mimetype, size, id, momentId)
  }

  ctx.body = '上传动态图片成功~'
}


module.exports = {
  handleAvatar,
  saveAvatarInfo,
  handlePicture,
  resizePicture,
  savePictureInfo
}

