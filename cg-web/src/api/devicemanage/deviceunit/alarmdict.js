

import request from '@/router/axios'
export function findPageList (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeAlarmDic/findPageList',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeAlarmDic/findById',
        method: 'get',
        params: obj
    })
}

export function insert (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeAlarmDic/insert',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeAlarmDic/update',
        method: 'post',
        data: obj
    })
}

export function delDict (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeAlarmDic/delete',
        method: 'get',
        params: obj
    })
}
