const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')
app.use(router.routes())

app.listen(9093, () => {
    console.log('server start at port 9093')
})