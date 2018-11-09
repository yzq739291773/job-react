import axios from 'axios'
import { Toast } from 'antd-mobile'
const API = "http://127.0.0.1:9093"

// 拦截请求
axios.interceptors.request.use(function(config) {
    Toast.loading('加载中', 0)
    return config
})

// 拦截相应

axios.interceptors.response.use(function(config) {
    Toast.hide()
    return config
})

export default API