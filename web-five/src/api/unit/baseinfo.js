import request from '@/router/axios'

export function getObj () {
  return request({
    url: '/unit/org/getOrg',
    method: 'get'
  })
}

export function putObj (obj) {
  return request({
    url: '/unit/org/edit',
    method: 'put',
    data: obj
  })
}

export function getGeneralObj () {
  return request({
    url: '/unit/org/getGeneralInfo',
    method: 'get'
  })
}

export function putGeneralObj (obj) {
  return request({
    url: '/unit/org/saveGeneralInfo',
    method: 'post',
    data: obj
  })
}

export function getKeyPartObj (query) {
  return request({
    url: '/unit/org/keyPartsPage',
    method: 'get',
    params: query
  })
}

export function getOrgById (id) {
  return request({
    url: '/unit/org/getOrgById/' + id,
    method: 'get'
  })
}

export function putKeyPartObj (obj) {
  return request({
    url: '/unit/org/saveUnitKeyParts',
    method: 'post',
    data: obj
  })
}

export function delKeyPartObj (id) {
  return request({
    url: '/unit/org/delUnitKeyParts/' + id,
    method: 'get'
  })
}

export function delBatchUnitKeyPartObj (ids) {
  return request({
    url: '/unit/org/delBatchUnitKeyParts',
    method: 'post',
    params: ids
  })
}

export function getFireObj () {
  return request({
    url: '/unit/org/getFireResources',
    method: 'get'
  })
}

export function putFireObj (obj) {
  return request({
    url: '/unit/org/saveFireResources',
    method: 'post',
    data: obj
  })
}