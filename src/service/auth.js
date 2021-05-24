const connection = require('../app/database')

class AuthService {
  // 检查用户权限
  async checkPremission(userId, momentId, tableName) {
    const statement = `
      SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;
    `
    const [res] = await connection.execute(statement, [momentId, userId])
    return res
  }
}

module.exports = new AuthService()