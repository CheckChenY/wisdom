

import request from '@/router/axios'
export function findPageList (obj) {
    return request({
        url: '/device/inner/jtlCompanyDic/findPageList',
        method: 'post',
        data: obj
    })
}

export function findAll (obj) {
    return request({
        url: '/device/inner/jtlCompanyDic/findAll',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/device/inner/jtlCompanyDic/findById',
        method: 'get',
        params: obj
    })
}

export function insert (obj) {
    return request({
        url: '/device/inner/jtlCompanyDic/insert',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/device/inner/jtlCompanyDic/update',
        method: 'post',
        data: obj
    })
}

export function delDict (obj) {
    return request({
        url: '/device/inner/jtlCompanyDic/delete',
        method: 'get',
        params: obj
    })
}

export function findPrefix (obj) {
    return request({
        url: '/device/inner/jtlDeviceSystemDic/findPrefix',
        method: 'get',
        params: obj
    })
}

export function findDeviceModel () {
    return request({
        url: '/device/inner/jtlDeviceSystemDic/findDeviceModel',
        method: 'get'
    })
}