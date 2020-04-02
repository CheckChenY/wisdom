import request from '@/router/axios'

//登录
export function loginIn (obj) {
    return request({
        url: '/auth/oauth/token',
        method: 'post',
        params: obj,
        headers: {
            'Authorization': 'Basic anRsOmp0bA=='  
        },
    })
}
