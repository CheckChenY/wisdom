

import request from '@/router/axios'
export function findPageList (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeStateDic/findPageList',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeStateDic/findById',
        method: 'get',
        params: obj
    })
}

export function insert (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeStateDic/insert',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeStateDic/update',
        method: 'post',
        data: obj
    })
}

export function delDict (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeStateDic/delete',
        method: 'get',
        params: obj
    })
}
