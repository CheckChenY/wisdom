import request from '@/router/axios'
//警情处理/处理记录时
export function getTableList(query) {
    return request({
        url: '/unit/safetaskrecord/recordPage',
        method: 'get',
        params: query
    })
}

export function getRecordDetail(query) {
    return request({
        url: '/unit/safepointrecord/page',
        method: 'get',
        params: query
    })
}

//单个巡查点记录




// export function getName() {
//     return request({
//         url: '/unit/safeattendancerecord/getName',
//         method: 'get',
//         // params: query
//     })
// }

// export function fetchTree () {
//     return request({
//       url: '/unit/dept/tree',
//       method: 'get'
//     })
// }