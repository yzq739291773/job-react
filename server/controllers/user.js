exports.getUserInfo = async(ctx, next) => {
    ctx.body = {
        code: 1,
        message: '用户信息'
    }
}