import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

const mapStatetoProps = (state)=>{
    return {chatuser:state.chatuser}
}
const actionCreaters = {getUserList}
class Boss extends React.Component{
	componentDidMount() {
		this.props.getUserList('genius')
	}
	render(){
		return <UserCard userlist={this.props.chatuser.userlist}></UserCard>
	}

}

Boss = connect(mapStatetoProps, actionCreaters)(Boss)
export default Boss