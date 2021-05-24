const mysql = require('mysql2')

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = require('./config')

const connection = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true // 查询到的日期本地格式化
})

module.exports = connection.promise()