import axios from 'axios'
import { getRedirectPath } from '../common/util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const LOAD_DATA = 'LOAD_DATA'
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
        case AUTH_SUCCESS:
			return {...state, msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload }
        case ERROR_MSG:
            return {...state, redirectTo: '', msg: action.msg, isAuth: false }
        case LOGOUT:
			return {...initState,redirectTo:'/login'}
        default:
            return state
    }
}

function authSuccess(data){
	// const {pwd,...data} = obj
	return {type: AUTH_SUCCESS, payload:data}
}

function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}
export function logoutSubmit(){
	return { type:LOGOUT }
}
export function loadData(userinfo) {
    return { type: LOAD_DATA, payload: userinfo }
}
export function update(data){
	return dispatch=>{
		axios.post('/user/update',data)
			.then(res=>{
				if (res.status===200&&res.data.code===0) {
					dispatch(authSuccess(res.data.data))
				}else{
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
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
                    dispatch(authSuccess(res.data.data))
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
                    dispatch(authSuccess({ user, pwd, type }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}