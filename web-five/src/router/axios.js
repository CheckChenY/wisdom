/**
 *
 * http配置
 * 
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import NProgress from 'nprogress' // progress bar
// import errorCode from '@/const/errorCode'
import 'nprogress/nprogress.css' // progress bar style
import store from '../store'
// import {getStore} from '../util/store'
import {getToken} from '@/util/auth'
import {Message} from 'element-ui'
import router from "@/router/router"
axios.defaults.timeout = 65000;
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
//在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const requestMap = new Map();
//HTTPrequest拦截
axios.interceptors.request.use(config => {
        const keyString = JSON.stringify(Object.assign({}, { url: config.url, method: config.method }, config.data));
        // if (requestMap.get(keyString)) {
        //     return Promise.reject('Please slow down a little')
        // }
        requestMap.set(keyString, true);
        config = Object.assign(config, { _keyString: keyString });
        NProgress.start() // start progress bar
        const isToken = (config.data || {}).isToken === false
        if (store.getters.access_token && !isToken) {
            config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
        }
        // console.log('HTTPrequest拦截');
        return config
    }, error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    })
    //HTTPresponse拦截
axios.interceptors.response.use(res => {
    NProgress.done();
    // console.log("HTTPresponse拦截");
    // 重置requestMap
    const config = Object.assign(res.config);
    requestMap.set(config._keyString, false);
    const status = Number(res.status) || 200
    // const message = res.data.msg || errorCode[status] || errorCode['default']
    if (res.data.code === 1) {
        Message({
            message: res.data.msg ? res.data.msg: '没有数据',
            type: 'error'
        })
    }

    if (status === 401) {
        store.dispatch('FedLogOut').then(() => {
            router.push({
                path: '/login'
            })
        })
    }
    
    if (status !== 200) {
        Message({ 
            message: message,
            type: 'error'
        })
    }
    
    if (res && res.data) {
        return res
    } else {
        Message({ 
            message: "数据错误",
            type: 'error'
        })
    }
    
}, error => {
    NProgress.done();
    const status = error.response? Number(error.response.status) : 'default';
    // const message = errorCode[status] || errorCode['default'];
    // console.log('HTTPresponse拦截 error', error);
    if (status === 400 || status === 426 || status === 500 ) {
        Message({ 
            message:error.response.data.error_description ,
            type: 'error'
        })
        return
    }

    if (status === 428) {
        Message({ 
            message:error.response.data.msg ,
            type: 'error'
        })
        return
    }

    if (status === 401) {
        store.dispatch('FedLogOut').then(() => {
            router.push({
                path: '/login'
            })
        })
        return
    }

    // if (error.config && error.config.params && error.config.params.grant_type == 'refresh_token') {
    //     store.dispatch('FedLogOut').then(() => {
    //         router.push({
    //             path: '/login'
    //         })
    //     })
    //     return
    // }

    console.log(new Error(error))
    return Promise.reject(new Error(error));

})

export default axios