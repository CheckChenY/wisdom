

import request from '@/router/axios'

export function findCameraPageList (obj) {
    return request({
        url: '/camera/inner/jtlDeviceCamera/findCameraPageList',
        method: 'get',
        params: obj
    })
}

export function findCameraPageListByOrgId (obj) {
    return request({
        url: '/camera/inner/jtlDeviceCamera/findCameraPageListByOrgId',
        method: 'get',
        params: obj
    })
}

export function update (obj) {
    return request({
        url: '/camera/inner/jtlDeviceCamera/update',
        method: 'post',
        data: obj
    })
}

export function deleteCamera(obj){
    return request({
        url: '/camera/inner/jtlDeviceCamera/delete',
        method: 'get',
        params: obj
    })
}

export function findDicIdByDesc(obj){
    return request({
        url: '/pub/inner/jtlDeviceDict/findDicIdByDesc',
        method: 'get',
        params: obj
    })
}


