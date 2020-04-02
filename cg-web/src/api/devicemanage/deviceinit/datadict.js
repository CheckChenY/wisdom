

import request from '@/router/axios'
export function findPageList (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeDataDic/findPageList',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeDataDic/findById',
        method: 'get',
        params: obj
    })
}

export function insert (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeDataDic/insert',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeDataDic/update',
        method: 'post',
        data: obj
    })
}

export function delDict (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeDataDic/delete',
        method: 'get',
        params: obj
    })
}
