import request from '@/router/axios'

export function update (obj) {
    return request({
        url: '/inspect/inner/safeHiddenTrouble/update',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/inspect/inner/safeHiddenTrouble/findById',
        method: 'get',
        params: obj
    })
}

export function findPageList (obj) {
    return request({
        url: '/inspect/inner/safeHiddenTrouble/findPageList',
        method: 'post',
        data: obj
    })
}
