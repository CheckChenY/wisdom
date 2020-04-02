import request from '@/router/axios'

// 巡查任务管理列表
export function safetaskrecordPage(query){
    return request({
      url: '/unit/safetaskrecord/webPage',
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

//下发任务 和编辑
export function safetaskrecord(query){
  return request({
    url: '/unit/safetaskrecord',
    method: 'post',
    data: query
  })
}


// 删除任务
export function delSafetaskrecord(id){
  return request({
    url: '/unit/safetaskrecord/' + id,
    method: 'delete',
  })
}

//巡查任务列表
export function safepatroltaskPage(query){
  return request({
    url: '/unit/safepatroltask/page',
    method: 'get',
    params: query
  })
}
