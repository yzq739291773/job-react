import axios from 'axios'
import { getRedirectPath } from '../common/util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
    redirectTo: '',
    isAuth: false,
    msg: '',
    user: '',
    type: ''
}

export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload }
        case LOGIN_SUCCESS:
            return {...state, msg: '', isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload }
        case ERROR_MSG:
            return {...state, redirectTo: '', msg: action.msg, isAuth: false }
        default:
            return state
    }
}

function registerSuccess(data) {
    return { type: REGISTER_SUCCESS, payload: data }
}

function loginSuccess(data) {
    return { type: LOGIN_SUCCESS, payload: data }
}

function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}
export function login({ user, pwd }) {
    if (!user || !pwd) {
        return errorMsg('用户名和密码必须输入')
    }
    return dispatch => {
        axios.post('/user/login', { user, pwd })
            .then(res => {
                console.log(111, res)
                if (res.status === 200 && res.data.code === 0) {
                    console.log('登录成功')
                    dispatch(loginSuccess(res.data.data))
                } else {
                    console.log('登录失败')
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
export function register({ user, pwd, repeatpwd, type }) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名和密码必须输入')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不一致')
    }
    return dispatch => {
        axios.post('/user/register', { user, pwd, type })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess({ user, pwd, type }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}