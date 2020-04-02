

import request from '@/router/axios'
export function findPageList (obj) {
    return request({
        url: '/company/inner/jtlCompanyBuilding/findPageList',
        method: 'post',
        data: obj
    })
}

export function findBuildPageList (obj) {
    return request({
        url: '/company/inner/jtlCompanyBuilding/findPageList',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/company/inner/jtlCompanyBuilding/findById',
        method: 'get',
        params: obj
    })
}

export function insert (obj) {
    return request({
        url: '/company/inner/jtlCompanyBuilding/insert',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/company/inner/jtlCompanyBuilding/update',
        method: 'post',
        data: obj
    })
}

export function deleteBuilding (obj) {
    return request({
        url: '/company/inner/jtlCompanyBuilding/delete',
        method: 'get',
        params: obj
    })
}

export function findList () {
    return request({
        url: '/company/inner/jtlCompanyBuilding/findList',
        method: 'get'
    })
}