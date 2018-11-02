import React from 'react'
import {NavBar,InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'


const mapStatetoProps = (state)=>{
    return {user:state.user}
}
const actionCreaters = {update}
class GeniusInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
			title:'',
			desc:''
		}
    }
    onChange(key,val){
		this.setState({
			[key]:val
		})
	}
    render(){
        const path = this.props.location.pathname
		const redirect = this.props.user.redirectTo
        return(
            <div>
                {redirect&&redirect!==path? <Redirect to={this.props.user.redirectTo}></Redirect> :null}
				<NavBar mode="dark" >牛人完善信息页</NavBar>
				<AvatarSelector 
					selectAvatar={(imgname)=>{
						this.setState({
							avatar:imgname
						})
					}}
				></AvatarSelector>
				<InputItem onChange={(v)=>this.onChange('title',v)}>
					求职岗位
				</InputItem>
				<TextareaItem
					onChange={(v)=>this.onChange('desc',v)}
					rows={3}
					autoHeight
					title='个人见解'
				>
				</TextareaItem>
				<Button 
					onClick={()=>{
						this.props.update(this.state)
					}}
					type='primary'>保存</Button>
            </div>
        )
    }
}

GeniusInfo = connect(mapStatetoProps, actionCreaters)(GeniusInfo)
export default GeniusInfo