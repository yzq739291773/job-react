import React from 'react'
import { Button, WhiteSpace, WingBlank, List, InputItem } from 'antd-mobile';
import Logo from '../../component/logo/logo'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import { Redirect} from 'react-router-dom'

const mapStatetoProps = (state)=>{
    return {user:state.user}
}
const actionCreaters = {login}

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:'',
        }
    }
    register(){
        console.log('注册',this.props)
        this.props.history.push('/register');
    }
    login(){
        console.log('登录',this.props)
        this.props.login(this.state)
    }
    handChange(key, val){
        this.setState({
            [key]:val
        })
    }
    render(){
        return(
            <div>
                {this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo} />:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.user.msg?<p className='error-msg'>{this.props.user.msg}</p>:null}   
                        <InputItem onChange={val=>this.handChange('user',val)}>用户</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange={val=>this.handChange('pwd',val)}>密码</InputItem>
                        <WhiteSpace />
                    </List>
                    <Button onClick={()=>this.login()} type="primary">登录</Button>
                    <WhiteSpace />
                    <Button onClick={()=>this.register()} type="primary">注册</Button>
                    <WhiteSpace />
                </WingBlank>
            </div>
        )
    }
}

Login = connect(mapStatetoProps, actionCreaters)(Login)
export default Login