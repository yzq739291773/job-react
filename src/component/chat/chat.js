import React from 'react'
import {List,InputItem,NavBar,Icon, Grid} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
// import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux'
// import {getChatId} from '../../util'
// const socket = io('ws://localhost:9093')


// $('#test').find('img')
// $('#test img')

// @connect(
// 	state=>state,
// 	{ getMsgList, sendMsg, recvMsg, readMsg}
// )
class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state = {text:'',msg:[]}
	}
	componentDidMount(){
		const socket = io('ws://localhost:9093')
	}

	render(){
        return(
            <h1>聊天页面</h1>
        )
    }
}

export default Chat