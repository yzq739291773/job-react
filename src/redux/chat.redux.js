import axios from 'axios'
import io from 'socket.io-client'
import API from '../config'
const socketDomain = {
    dev:io('ws://192.168.29.12:9093'),
    test:io('ws://192.168.29.9:9093'),
    prod:io('ws://47.106.80.74:9093')
}
let socket = socketDomain[process.env.REACT_APP_BUILD_MODE]
console.log('socket环境',process.env.REACT_APP_BUILD_MODE)
console.log('socket信息',socket)
// let socket = io('ws://localhost:9093')
// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
	chatmsg:[],
	users:{},
	unread:0
}

export function chat(state=initState, action){
	switch(action.type){
		case MSG_LIST:
			return {...state,users:action.payload.users, chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.userid).length}
		case MSG_RECV:
			const n = action.payload.to===action.userid?1:0
			return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
		case MSG_READ:
			const {from, num} = action.payload
			return {...state, chatmsg:state.chatmsg.map(v=>({...v,read:from===v.from?true:v.read})), unread:state.unread-num}
		default:
			return state
	}
}
function msgList(msgs, users, userid){
	return {type:MSG_LIST,payload:{msgs,users,userid}}
}
function msgRecv(msg,userid){
	return {userid, type:MSG_RECV, payload:msg}
}
function msgRead({from,userid,num}){
	return {type: MSG_READ, payload:{from,userid,num}}
}
export function readMsg(from){
	return (dispatch,getState)=>{
		axios.post(API+'/user/readmsg',{from})
			.then(res=>{
				const userid = getState().user._id
				if (res.status===200 && res.data.code===0) {
					dispatch(msgRead({userid,from,num:res.data.num}))
				}
			})
	}
}
export function recvMsg(){
	return (dispatch, getState)=>{
		socket.on('recvmsg',function(data){
			console.log('recvmsg',data)
			const userid = getState().user._id
			dispatch(msgRecv(data, userid))
		})
	}
}
export function sendMsg({from ,to ,msg}){
	return dispatch=>{
		socket.emit('sendmsg',{from ,to ,msg})
	}
	
}
export function getMsgList(){
	return (dispatch,getState)=>{
		axios.get(API+'/user/getmsglist')
			.then(res=>{
				if (res.status===200 && res.data.code===0) {
					console.log('chat redux',getState())
					const userid = getState().user._id
					dispatch(msgList(res.data.msgs, res.data.users,userid))
				}
			})
	}
}



