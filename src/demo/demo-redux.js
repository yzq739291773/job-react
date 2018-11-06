// import { createStore } from 'redux'
import {createStore} from '../diyRedux/my-redux'

const ADD_GUN = '加机关枪'
const REMOVE_GUN = '减机关枪'

// reducer
const counter = (state = 0, action) => {
    console.log(state, action)
    switch (action.type) {
        case ADD_GUN:
            return state + 1;
        case REMOVE_GUN:
            return state - 1;
        default:
            return 10;
    }
}

const store = createStore(counter)

const init = store.getState()
console.log('初始机枪数量', init)


const listener = () => {
    const current = store.getState()
    console.log('当前机枪数量', current)
}


// action creater
const addGun = () => {
    return { type: ADD_GUN }
}
const removeGun = () => {
    return { type: REMOVE_GUN }
}

store.subscribe(listener)


store.dispatch(addGun())
console.log(store.dispatch(addGun()))
store.dispatch(addGun())
store.dispatch(removeGun())