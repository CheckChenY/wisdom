

import request from '@/router/axios'
export function findPageList (obj) {
    return request({
        url: '/device/inner/jtlDeviceSystemDic/findPageList',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/device/inner/jtlDeviceSystemDic/findById',
        method: 'get',
        params: obj
    })
}

export function insert (obj) {
    return request({
        url: '/device/inner/jtlDeviceSystemDic/insert',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/device/inner/jtlDeviceSystemDic/update',
        method: 'post',
        data: obj
    })
}

export function delDict (obj) {
    return request({
        url: '/device/inner/jtlDeviceSystemDic/delete',
        method: 'get',
        params: obj
    })
}
