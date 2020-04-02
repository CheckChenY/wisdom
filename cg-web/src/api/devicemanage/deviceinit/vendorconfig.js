

import request from '@/router/axios'
export function findPageList (obj) {
    return request({
        url: '/device/inner/jtlCompanyConfig/findPageList',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/device/inner/jtlCompanyConfig/findById',
        method: 'get',
        params: obj
    })
}

export function insert (obj) {
    return request({
        url: '/device/inner/jtlCompanyConfig/insert',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/device/inner/jtlCompanyConfig/update',
        method: 'post',
        data: obj
    })
}

export function delDict (obj) {
    return request({
        url: '/device/inner/jtlCompanyConfig/delete',
        method: 'get',
        params: obj
    })
}