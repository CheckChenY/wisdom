import request from '@/router/axios'

//全部
export function safetaskrecordPage(query){
    return request({
      url: '/unit/safetaskrecord/page',
      method: 'get',
      params: query
    })
}

//巡查点巡查列表
export function safepatrolpointPage(query){
    return request({
      url: '/unit/safepatrolpoint/page',
      method: 'get',
      params: query
    })
}

//巡查点巡查列表
export function safepointrecordPage(query){
  return request({
    url: '/unit/safepointrecord/page',
    method: 'get',
    params: query
  })
}

// 获取巡查卡信息
export function info(cardCode){
  return request({
    url: '/unit/safepatrolpoint/info/' + cardCode,
    method: 'get',
  })
}

//手动添加巡查点
export function safepatrolpoint(query){
  return request({
    url: '/unit/safepatrolpoint',
    method: 'post',
    data: query
  })
}

// 单个删除巡查点
export function delSafepatrolpoint(id){
  return request({
    url: '/unit/safepatrolpoint/' + id,
    method: 'delete',
  })
}

// 批量删除巡查点
export function delBatchSafePatrolPoint(query){
  return request({
    url: '/unit/safepatrolpoint/delBatchSafePatrolPoint',
    method: 'post',
    data: query
  })
}