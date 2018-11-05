const model = require('../model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const tool = require('../tool/too')
const utils = require('utility')
const _filter = { 'pwd': 0, '__v': 0 }

exports.getUserInfo = async(ctx, next) => {
    const userid = ctx.cookies.get('userid')
    if (!userid) {
        ctx.body = {
            code: 1,
        }
    } else {
        await User.findOne({ _id: userid }, _filter, (err, doc) => {
            console.log(err, doc)
            if (err) {
                ctx.body = {
                    code: 1,
                    msg: '后台出错了'
                }
            } else {
                ctx.body = {
                    code: 0,
                    data: doc
                }
            }
        })
    }

}
exports.update = async(ctx, next)=>{
    const userid = ctx.cookies.get('userid')
    if (!userid) {
		ctx.body = {
            code: 1,
            msg: '后台出错了'
        }
	}
    const body = ctx.request.body
    console.log(0,body)
	await User.findByIdAndUpdate(userid,body,function(err,doc){
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
        },body)
        ctx.body = {code:0,data}
	})
}
exports.login = async(ctx, next) => {
    console.log('登录接口')
    const { user, pwd } = ctx.request.body
    await User.findOne({ user, pwd: md5pwd(pwd) }, _filter, function(err, doc) {
        console.log(err, doc)
        if (!doc) {
            ctx.body = {
                code: 1,
                msg: '用户名或者密码错误'
            }
        } else {
            ctx.cookies.set('userid', doc._id)
            ctx.body = {
                code: 0,
                data: doc
            }
        }
    })
}
exports.register = async(ctx, next) => {

    console.log(111, ctx)
    const { user, pwd, type } = ctx.request.body
    try {
        let res = await tool.findone(User, { user })
        let data = await tool.create(User, { user, type, pwd: md5pwd(pwd) })
        ctx.cookies.set('userid', data._id)
        ctx.body = {
            code: 0,
            msg: '注册成功'
        }
        
    } catch (error) {
        console.log('注册',error)
        ctx.body = {
            code: 1,
            msg: '用户名已存在'
        }
    }
}

exports.getList = async(ctx, next) => {
    const { type } = ctx.query
    await User.find({type}, (err, doc) => {
        if (err) {
            ctx.body = {
                code: 1,
                msg: '获取列表失败'
            }
            return false
        }
        ctx.body = {
            code: 0,
            data: doc
        }
    })

}

exports.getmsglist = async (ctx,next)=>{
    console.log('getmsglist')
    const user = ctx.cookies.get('userid')
    try {
        console.log('11')
        let users = {}
        console.log('22')
        let userdoc = await tool.find(User,{})
        console.log('33')
        console.log('getmsglist,userdoc',userdoc)
        userdoc.forEach(v=>{
			users[v._id] = {name:v.user, avatar:v.avatar}
        })
        console.log('44')
        let doc = await tool.find(Chat,{'$or':[{from:user},{to:user}]})
        console.log('getmsglist,doc',doc)
        ctx.body = {
            code: 0,
            msgs:doc,
            users:users

        }
    } catch (error) {
        ctx.body = {
            code: 1,
            msg:'服务器错误'
        }
    }
}

function md5pwd(pwd) {
    const salt = 'Yzq@!'
    return utils.md5(utils.md5(pwd + salt))
}