const model = require('../model')
const User = model.getModel('user')
const tool = require('../tool/too')
const utils = require('utility')

exports.getUserInfo = async(ctx, next) => {
    ctx.response.status = 200,
        ctx.body = {
            code: 0,
            msg: '用户信息'
        }
}

exports.register = async(ctx, next) => {

    console.log(111, ctx)
    const { user, pwd, type } = ctx.request.body
    try {
        let res = await tool.findone(User, { user })
        let data = await tool.create(User, { user, type, pwd: md5pwd(pwd) })
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

    // await User.findOne({ user }, async(err, doc) => {
    //     if (doc) {
    //         console.log(2)
    //         ctx.body = {
    //             code: 1,
    //             msg: '用户名已存在'
    //         }
    //         return false
    //     } else {
    //         console.log(3)
    //             await User.create({ user, type, pwd }, (err, doc) => {
    //                 if (!err) {
    //                     console.log(4)
    //                     ctx.body = {
    //                         code: 0,
    //                         msg: 'success'
    //                     }
    //                 } else {
    //                     console.log(5)
    //                     ctx.body = {
    //                         code: 1,
    //                         msg: '存储失败'
    //                     }
    //                 }

    //         })


    //         const userDoc = new User({ user, type, pwd })
    //         await userDoc.save((e, d) => {
    //             console.log(5)
    //             if (e) {
    //                 console.log(6)
    //                 ctx.body = {
    //                     code: 1,
    //                     msg: '后端出错了'
    //                 }
    //                 return false
    //             } else {
    //                 console.log(7)
    //                 ctx.body = {
    //                     code: 0,
    //                     msg: 'success'
    //                 }
    //             }

    //         })
    //     }


    // })
}

exports.getList = async(ctx, next) => {
    await User.find({}, (err, doc) => {
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

function md5pwd(pwd) {
    const salt = 'Yzq@!'
    return utils.md5(utils.md5(pwd + salt))
}