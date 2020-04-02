import request from '@/router/axios'
//警情处理/处理记录时
export function getTableList(query) {
    return request({
        url: '/unit/safeattendancerecord/page',
        method: 'get',
        params: query
    })
}



export function getName() {
    return request({
        url: '/unit/safeattendancerecord/getName',
        method: 'get',
        // params: query
    })
}

export function fetchTree () {
    return request({
      url: '/unit/dept/tree',
      method: 'get'
    })
  }

//处理隐患
export function safeattendanceset(obj) {
    return request({
        url: '/unit/safeattendanceset',
        method: 'post',
        data: obj
    })
}
