import React from 'react'
import { Button, WhiteSpace, WingBlank, List, InputItem } from 'antd-mobile';
import Logo from '../../component/logo/logo'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    register(){
        console.log('注册',this.props)
        this.props.history.push('/register');
    }
    render(){
        return(
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace />
                        <InputItem>密码</InputItem>
                        <WhiteSpace />
                    </List>
                    <Button type="primary">登录</Button>
                    <WhiteSpace />
                    <Button onClick={()=>this.register()} type="primary">注册</Button>
                    <WhiteSpace />
                </WingBlank>
            </div>
        )
    }
}

export default Login