import request from '@/router/axios'

export function findDevicePage (obj) {
    return request({
        url: '/device/inner/jtlDeviceCUD/findDevicePage',
        method: 'get',
        params: obj
    })
}

//监控首页设备状态饼状图
export function allDeviceState () {
    return request({
        url: '/monitoring/inner/home/allDeviceState',
        method: 'get'
    })
}

//监控首页个系统设备总览
export function allSystemPandect () {
    return request({
        url: '/monitoring/inner/home/allSystemPandect',
        method: 'get'
    })
}

export function getDeviceDetail (obj) {
    return request({
        url: '/device/inner/jtlDeviceCUD/getDeviceDetail',
        method: 'get',
        params: obj
    })
}

export function findDevicePicture (obj) {
    return request({
        url: '/device/inner/jtlDeviceCUD/findDevicePicture',
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

export function getDeviceMonitoringData (obj) {
    return request({
        url: '/device/inner/jtlDevice/getDeviceMonitoringData',
        method: 'get',
        params: obj
    })
}

export function getAlarmByDevice (obj) {
    return request({
        url: '/warn/inner/jtlAlarmRecord/getAlarmByDevice',
        method: 'get',
        params: obj
    })
}

export function stateAnalysisByMonth (obj) {
    return request({
        url: '/warn/inner/jtlAlarmRecord/stateAnalysisByMonth',
        method: 'get',
        params: obj
    })
}

export function changeDeviceThreshold (obj) {
    return request({
        url: '/device/inner/jtlDeviceThreshold/changeDeviceThreshold',
        method: 'post',
        data: obj
    })
}

export function getDeviceThresholdNowDateApp (obj) {
    return request({
        url: '/device/inner/jtlDevice/getDeviceThresholdNowDateApp',
        method: 'get',
        params: obj
    })
}

export function operationApp (obj) {
    return request({
        url: '/device/inner/jtlDevice/operationApp',
        method: 'get',
        params: obj
    })
}

export function getOperationList (obj){
    return request({
        url:'/device/inner/jtlDeviceOperationLog/findListByOperationType',
        method:'get',
        params:obj
    })
}

export function getOrderList (obj) {
    return request({
        url: '/device/inner/jtlDevice/getOrderList',
        method: 'get',
        params: obj
    })
}

export function getMyPassWord (obj) {
    return request({
        url: '/device/inner/jtlCompanyPassword/getMyPassWord',
        method: 'get',
        params: obj
    })
}

export function findListByDeviceIdWeb (obj) {
    return request({
        url: '/device/inner/jtlDeviceOperationLog/findListByDeviceIdWeb',
        method: 'get',
        params: obj
    })
}


export function findDevicePictureCamera (obj) {
    return request({
        url: '/camera/inner/jtlDeviceCamera/findDevicePicture',
        method: 'get',
        params: obj
    })
}


//工作台
export function findDeviceNormal (obj) {
    return request({
        url: '/device/inner/jtlDeviceDetail/deviceByWorkbench',
        method: 'get',
        params: obj
    })
}
//工作台摄像头列表
export function findCamcerPageList (obj) {
    return request({
        url: '/camera/inner/jtlDeviceCamera/findCameraPageListByOrgId',
        method: 'get',
        params: obj
    })
}