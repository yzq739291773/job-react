export function createStore(reducer){
    let currentState = {}
    let currentListeners = []

    function getState(){
        return currentState
    }

    function subscribe(listener){
        currentListeners.push(listener)
    }

    function dispatch(action){
        currentState = reducer(currentState, action)
        currentListeners.forEach(v=>v())
        return action
    }

    dispatch({type:'@YZQ/my-redux'})
    return {getState, subscribe, dispatch}
}
function bindActionCreator(creator, dispatch){
    return (...args) => dispatch(creator(...args))
}
export function bindActionCreators(creators,dispatch){
    let bound = {}
    Object.keys(creators).forEach(v=>{
        let creator = creators[v]
        bound[v] = bindActionCreator(creator,dispatch)
    })
    return bound;
}