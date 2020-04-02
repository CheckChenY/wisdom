import request from '@/router/axios'
export function findByBuildCode (obj) {
    return request({
        url: '/company/inner/jtlCompanyFloor/findByBuildCode',
        method: 'get',
        params: obj
    })
}

export function findById (obj) {
    return request({
        url: '/company/inner/jtlCompanyFloor/findById',
        method: 'get',
        params: obj
    })
}

export function findPageList (obj) {
    return request({
        url: '/company/inner/jtlCompanyFloor/findPageList',
        method: 'post',
        data: obj
    })
}

export function insert (obj) {
    return request({
        url: '/company/inner/jtlCompanyFloor/insert',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/company/inner/jtlCompanyFloor/update',
        method: 'post',
        data: obj
    })
}

export function deleteFloor (obj) {
    return request({
        url: '/company/inner/jtlCompanyFloor/delete',
        method: 'get',
        params: obj
    })
}

export function findAllFloor (obj) {
    return request({
        url: '/company/inner/jtlCompanyFloor/findList',
        method: 'get',
        params: obj
    })
}