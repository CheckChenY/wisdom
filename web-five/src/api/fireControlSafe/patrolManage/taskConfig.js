import request from '@/router/axios'

// 巡查任务列表
export function safepatroltaskPage(query){
    return request({
      url: '/unit/safepatroltask/page',
      method: 'get',
      params: query
    })
}

// 巡查任务列表
export function safetaskrecordPageNew(query){
  return request({
    url: '/unit/safetaskrecord/page',
    method: 'get',
    params: query
  })
}

//手动添加巡查点
export function safepatroltask(query){
    return request({
      url: '/unit/safepatroltask',
      method: 'post',
      data: query
    })
}

// 单个删除巡查任务
export function delSafepatroltask(id){
  return request({
    url: '/unit/safepatroltask/' + id,
    method: 'delete',
  })
}

// 任务绑定巡查点
export function batchConfigPoint(query){
  return request({
    url: '/unit/safepatrolpoint/batchConfigPoint',
    method: 'post',
    data: query
  })
}