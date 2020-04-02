

import request from '@/router/axios'
export function findDevicePageList (obj) {
    return request({
        url: '/device/inner/jtlDeviceDetail/findDevicePageList',
        method: 'post',
        params: obj
    })
}

export function findById (obj) {
    return request({
        url: '/device/inner/jtlDeviceDetail/findById',
        method: 'get',
        params: obj
    })
}

export function insert (obj) {
    return request({
        url: '/device/inner/jtlDeviceDetail/insert',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/device/inner/jtlDeviceDetail/update',
        method: 'post',
        data: obj
    })
}

export function delDeviceUser (obj) {
    return request({
        url: '/device/inner/jtlDeviceDetail/delete',
        method: 'get',
        params: obj
    })
}

export function findByDeviceId (obj) {
    return request({
        url: '/device/inner/jtlDevice/findByDeviceId',
        method: 'get',
        params: obj
    })
}

export function insertByUser (obj) {
    return request({
        url: '/device/inner/jtlDeviceDetail/insertByUser',
        method: 'post',
        data: obj
    })
}

export function findByDeviceCode (obj) {
    return request({
        url: '/device/inner/jtlDevice/findByDeviceCode',
        method: 'get',
        params: obj
    })
}