import React from 'react'
import { Button, WhiteSpace, WingBlank, List, InputItem, Radio } from 'antd-mobile';
import Logo from '../../component/logo/logo'

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            type:"boss"
        }
    }
    handRegister(){
        console.log(this.state)
    }
    handChange(key, val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return(
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={val=>this.handChange('user',val)}>用户</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange={val=>this.handChange('pwd',val)}>密码</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange={val=>this.handChange('repeatpwd',val)}>确认密码</InputItem>
                        <WhiteSpace />
                        <RadioItem checked={this.state.type=='genius'}
                                    onChange={val=>this.handChange('type','genius')}>
                            牛人
                        </RadioItem>
                        <WhiteSpace />
                        <RadioItem checked={this.state.type=='boss'}
                                    onChange={val=>this.handChange('type','boss')}>
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