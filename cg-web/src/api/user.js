
import request from '@/router/axios'
//修改
export function update (obj) {
    return request({
        url: '/company/inner/jtlCompany/update',
        method: 'post',
        data: obj
    })
}

//修改
export function unCheckedUpdate (obj) {
    return request({
        url: '/company/inner/jtlCompany/unCheckedUpdate',
        method: 'post',
        data: obj
    })
}

export function save (obj) {
    return request({
        url: '/auth/jtluser/update',
        method: 'post',
        data: obj
    })
}

//修改密码
export function changePasswordApp (val) {
    return request({
        url: '/auth/changePasswordApp',
        method: 'post',
        data: val,
        headers: {
            'Authorization': 'Basic anRsOmp0bA=='  
        },
    })
}