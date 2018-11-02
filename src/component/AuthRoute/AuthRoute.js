import React from 'react'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'
import axios from 'axios'

const mapStatetoProps = (state) => {
    return null
}
const actionCreaters = { loadData }
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
        axios.get('/user/info')
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        this.props.loadData(res.data.data)
                    } else {
                        console.log('未登录', this.props)
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