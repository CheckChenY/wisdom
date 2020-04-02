import request from '@/router/axios'
// export function industryList(data, datas) {
//     return request({
//         url: '/unit/devicealertdeal/page?'+data,
//         method: 'get',
//         data: datas,
//         // data: datas
//     })
// }

//警情处理/处理记录时
export function industryList(query){
    return request({
        url:'/unit/devicealertdeal/page',
        method:'get',
        params:query
    })
}

//弹窗里的信息保存更新
export function btnseven(datas) {
    return request({
        url: '/unit/devicealertdeal',
        method: 'post',
        data: datas
    })
}
// 弹窗里的相关图片和关联视频
export function showimgviode(datas) {
    return request({
        url: '/unit/unitdevice/deviceId/'+datas,
        method: 'get',
        // params: datas
    })
}
// 状态跟踪
export function getInfoTracking(id) {
    return request({
        url: '/unit/devicealertdeal/deviceId/' + id,
        method: 'get',
    })
}
// 状态跟踪
export function stateTracking(datas) {
    return request({
        url: '/unit/devicealertdeal/' + datas,
        method: 'get',
        // params: datas
    })
}
// 系统数据分析展示
export function dataAnalysis(datas) {
    return request({
        url: '/unit/analysisdeviceorgday/statisticAnalysis/?systemId=' + datas,
        method: 'get',
        // params: datas
    })
}
// 设备数据分析单个展示(最近七天)
export function analysisList(query){
    return request({
        url:'/unit/analysisdeviceorgday/statisticAnalysis/selectWeek',
        method:'get',
        params:query
    })
}

// 设备数据分析单个展示(最近七天)
export function selctAlertStateAnalyze(query){
    return request({
        url:'/unit/analysisdeviceorgday/selctAlertStateAnalyze',
        method:'get',
        params:query
    })
}

// 设备数据分析单个展示(最近七天)
export function selctAlertState(query){
    return request({
        url:'/unit/analysisdeviceorgday/selctAlertState',
        method:'get',
        params:query
    })
}

// 设备数据分析单个展示(最近七天)
export function selectMalfunctionAvg(query){
    return request({
        url:'/unit/analysisdeviceorgday/selectMalfunctionAvg',
        method:'get',
        params:query
    })
}

// 设备数据分析单个展示(最近1天)
export function analysisListone(query){
    return request({
        url:'/unit/analysisdeviceorgday/statisticAnalysis',
        method:'get',
        params:query
    })
}

//监控总览柱状图接口
export function analysisAllbar(){
    return request({
        url:'/unit/analysisdeviceorgday/systemEquipmentOverview',
        method:'get',
        // params:query
    })
}

//监控总览柱状图接口修改
export function analysisAllbar2(){
    return request({
        url:'/unit/analysisdeviceorgday/selctAllSystem',
        method:'get',
        // params:query
    })
}

// 报警处理完成/结果分析
export function analysisResult(){
    return request({
        url:'/unit/monitorremotesystem/selectDeviceAlertDealResult',
        method:'get',
        // params:query
    })
}
// 提交更新
export function updatedeal(data){
    return request({
        url:'/unit/devicealertdeal',
        method:'post',
       data:data
    })
}
