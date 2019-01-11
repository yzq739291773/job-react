import axios from 'axios'
import { Toast } from 'antd-mobile'
const API = "http://127.0.0.1:9093"
let setToken = function(config){
    var token = sessionStorage.getItem('token')
    if(token != null){
        config.headers['X-Token'] = token
    }
    if(config.method=='post'){
        config.data = {
            ...config.data
        }
    }else if(config.method=='get'){
        config.params = {
            ...config.params
        }
    }
}
// 拦截请求
axios.interceptors.request.use(function(config) {
    console.log('拦截请求前',config)
    var token = sessionStorage.getItem('token')
    if(token != null){
        config.headers['token'] = token
    }
    if(config.method=='post'){
        config.data = {
            ...config.data
        }
    }else if(config.method=='get'){
        config.params = {
            ...config.params
        }
    }
    Toast.loading('加载中', 0)
    console.log('拦截请求后',config)
    return config
})

// 拦截相应

axios.interceptors.response.use(function(config) {
    Toast.hide()
    return config
})

export default API