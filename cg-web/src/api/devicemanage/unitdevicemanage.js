import request from '@/router/axios'
export function findCompanyByRegionId (obj) {
    return request({
        url: '/company/inner/jtlCompany/findCompanyByRegionId',
        method: 'get',
        params: obj
    })
}

//根据单位id查设备
export function findDevicePageList (obj) {
    return request({
        url: '/device/inner/jtlDevice/findDevicePageList',
        method: 'get',
        params: obj
    })
}

//解绑单位设备
export function unbundleDevice (obj) {
    return request({
        url: '/device/inner/jtlDevice/unbundleDevice',
        method: 'get',
        params: obj
    })
}

//批量解绑单位设备
export function unbundleDeviceBatch (obj) {
    return request({
        url: '/device/inner/jtlDevice/unbundleDeviceBatch',
        method: 'get',
        params: obj
    })
}