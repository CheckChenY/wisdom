

import request from '@/router/axios'
export function findPageList (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeOrderDic/findPageList',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeOrderDic/findById',
        method: 'get',
        params: obj
    })
}

export function insert (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeOrderDic/insert',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeOrderDic/update',
        method: 'post',
        data: obj
    })
}

export function delDict (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeOrderDic/delete',
        method: 'get',
        params: obj
    })
}
