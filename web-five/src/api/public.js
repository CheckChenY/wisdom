import request from '@/router/axios'

export function fetchTree () {
  return request({
    url: '/unit/dept/tree',
    method: 'get'
  })
}

export function addObj (obj) {
  return request({
    url: '/unit/dept/',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/unit/dept/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/unit/dept/' + id,
    method: 'delete'
  })
}

export function putObj (obj) {
  return request({
    url: '/unit/dept/',
    method: 'put',
    data: obj
  })
}

export function checkPhone (query) {
  return request({
    url: '/auth/check-phone',
    method: 'get',
    params: query
  })
}

//消声
export function mute(query){
  return request({
      url:'/unit/remoteoperation/remoteOperationCmd',
      method:'get',
      params:query
  })
}

// 查看是否有密码
export function getPass (id) {
  return request({
    url: '/unit/remotemanipulationparameter/selectBySystemId/' + id,
    method: 'get'
  })
}

// 校验密码
export function operationPass(query){
  return request({
      url:'/unit/remotemanipulationparameter/select',
      method:'post',
      data:query
  })
}

//更新操作
export function update(query){
  return request({
      url:'/unit/deviceoperationrecord',
      method:'post',
      data:query
  })
}

//获取操作记录
export function getOperatRecord(query){
  return request({
      url:'/unit/deviceoperationrecord/page',
      method:'get',
      params:query
  })
}

//全部用户
export function findAllUser(query){
  return request({
    url: '/unit/user/getAllUserByOrgId',
    method: 'get',
    params: query
  })
}