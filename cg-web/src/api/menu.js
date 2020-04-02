import request from '@/router/axios'
export function findList (obj) {
    return request({
        url: '/menu/inner/jtlMenu/findList',
        method: 'get',
        params: obj
    })
}

export function findById (obj) {
    return request({
        url: '/menu/inner/jtlMenu/findById',
        method: 'get',
        params: obj
    })
}

export function insert (obj) {
    return request({
        url: '/menu/inner/jtlMenu/insert',
        method: 'post',
        data: obj
    })
}

export function update (obj) {
    return request({
        url: '/menu/inner/jtlMenu/update',
        method: 'post',
        data: obj
    })
}

export function deleteMenu (id) {
    return request({
        url: '/menu/inner/jtlMenu/delete/' + id,
        method: 'delete',
    })
}
//删除系统菜单
export function deleteSysMenu (id) {
    return request({
        url: '/menu/inner/jtlSystem/delete/' + id,
        method: 'delete',
    })
}

export function sysUpdate (obj) {
    return request({
        url: '/menu/inner/jtlSystem/update',
        method: 'post',
        data: obj
    })
}


export function permissionValidation (obj) {
    return request({
        url: '/menu/inner/jtlMenu/permissionValidation',
        method: 'get',
        params: obj
    })
}

//添加系统
export function savesystemmenu (obj) {
    return request({
        url: '/menu/inner/jtlSystem/save',
        method: 'post',
        data: obj
    })
}
