import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

const mapStatetoProps = (state)=>{
    return {chatuser:state.chatuser}
}
const actionCreaters = {getUserList}
class Genius extends React.Component{
	componentDidMount() {
		this.props.getUserList('boss')

	}
	render(){
		return <UserCard userlist={this.props.chatuser.userlist}></UserCard>
	}

}

Genius = connect(mapStatetoProps, actionCreaters)(Genius)
export default Genius