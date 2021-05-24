const connection = require('../app/database')

const createMoment = async (content, id) => {
  const statement = `
    INSERT INTO moment (content, user_id) VALUES (?, ?);
  `;
  const [result] = await connection.execute(statement, [content, id])

  return result
}

// 通过id获取评论
const getMomentById = async (id) => {
  const statement = `
      SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id',u.id,'name',u.name, 'avatarUrl', u.avatar_url) author,
      IF(l.id, JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)), NULL) labels,
      (SELECT IF(c.id, JSON_ARRAYAGG(
      JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'user', JSON_OBJECT('id',us.id,'name', us.name))
      ), NULL) 
      FROM comment c
      LEFT JOIN users us ON us.id = c.user_id
      WHERE c.moment_id = m.id
      ) comments,
      (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',p.filename)) FROM picture p WHERE moment_id=m.id) imgs
      FROM moment m
      LEFT JOIN users u ON m.user_id = u.id
      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON l.id = ml.label_id
      WHERE m.id = ?
      GROUP BY m.id
      ;
  `;

  const [res] = await connection.execute(statement, [id])
  return res[0]
}

const getMoment = async (offset, size) => {
  // 偏移20 查10条
  const statement = `
      SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl',u.avatar_url) author,
      (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',p.filename)) FROM picture p WHERE moment_id=m.id) imgs,
      (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) comments,
      (SELECT COUNT(*) FROM moment_label ml WHERE m.id = ml.moment_id) labels
      FROM moment m
      LEFT JOIN users u ON m.user_id = u.id
      LIMIT ?,?
      ;
    `
  try {

    const [res] = await connection.execute(statement, [offset, size])
    return res
  } catch (error) {
    console.log(error)
  }
}

const updateService = async (momentId, content) => {
  const statement = `
    UPDATE moment SET content = ? WHERE id = ?;
  `
  const [res] = await connection.execute(statement, [content, momentId])

  return res
}

const removeService = async (momentId) => {
  const statement = `
   DELETE FROM moment WHERE id = ?;
  `
  const [res] = await connection.execute(statement, [momentId])
  return res
}

module.exports = {
  createMoment,
  getMomentById,
  getMoment,
  updateService,
  removeService
}