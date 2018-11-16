const Koa = require('koa')
// import Koa from 'koa'
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const path = require('path')
const static = require('koa-static')
const cors = require('koa2-cors');
// const React  = require('react')


const server = require('http').Server(app.callback())
const io = require('socket.io')(server)
const model = require('./model')
const Chat = model.getModel('chat')

const staticPath = '../build'


// function App(){
// 	return (<h2>server render</h2>)
// }
// console.log(App)
// 解析请求体
app.use(bodyParser())

// 引入路由分发
const router = require('./routes')
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return '*'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE','OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept','token'],
}))

app.use(router.routes())
app.use(static(path.join(__dirname, staticPath)));
// app.use(async (ctx, next) => {
// 	// ctx.set("Access-Control-Allow-Origin", "*");
// 	// ctx.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
// 	// ctx.set("Access-Control-Max-Age", "3600");
// 	// ctx.set("Access-Control-Allow-Headers", "x-requested-with,Authorization,Content-Type,Accept");
// 	// ctx.set("Access-Control-Allow-Credentials", "true");
// 	// if (ctx.request.method == "OPTIONS") {
// 	// 	ctx.response.status = 200
// 	//   }
// 	await next();
// 	const rt = ctx.response.get('X-Response-Time');
// 	console.log(`${ctx.method} ${ctx.url} - ${rt}`);
//   });
app.use(async (ctx,next)=>{
	console.log('url',ctx.url,path.join('/', 'build'))
	if(ctx.url.startsWith('/user/')||ctx.url.startsWith('/static/')){
		return next()
	}
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