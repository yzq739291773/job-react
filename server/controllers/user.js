const model = require('../model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('utility')
const _filter = { 'pwd': 0, '__v': 0 }

exports.getUserInfo = async(ctx, next) => {
    console.log('头部信息',ctx.request.header.token)
    // const userid = ctx.cookies.get('userid')
    const userid = ctx.request.header.token
    if (!userid) {
        ctx.body = {
            code: 1,
        }
    } else {
        try {
            let res = await User.findOne({ _id: userid }, _filter)
            ctx.body = {
                code: 0,
                data: res
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                msg: '后台出错了'
            }
        }
    }

}
exports.update = async(ctx, next)=>{
    // const userid = ctx.cookies.get('userid')
    const userid = ctx.request.header.token
    if (!userid) {
		ctx.body = {
            code: 1,
            msg: '后台出错了'
        }
	}
    const body = ctx.request.body
    console.log(0,body)
    try {
        let doc = await User.findByIdAndUpdate(userid,body)
        const data = Object.assign({},{
			user:doc.user,
			type:doc.type
        },body)
        ctx.body = {code:0,data}
    } catch (error) {
        ctx.body={
            code:1
        }
    }
}
exports.login = async(ctx, next) => {
    console.log('登录接口')
    const { user, pwd } = ctx.request.body
    try {
        let res = await User.findOne({ user, pwd: md5pwd(pwd) } ,_filter)
        ctx.body = {
            code:0,
            data:res,
            token:res._id
        }
    } catch (error) {
        ctx.body = {
            code:1,
            data:error
        }
    }
}
exports.register = async(ctx, next) => {

    console.log(111, ctx)
    const { user, pwd, type } = ctx.request.body
    try {
        let res = await User.findOne({user})
        let data = await User.create({ user, type, pwd: md5pwd(pwd) })
        ctx.cookies.set('userid', data._id,{maxAge:2*3600*1000})
        ctx.body = {
            code: 0,
            msg: '注册成功'
        }
    } catch (error) {
            ctx.body = {
            code: 1,
            msg: '用户名已存在'
        }
    }
}

exports.getList = async(ctx, next) => {
    const { type } = ctx.query
    try {
        let res = await User.find({type})
        ctx.body = {
            code: 0,
            data: res
        }
    } catch (error) {
        ctx.body = {
            code: 1,
            msg: '获取列表失败'
        }
    }
}

exports.getmsglist = async (ctx,next)=>{
    console.log('getmsglist')
    // const user = ctx.cookies.get('userid')
    const user = ctx.request.header.token
    try {
        let users = {}
        let userdoc = await User.find({})
        console.log('getmsglist,userdoc',userdoc)
        userdoc.forEach(v=>{
			users[v._id] = {name:v.user, avatar:v.avatar}
        })
        let doc = await Chat.find({'$or':[{from:user},{to:user}]})
        console.log('获取聊天信息',doc)
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

exports.readmsg = async (ctx, next)=>{
    console.log('readmsg')
    // const userid = ctx.cookies.get('userid')
    const userid = ctx.request.header.token
    const {from} = ctx.request.body
    try {
        let res = await Chat.update(
            	{from,to:userid},
            	{'$set':{read:true}},
                {'multi':true})
        ctx.body = {code:0,num:doc.nModified}
    } catch (error) {
        ctx.body = {code:1,msg:'修改失败'}
    }
}

function md5pwd(pwd) {
    const salt = 'Yzq@!'
    return utils.md5(utils.md5(pwd + salt))
}