import request from '@/router/axios'

export function findAlSystem() {
    return request({
        url: '/menu/inner/jtlSystem/findAllSystem',
        method: 'get',
        // data: obj
    })
}

//获取验证码
export function checkPhone (val) {
    return request({
        url: '/auth/check-phone',
        method: 'get',
        params: val,
        headers: {
            'Authorization': 'Basic anRsOmp0bA=='  
        },
    })
}

//修改密码
export function onchangeSubmit (val) {
    return request({
        url: '/auth/changePassword',
        method: 'post',
        data: val,
        headers: {
            'Authorization': 'Basic anRsOmp0bA=='  
        },
    })
}