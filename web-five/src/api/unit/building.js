import request from '@/router/axios'

export function fetchList (query) {
  return request({
    url: '/unit/unitbuilding/page',
    method: 'get',
    params: query
  })
}

export function fetchBuildingList (query) {
  return request({
    url: '/unit/unitbuilding/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/unit/unitbuilding',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/unit/unitbuilding/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/unit/unitbuilding/' + id,
    method: 'delete'
  })
}