const thunk = ({dispatch,getState})=>next=>action=>{
    // 如果是函数，执行一下，参数是dispatch和getState
    console.log(action, typeof action)
    if(typeof action == 'function'){
        // 这里就是为什么自己写的action可以调用getState的原因
        return action(dispatch,getState)
    }
    // 默认什么都没干，next其实就是applyMiddleWare包装后的dispatch
    return next(action)
}

export default thunk