const connection = require('../app/database')

class LabelService {
  // 创建标签
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`
    const [res] = await connection.execute(statement, [name])
    return res
  }

  // 获取标签信息
  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`
    const [res] = await connection.execute(statement, [name])
    return res[0]
  }

  // 查看动态是否添加某个标签
  async isExist(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
    const [res] = await connection.execute(statement, [momentId, labelId])
    return !!res.length
  }

  // 给动态添加标签
  async addLabels(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`
    const [res] = await connection.execute(statement, [momentId, labelId])
    return res
  }
}

module.exports = new LabelService()