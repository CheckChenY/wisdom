

import request from '@/router/axios'

export function findByOrgId (obj) {
    return request({
        url: '/set/inner/jtlPlatformCustom/findByOrgId',
        method: 'get',
        params: obj
    })
}

export function update (obj) {
    return request({
        url: '/set/inner/jtlPlatformCustom/update',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/company/inner/jtlCompany/findById',
        method: 'get',
        params: obj
    })
}

export function logoUpdate (obj) {
    return request({
        url: '/company/inner/jtlCompany/update',
        method: 'post',
        data: obj
    })
}