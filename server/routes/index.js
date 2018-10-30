const router = require('koa-router')()

const controllers = require('../controllers')

router.get('/hello', controllers.hello)

// 用户信息相关
router.get('/user/info', controllers.user.getUserInfo)

module.exports = router