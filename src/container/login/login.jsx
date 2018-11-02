import React from 'react'
import { Button, WhiteSpace, WingBlank, List, InputItem } from 'antd-mobile';
import Logo from '../../component/logo/logo'
import axios from 'axios'

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
        console.log(this.state)
        axios.get('/user/info').then(res=>{
            console.log(res)
        })
    }
    handChange(key, val){
        this.setState({
            [key]:val
        })
    }
    render(){
        return(
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
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

export default Login