import request from '@/router/axios'

export function companyBasics (obj) {
    return request({
        url: '/device/inner/jtlDevice/basicsOrg',
        method: 'get',
        params: obj
    })
}

export function societyAlarmDealResult (obj) {
    return request({
        url: '/device/inner/jtlDevice/societyAlarmDealResult',
        method: 'get',
        params: obj
    })
}

export function getCompanyTypeDistribution (obj) {
    return request({
        url: '/company/inner/jtlCompanyRelation/getCompanyTypeDistribution',
        method: 'get',
        params: obj
    })
}

export function companyAssessment (obj) {
    return request({
        url: '/device/inner/jtlDevice/assessmentOrg',
        method: 'get',
        params: obj
    })
}

export function adminAlarmDealResult (obj) {
    return request({
        url: '/warn/inner/jtlAlarmProcess/adminAlarmDealResult',
        method: 'get',
        params: obj
    })
}

export function allSystemPandect (obj) {
    return request({
        url: '/monitoring/inner/home/allSystemPandect',
        method: 'get',
        params: obj
    })
}

export function orgDeviceStatistics (obj) {
    return request({
        url: '/monitoring/inner/jtlDeviceStatistics/orgDeviceStatistics',
        method: 'get',
        params: obj
    })
}

export function weekAlarmCountBySupervise (obj) {
    return request({
        url: '/warn/inner/jtlAlarmRecord/weekAlarmCountBySupervise',
        method: 'get',
        params: obj
    })
}

export function getDeviceRealTimePandect (obj) {
    return request({
        url: '/device/inner/jtlDeviceCUD/getDeviceRealTimePandect',
        method: 'get',
        params: obj
    })
}

export function getOrgDetail (obj) {
    return request({
        url: '/device/inner/jtlDevice/getOrgDetail',
        method: 'get',
        params: obj
    })
}

export function atlasData (obj) {
    return request({
        url: '/monitoring/inner/jtlCompanyStatistics/atlasData',
        method: 'get',
        params: obj
    })
}

export function getAlarmDetail (obj) {
    return request({
        url: '/monitoring/inner/jtlCompanyStatistics/getAlarmDetail',
        method: 'get',
        params: obj
    })
}

export function getCompanyDataCount (obj) {
    return request({
        url: '/monitoring/inner/jtlCompanyStatistics/getCompanyDataCount',
        method: 'get',
        params: obj
    })
}
