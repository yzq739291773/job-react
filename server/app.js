const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const path = require('path')
const static = require('koa-static')

const server = require('http').Server(app.callback())
const io = require('socket.io')(server)
const model = require('./model')
const Chat = model.getModel('chat')

const staticPath = '../build'



// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')
app.use(router.routes())
app.use(static(path.join(__dirname, staticPath)));
app.use(async (ctx,next)=>{
	console.log('url',ctx.url,path.join('/', 'build'))
	if(ctx.url.startsWith('/user/')||ctx.url.startsWith('/static/')){
		return next()
	}
	// return ctx.response.sendFile(path.resolve('build/index.html'))
})

app.on('error', (err, ctx) =>
    console.error('server error', err)
);
io.on('connection',function(socket){
	console.log('user login')
	socket.on('sendmsg',function(data){
		console.log(data)
		const {from, to, msg} = data
		const chatid = [from,to].sort().join('_')
		Chat.create({chatid,from,to,content:msg},function(err,doc){
			io.emit('recvmsg', Object.assign({},doc._doc))
		})
		// console.log(data)
		// io.emit('recvmsg',data)
	})
})

server.listen(9093, () => {
    console.log('server start at port 9093')
})