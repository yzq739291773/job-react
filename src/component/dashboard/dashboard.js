import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {Switch, Route,Redirect} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'
import {getMsgList,recvMsg} from '../../redux/chat.redux'


const mapStatetoProps = (state)=>{
    return {state:state}
}
const actionCreaters = {getMsgList,recvMsg}
class Dashboard extends React.Component{
	// 父组件声明自己支持context
	static childContextTypes = {
        color: PropTypes.string,
	}
	// 提供一个函数，用来返回相应的context对象
	getChildContext() {
        return {
            color: 'red',
        };
    }
	componentDidMount(){
		if (!this.props.state.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}

	}

	render(){
		const {pathname} = this.props.location
		const user = this.props.state.user
		const navList = [
			{
				path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				component:Boss,
				hide:user.type==='genius'
			},
			{
				path:'/genius',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
				component:Genius,
				hide:user.type==='boss'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:User
			}
		]
		return (

			pathname === '/'?<Redirect to='/login' />:
			(
			<div>
				<NavBar className='fixd-header' mode='dard'>{navList.find(v=>v.path===pathname).title}</NavBar>
				<div style={{marginTop:45,marginBottom:45}}>
						<Switch>
							{navList.map(v=>(
							
								<Route key={v.path} path={v.path} component={v.component}>
									{console.log(v)}
								</Route>
							))}
						</Switch>
				</div>
				<NavLinkBar style={{height:45}}  data={navList}></NavLinkBar>
			</div>
			)
		)
	}
}

Dashboard = connect(mapStatetoProps, actionCreaters)(Dashboard)
export default Dashboard