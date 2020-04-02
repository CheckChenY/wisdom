import request from '@/router/axios'

// 获取基本概况
export function getBasicInfo(query){
    return request({
        url:'/elect/web/indexStatistical/getBasicInfo',
        method:'get',
        params:query
    })
}

// 每日用电量变化趋势
export function getWeekElecCharts(query){
    return request({
        url:'/elect/web/indexStatistical/getWeekElecCharts',
        method:'get',
        params:query
    })
}

// 地图数据
export function getMyNetNumbers(query){
    return request({
        url:'/elect/web/acbdevice/getMyNetNumbers',
        method:'get',
        params:query
    })
}

// 报警信息列表
export function getAlertPage(query){
    return request({
        url:'/elect/web/acbElectricityAlarm/getAlertPage',
        method:'get',
        params:query
    })
}

// 报警统计饼状图
export function getAlertCountType(obj){
    return request({
        url:'/elect/web/acbElectricityAlarm/getAlertCountType',
        method:'get',
        params:obj
    })
}