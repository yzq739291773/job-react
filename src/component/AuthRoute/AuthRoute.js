import React from 'react'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'
import axios from 'axios'

const mapStatetoProps = (state) => {
    return {}
}
const actionCreaters = { loadData }
const API = "http://127.0.0.1:9093/"
class AuthRoute extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    componentDidMount() {
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return null
        }
        axios.get(API+'user/info')
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        this.props.loadData(res.data.data)
                    } else {
                        this.props.history.push('/login')
                    }
                }
            })
    }
    render() {
        return null
    }
}

AuthRoute = connect(mapStatetoProps, actionCreaters)(AuthRoute)
export default withRouter(AuthRoute)