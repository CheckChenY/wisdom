import request from '@/router/axios'

export function findPageList (obj) {
    return request({
        url: '/device/inner/jtlDefaultThreshold/findPageList',
        method: 'post',
        data: obj
    })
}
