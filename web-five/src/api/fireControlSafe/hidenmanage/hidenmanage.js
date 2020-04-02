import request from '@/router/axios'

//全部
export function safehiddentrouble(query){
    return request({
      url: '/unit/safehiddentrouble/page',
      method: 'get',
      params: query
    })
}

//处理隐患
export function safehiddentroubleDeal(obj) {
    return request({
      url: '/unit/safehiddentrouble',
      method: 'post',
      data: obj
    })
  }
  