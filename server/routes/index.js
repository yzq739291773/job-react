const router = require('koa-router')()

const controllers = require('../controllers')

router.get('/hello', controllers.hello)

// 用户信息相关
router.get('/user/info', controllers.user.getUserInfo)
router.get('/user/list', controllers.user.getList)
router.post('/user/register', controllers.user.register)

module.exports = router