

import request from '@/router/axios'
export function findPageList (obj) {
    return request({
        url: '/device/inner/jtlCompanyPassword/findPageList',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/device/inner/jtlCompanyPassword/findById',
        method: 'get',
        params: obj
    })
}

export function insert (obj) {
    return request({
        url: '/device/inner/jtlCompanyPassword/insert',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/device/inner/jtlCompanyPassword/update',
        method: 'post',
        data: obj
    })
}

export function delDict (obj) {
    return request({
        url: '/device/inner/jtlCompanyPassword/delete',
        method: 'get',
        params: obj
    })
}

export function findByCompanyId (obj) {
    return request({
        url: '/device/inner/jtlCompanyPassword/findByCompanyId',
        method: 'get',
        params: obj
    })
}