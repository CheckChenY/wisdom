import request from '@/router/axios'

export function fetchTree (query) {
  return request({
    url: '/unit/unitbuilding/tree',
    method: 'get',
    params: query
  })
}

export function fetchFloorList (query) {
  return request({
    url: '/unit/unitfloor/page',
    method: 'get',
    params: query
  })
}

export function fetchList (query) {
  return request({
    url: '/unit/unitfloor/page',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return request({
    url: '/unit/unitfloor',
    method: 'post',
    data: obj
  })
}

export function getObj (id) {
  return request({
    url: '/unit/unitfloor/' + id,
    method: 'get'
  })
}

export function delObj (id) {
  return request({
    url: '/unit/unitfloor/' + id,
    method: 'delete'
  })
}

export function getInfoById (id) {
  return request({
    url: '/unit/unitdevice/deviceId/' + id,
    method: 'get'
  })
}
