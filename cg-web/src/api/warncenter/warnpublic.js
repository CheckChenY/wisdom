import request from '@/router/axios'
export function insert (obj) {
    return request({
        url: '/warn/inner/jtlAlarmProcess/insert',
        method: 'post',
        data: obj
    })
}

export function findDetailById (obj) {
    return request({
        url: '/warn/inner/jtlAlarmRecord/findDetailById',
        method: 'get',
        params: obj
    })
}

export function getAlarmDate (obj) {
    return request({
        url: '/warn/inner/jtlAlarmData/getAlarmDate',
        method: 'get',
        params: obj
    })
}

export function findAlarmPicture (obj) {
    return request({
        url: '/warn/inner/jtlAlarmRecord/findAlarmPicture',
        method: 'get',
        params: obj
    })
}

export function findByRecordId (obj) {
    return request({
        url: '/warn/inner/jtlAlarmProcess/findByRecordId',
        method: 'get',
        params: obj
    })
}

export function getDeviceDetail (obj) {
    return request({
        url: '/device/inner/jtlDevice/getDeviceDetail',
        method: 'get',
        params: obj
    })
}

export function getDeviceMonitoringData (obj) {
    return request({
        url: '/device/inner/jtlDevice/getDeviceMonitoringData',
        method: 'get',
        params: obj
    })
}

export function getLinkDevice (obj) {
    return request({
        url: '/device/inner/jtlDevice/getLinkDevice',
        method: 'get',
        params: obj
    })
}

export function findByDeviceId (obj) {
    return request({
        url: '/device/inner/jtlDeviceOperationLog/findByDeviceId',
        method: 'get',
        params: obj
    })
}

export function device (obj) {
    return request({
        url: '/camera/inner/videoHead/list',
        method: 'get',
        params: obj
    })
}

export function rtmp (obj) {
    return request({
        url: '/camera/inner/videoHead/rtmp',
        method: 'get',
        params: obj
    })
}
