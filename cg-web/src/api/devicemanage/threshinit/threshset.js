import request from '@/router/axios'

export function insert (obj) {
    return request({
        url: '/device/inner/jtlDefaultThreshold/insert',
        method: 'post',
        data: obj
    })
}

export function findByLicence (obj) {
    return request({
        url: '/device/inner/jtlDeviceTypeThreshDic/findByLicence',
        method: 'get',
        params: obj
    })
}

export function findByType (obj) {
    return request({
        url: '/device/inner/jtlDefaultThreshold/findByType',
        method: 'get',
        params: obj
    })
}