import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class AuthRoute extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname
        if(publicList.indexOf(pathname)>-1){
            return null
        }
        axios.get('/user/info')
            .then((res)=>{
                if(res.status == 200){
                    if(res.code == 0){
                        console.log(this.props)
                    }else{
                        console.log(this.props)
                        this.props.history.push('/login')
                    }
                }
            })
    }
    render(){
        return null
    }
}

export default withRouter(AuthRoute)