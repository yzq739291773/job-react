const router = require('koa-router')()

const controllers = require('../controllers')

router.get('/hello', controllers.hello)

// 用户信息相关
router.get('/user/info', controllers.user.getUserInfo)
router.get('/user/list', controllers.user.getList)
router.post('/user/register', controllers.user.register)
router.post('/user/login', controllers.user.login)
router.post('/user/update', controllers.user.update)
router.get('/user/getmsglist', controllers.user.getmsglist)
router.post('/user/readmsg', controllers.user.readmsg)


module.exports = router