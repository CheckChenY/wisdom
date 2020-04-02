
import request from '@/router/axios'
// export function findPageList (obj) {
//     return request({
//         url: '/dict/inner/jtlRole/findPageList',
//         method: 'get',
//         params: obj
//     })
// }

export function getAcbAlertInfo (obj) {
    return request({
        url: '/dict/web/acbAlertInfo/getAcbAlertInfo',
        method: 'get',
        params: obj
    })
}

export function save (obj) {
    return request({
        url: '/dict/web/acbAlertInfo/save',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/dict/web/acbAlertInfo/update',
        method: 'post',
        data: obj
    })
}

export function del (obj) {
    return request({
        url: '/dict/web/acbAlertInfo/del',
        method: 'delete',
        params: obj
    })
}

export function findPageList (obj) {
    return request({
        url: '/pub/inner/jtlSysDict/findPageList',
        method: 'post',
        data: obj
    })
}

export function dictUpdate (obj) {
    return request({
        url: '/pub/inner/jtlSysDict/update',
        method: 'post',
        data: obj
    })
}

export function dictInsert (obj) {
    return request({
        url: '/pub/inner/jtlSysDict/insert',
        method: 'post',
        data: obj
    })
}

export function dictDelete (obj) {
    return request({
        url: '/pub/inner/jtlSysDict/delete',
        method: 'get',
        params: obj
    })
}
