

import request from '@/router/axios'
export function findPageList (obj) {
    return request({
        url: '/menu/inner/jtlRole/findPageList',
        method: 'get',
        params: obj
    })
}

export function findByUserId (obj) {
    return request({
        url: '/menu/inner/jtlRole/findByUserId',
        method: 'get',
        params: obj
    })
}

export function insert (obj) {
    return request({
        url: '/menu/inner/jtlRole/insert',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/menu/inner/jtlRoleSmmoRelation/update',
        method: 'post',
        data: obj
    })
}

export function deleteRole (id) {
    return request({
        url: '/menu/inner/jtlRole/delete/' + id,
        method: 'get',
    })
}

export function findByRoleCode (obj) {
    return request({
        url: '/menu/inner/jtlRole/findByRoleCode',
        method: 'get',
        params: obj
    })
}
