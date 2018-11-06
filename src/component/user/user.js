import React from 'react'
import {connect} from 'react-redux'
import {Result, List,Brief,WhiteSpace,Modal, Button} from 'antd-mobile'
import reactCookie from 'react-cookies'
import {logoutSubmit} from '../../redux/user.redux'

const mapStatetoProps = (state)=>{
    return {user:state.user}
}
var setCookie = function (name, value, day) {
	       if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
	         var expires = day * 24 * 60 * 60 * 1000;
            var date = new Date(+new Date()+expires);
           document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
          }else{
            document.cookie = name + "=" + escape(value);
         }
	   };
	   var delCookie = function (name) {
		       console.log(5555)
		       setCookie(name, ' ', -1);
		     };  
const actionCreaters = {logoutSubmit}
class User extends React.Component{
	constructor(props){
		super(props)

	}
	logout(){
		console.log('注销')
		const alert = Modal.alert

		alert('注销', '确认退出登录吗???', [
		      { text: '取消', onPress: () => console.log('cancel') },
		      { text: '确认', onPress: () => {
			
				reactCookie.remove('userid')
				//   delCookie('userid')
				  this.props.logoutSubmit()
				  this.props.history.push('/login');
		      }}
		    ])
	}
	render(){
		console.log('user页面',this.props)
		const props = this.props
		const Item = List.Item
		const Brief = Item.Brief
		return props.user.user?(
			<div>
				<Result
					img={<img src={require(`../img/${props.user.avatar}.png`)} style={{width:50}} alt="" />}
					title={props.user.user}
					message={props.user.type=='boss'?props.user.company:null}
				/>
				
				<List renderHeader={()=>'简介'}>
					<Item
						multipleLine
					>
						{props.user.title}
						{props.user.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
						{props.user.money?<Brief>薪资:{props.user.money}</Brief>:null}
					</Item>
					
				</List>
				<WhiteSpace></WhiteSpace>
				{/* <List> */}
					<Button onClick={()=>this.logout()} type="warning">退出登录</Button><WhiteSpace />
					{/* <Item >退出登录</Item> */}
				{/* </List> */}
			</div>
		):null

	}
}
{/* <Redirect to={props.user.redirectTo} /> */}
User = connect(mapStatetoProps, actionCreaters)(User)
export default User
