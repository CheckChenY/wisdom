import request from '@/router/axios'

export function registerAdd (obj) {
    return request({
        url: '/auth/addSysOry',
        method: 'post',
        data:obj
    })
}

export function registerUser (obj) {
    return request({
        url: '/auth/addSysUser',
        method: 'post',
        data:obj
    })
}

export function checkPhoneAndCode (obj) {
    return request({
        url: '/auth/checkPhoneAndCode',
        method: 'post',
        data:obj
    })
}

export const updatePass = (obj) => {
    return request({
        url: '/auth/checkCode',
        method: 'post',
        data: obj
    })
}

export function checkPhone (query) {
    return request({
      url: '/auth/getPhoneCode',
      method: 'get',
      params: query
    })
}