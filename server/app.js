const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

const server = require('http').Server(app.callback())
const io = require('socket.io')(server)



// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')
app.use(router.routes())

app.on('error', (err, ctx) =>
    console.error('server error', err)
);
io.on('connection',function(socket){
	console.log('user login')
})

server.listen(9093, () => {
    console.log('server start at port 9093')
})