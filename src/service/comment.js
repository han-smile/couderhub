const connection = require('../app/database')

class CommentService {
  // 对动态发表评论
  async createService(userId, momentId, content) {
    const statement = `
      INSERT INTO comment (user_id, moment_id, content) VALUES (?, ?, ?);
    `
    const [res] = await connection.execute(statement, [userId, momentId, content])
    return res
  }


  async replyService(userId, momentId, content, commentId) {
    const statement = `
      INSERT INTO comment (user_id, moment_id, comment_id, content) VALUES (?, ?, ?, ?);
    `

    const [res] = await connection.execute(statement, [userId, momentId, commentId, content])
    return res
  }

  async updateService(commentId, content) {
    const statement = `
      UPDATE comment SET content = ? WHERE id = ?;
    `

    const [res] = await connection.execute(statement, [content, commentId])
    return res
  }

  async removeService(commentId) {
    const statement = `
      DELETE FROM comment WHERE id = ?;
    `

    const [res] = await connection.execute(statement, [commentId])
    return res
  }
}

module.exports = new CommentService()