const connection = require('../app/database')

class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`

    const [res] = await connection.execute(statement, [filename, mimetype, size, userId])
    return res
  }

  async checkAvatarExist(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    const [res] = await connection.execute(statement, [userId])
    return !!res.length
  }

  async updateAvatar(filename, mimetype, size, userId) {
    const statement = `UPDATE avatar SET filename=?, mimetype=?, size=? WHERE user_id = ?;`

    const [res] = await connection.execute(statement, [filename, mimetype, size, userId])
    return res
  }

  async updateAvatarByUserId(avatarUrl, userId) {
    const statement = `UPDATE users SET avatar_url= ? WHERE id = ?;`

    const [res] = await connection.execute(statement, [avatarUrl, userId])
    return res
  }

  // 保存动态图片
  async createPicture(filename, mimetype, size, userId, momentId) {
    const statement = `INSERT INTO picture (filename, mimetype, size, user_id, moment_id) VALUES (?,?,?,?,?)`

    const [res] = await connection.execute(statement, [filename, mimetype, size, userId, momentId])
    return res
  }

  // 根据图片名称获取图片信息
  async getPictureByName(filename) {
    const statement = `SELECT * FROM picture WHERE filename = ?`;
    const [res] = await connection.execute(statement, [filename])
    return res
  }
}

module.exports = new FileService()