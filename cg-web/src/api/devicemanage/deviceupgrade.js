import request from '@/router/axios'

//升级列表
export function page (obj) {
    return request({
        url: '/device/inner/jtlDeviceUpgradeFile/page',
        method: 'get',
        params: obj
    })
}

//升级日志列表
export function pageLogList (obj) {
    return request({
        url: '/device/inner/jtlDeviceUpgradeFile/pageLogList',
        method: 'get',
        params: obj
    })
}

//升级
export function uploadDeviceFile (obj) {
    return request({
        url: '/device/inner/jtlDeviceUpgradeFile/uploadDeviceFile',
        method: 'get',
        params: obj
    })
}

export function addFile (obj) {
    return request({
        url: '/device/inner/jtlDeviceUpgradeFile/addFile',
        method: 'post',
        data: obj
    })
}




