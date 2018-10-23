const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1:27017'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
    console.log('mongo connect success')
})

// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')
app.use(router.routes())

app.listen(9093, () => {
    console.log('server start at port 9093')
})