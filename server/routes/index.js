const router = require('koa-router')()

const controllers = require('../controllers')

router.get('/hello', controllers.hello)

module.exports = router