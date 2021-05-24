const fs = require('fs')
const useRouter = (app) => {
  for (const filename of fs.readdirSync(__dirname)) {
    if (filename === 'index.js') continue;
    const router = require(`./${filename}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
}

module.exports = {
  useRouter
}