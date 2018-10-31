const model = require('../model')
const User = model.getModel('user')

exports.getUserInfo = async(ctx, next) => {
    ctx.body = {
        code: 1,
        message: '用户信息'
    }
}

exports.register = async(ctx, next) => {
    console.log(111, ctx.request.body)
    const { user, pwd, type } = ctx.request.body
    await User.findOne({ user }, (err, doc) => {
        if (doc) {
            ctx.body = {
                code: 1,
                message: '用户名已存在'
            }
            return false
        }
        const userDoc = new User({ user, type, pwd })
        userDoc.save((e, d) => {
            if (e) {
                ctx.body = {
                    code: 1,
                    message: '后端出错了'
                }
                return false
            }
            ctx.body = {
                code: 0,
                message: 'success'
            }

        })
    })
}

exports.getList = async(ctx, next) => {
    await User.find({}, (err, doc) => {
        if (err) {
            ctx.body = {
                code: 1,
                message: '获取列表失败'
            }
            return false
        }
        ctx.body = {
            code: 0,
            data: doc
        }
    })

}