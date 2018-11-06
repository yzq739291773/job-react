import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import PropTypes from 'prop-types'
import UserCard from '../usercard/usercard'

const mapStatetoProps = (state)=>{
    return {chatuser:state.chatuser}
}
const actionCreaters = {getUserList}
class Genius extends React.Component{
	// 子组件声明自己要使用context
	static contextTypes = {
        color: PropTypes.string,
    }
	componentDidMount() {
		this.props.getUserList('boss')

	}
	render(){
		// 测试contex的用法
		console.log('牛人',this.context.color)
		return <UserCard userlist={this.props.chatuser.userlist}></UserCard>
	}

}

Genius = connect(mapStatetoProps, actionCreaters)(Genius)
export default Genius