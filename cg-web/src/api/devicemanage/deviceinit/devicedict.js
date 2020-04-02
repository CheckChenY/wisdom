

import request from '@/router/axios'
export function findPageList (obj) {
    return request({
        url: '/pub/inner/jtlDeviceDict/findPageList',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/pub/inner/jtlDeviceDict/findById',
        method: 'get',
        params: obj
    })
}

export function insert (obj) {
    return request({
        url: '/pub/inner/jtlDeviceDict/insert',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/pub/inner/jtlDeviceDict/update',
        method: 'post',
        data: obj
    })
}

export function delDict (obj) {
    return request({
        url: '/pub/inner/jtlDeviceDict/delete',
        method: 'get',
        params: obj
    })
}

export function findByParentList (obj) {
    return request({
        url: '/pub/inner/jtlDeviceDict/findByParentList',
        method: 'get',
        params: obj
    })
}