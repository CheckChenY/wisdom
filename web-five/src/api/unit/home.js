import request from '@/router/axios'

export function AllUnitCount(query) {
  return request({
    url: '/unit/unitdevice/AllUnitCount',
    method: 'get',
    params: query
  })
}

export function noticemessage(query) {
    return request({
        url: '/unit/noticemessage/selcetPage',
        method: 'get',
        params: query
    })
}

export function analysisdeviceorgday(query) {
    return request({
        url: '/unit/analysisdeviceorgday/selctMonthGroupBySystem',
        method: 'get',
        params: query
    })
}
// ?deal_state=0
export function devicealertdeal(query) {
    return request({
        url: '/unit/devicealertdeal/page',
        method: 'get',
        params: query
    })
}

export function selectMonthAlertStatistics(query) {
  return request({
      url: '/unit/analysisdeviceorgday/selectMonthAlertStatistics',
      method: 'get',
      params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/unit/unitkeyfacility/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/unit/unitkeyfacility/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/unit/unitkeyfacility/' + id,
    method: 'delete'
  })
}
