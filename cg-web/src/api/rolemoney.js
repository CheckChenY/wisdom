

import request from '@/router/axios'
export function findPageList (obj) {
    return request({
        url: '/pack/inner/jtlFunctionPackage/findPageList',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/pack/inner/jtlFunctionPackage/findById',
        method: 'get',
        params: obj
    })
}

export function insert (obj) {
    return request({
        url: '/pack/inner/jtlFunctionPackage/insert',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/pack/inner/jtlFunctionPackage/update',
        method: 'post',
        data: obj
    })
}

export function deletePackage (obj) {
    return request({
        url: '/pack/inner/jtlFunctionPackage/delete',
        method: 'get',
        params: obj
    })
}

export function findPackageOrg (obj) {
    return request({
        url: '/pack/inner/jtlFunctionPackage/findPackageOrg',
        method: 'get',
        params: obj
    })
}

export function packagemenuinsert (obj) {
    return request({
        url: '/pack/inner/jtlFunctionPackageDetail/insert',
        method: 'post',
        data: obj
    })
}

export function packagemenuupdate (obj) {
    return request({
        url: '/pack/inner/jtlFunctionPackageDetail/update',
        method: 'post',
        data: obj
    })
}

export function packagemenufindById (obj) {
    return request({
        url: '/pack/inner/jtlFunctionPackageDetail/findById',
        method: 'get',
        params: obj
    })
}

