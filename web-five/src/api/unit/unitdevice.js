import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/unit/unitdevice/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/unit/unitdevice/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/unit/unitdevice/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/unit/unitdevice/' + id,
    method: 'delete'
  })
}

export function buildTree () {
  return request({
    url: '/unit/unitfloor/tree',
    method: 'get'
  })
}

export function cameraTree (deviceType) {
  return request({
    url: '/unit/unitdevice/tree/' + deviceType,
    method: 'get'
  })
}

export function setStatusObj(obj) {
  return request({
    url: '/unit/unitdevice/batchEnable',
    method: 'post',
    params: obj
  })
}

export function editparams(obj) {
  return request({
    url: '/unit/remoteoperation/changeParameter',
    method: 'get',
    params: obj
  })
}

export function getObjBySN(SN) {
  return request({
    url: '/unit/unitdevice/deviceId/' + SN,
    method: 'get'
  })
}

