import request from '@/router/axios'

export function fetchTree (query) {
  return request({
    url: '/unit/remotemanipulationparameter/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/unit/remotemanipulationparameter',
    method: 'post',
    data: obj
  })
}

export function putObj (obj) {
  return request({
    url: '/unit/remotemanipulationparameter',
    method: 'put',
    data: obj
  })
}

export function delObj (id) {
  return request({
    url: '/unit/remotemanipulationparameter/' + id,
    method: 'delete'
  })
}

export function moreAddObj (obj) {
  return request({
    url: '/unit/remotemanipulationparameter/saveBatch',
    method: 'post',
    headers: {'Content-Type':'multipart/form-data'},
    data: obj
  })
}