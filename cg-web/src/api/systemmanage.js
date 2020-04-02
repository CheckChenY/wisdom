import request from '@/router/axios'

export function findAllSystem () {
    return request({
        url: '/menu/inner/jtlSystem/findAllSystem',
        method: 'get'
    })
}

export function findPageList (obj) {
    return request({
        url: '/menu/inner/jtlSystem/findPageList',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/menu/inner/jtlSystem/findById',
        method: 'get',
        params: obj
    })
}

export function save (obj) {
    return request({
        url: '/menu/inner/jtlSystem/save',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/menu/inner/jtlSystem/update',
        method: 'post',
        data: obj
    })
}

export function deleteSystem (id) {
    return request({
        url: '/menu/inner/jtlSystem/delete/' + id,
        method: 'delete',
    })
}