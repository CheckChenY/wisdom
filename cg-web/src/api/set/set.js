import request from '@/router/axios'

export function setPushSet (obj) {
    return request({
        url: '/set/inner/alertPushSet/setPushSet',
        method: 'post',
        data: obj
    })
}

export function getPushSet (obj) {
    return request({
        url: '/set/inner/alertPushSet/getPushSet',
        method: 'get',
        params: obj
    })
}

export function getAllUserByOrgId (obj) {
    return request({
        url: '/inspect/inner/safeTask/getAllUserByOrgId',
        method: 'get',
        params: obj
    })
}

export function save (obj) {
    return request({
        url: '/set/inner/alertSpreadSet/save',
        method: 'post',
        data: obj
    })
}

export function findSet () {
    return request({
        url: '/set/inner/alertSpreadSet/findSet',
        method: 'get',
    })
}