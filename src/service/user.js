const connection = require('../app/database')

// 插入新用户数据
const createUser = async function (user) {
  const { name, password } = user
  const statement = `INSERT INTO users (name, password) VALUES (?, ?)`
  const [result] = await connection.execute(statement, [name, password])

  return result
}

// 查看用户是否存在
const getUserByName = async function (name) {
  const statement = `SELECT * FROM users WHERE name = ?;`
  const [result] = await connection.execute(statement, [name]);
  return result
}

const getAvatarById = async (userId) => {
  const statement = `SELECT * FROM avatar WHERE user_id=?`;
  const [res] = await connection.execute(statement, [userId])
  return res[0]
}

module.exports = {
  createUser,
  getUserByName,
  getAvatarById
}