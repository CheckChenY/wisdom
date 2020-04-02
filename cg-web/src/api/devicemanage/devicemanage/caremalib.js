

import request from '@/router/axios'
export function findCameraPageList (obj) {
    return request({
        url: '/camera/inner/jtlDeviceCamera/findCameraPageListByOrgId',
        method: 'get',
        params: obj
    })
}

export function deleteCamera(obj){
    return request({
        url: '/camera/inner/jtlDeviceCamera/delete',
        method: 'get',
        params: obj
    })
}

export function addFile (obj) {
    return request({
        url: '/pub/open/file/addFile',
        method: 'post',
        data: obj
    })
}

export function insert (obj) {
    return request({
        url: '/camera/inner/videoHead/register',
        method: 'post',
        data: obj
    })
}

export function updateCamera(obj) {
    return request({
        url: '/camera/inner/jtlDeviceCamera/update',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/pub/inner/jtlDeviceDict/findById',
        method: 'get',
        params: obj
    })
}
