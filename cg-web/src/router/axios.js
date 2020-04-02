/**
 *
 * http配置
 * 
 */
import axios from 'axios'
import store from '../store'
// import {getStore} from '../util/store'
import {getToken} from '@/util/auth'
import { dataSpec, validateparam } from '@/util/public'
import router from "@/router"
axios.defaults.timeout = 65000;
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
//在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
//HTTPrequest拦截
axios.interceptors.request.use(config => {
    if (validateparam(config.data)) {
        return false
    }
    config.data = dataSpec(config.data) // 规范图片地址字段
    const isToken = (config.data || {}).isToken === false
    if (store.getters.access_token && !isToken) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
}, error => {
    return error
})
//HTTPresponse拦截
axios.interceptors.response.use(res => {
    const status = Number(res.status) || 200
    if (status === 401) {
        store.dispatch('FedLogOut').then(() => {
            router.push({
                path: '/login'
            })
        })
        return
    }
    return res
}, error => {
    return error;
})

export default axios
