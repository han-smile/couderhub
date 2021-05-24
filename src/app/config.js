const fs = require('fs')
const path = require('path')

// 配置环境变量
require('dotenv').config()
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key')),
  PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY

