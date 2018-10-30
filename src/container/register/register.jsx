import React from 'react'
import { Button, WhiteSpace, WingBlank, List, InputItem, Radio } from 'antd-mobile';
import Logo from '../../component/logo/logo'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    handRegister(){
        console.log('注册成功')
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return(
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace />
                        <InputItem>密码</InputItem>
                        <WhiteSpace />
                        <InputItem>确认密码</InputItem>
                        <WhiteSpace />
                        <RadioItem>
                            牛人
                        </RadioItem>
                        <WhiteSpace />
                        <RadioItem>
                            boss
                        </RadioItem>
                    </List>
                    <Button onClick={()=>this.handRegister()} type="primary">注册</Button>
                    <WhiteSpace />
                </WingBlank>
            </div>
        )
    }
}

export default Register