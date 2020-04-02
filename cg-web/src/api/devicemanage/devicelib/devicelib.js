

import request from '@/router/axios'
export function findDeviceList (obj) {
    return request({
        url: '/device/inner/jtlDevice/findDeviceList',
        method: 'post',
        data: obj
    })
}

export function insertByAdmin (obj) {
    return request({
        url: '/device/inner/jtlDeviceCUD/insertByAdmin',
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

export function initstatue (obj) {
    return request({
        url: '/device/inner/jtlDeviceCUD/initStatue',
        method: 'get',
        params: obj
    })
}

export function init (obj) {
    return request({
        url: '/device/inner/jtlDeviceCUD/init',
        method: 'get',
        params: obj
    })
}

export function deleteDevice (obj) {
    return request({
        url: '/device/inner/jtlDeviceCUD/delete',
        method: 'get',
        params: obj
    })
}

export function deviceUpdate (obj) {
    return request({
        url: '/device/inner/jtlDeviceCUD/update',
        method: 'post',
        data: obj
    })
}

export function initializeThreshold (obj) {
    return request({
        url: '/device/inner/jtlDeviceThreshold/initializeThreshold',
        method: 'get',
        params: obj
    })
}

export function mute (obj) {
    return request({
        url: '/device/inner/jtlDeviceCUD/mute',
        method: 'get',
        params: obj
    })
}

export function findByPrefixAndSuffix (obj) {
    return request({
        url: '/device/inner/jtlDeviceSystemDic/findByPrefixAndSuffix',
        method: 'get',
        params: obj
    })
}