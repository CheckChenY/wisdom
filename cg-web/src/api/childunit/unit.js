import request from '@/router/axios'

export function tableList (obj) {
    return request({
        url: '/auth/jtluser/page',
        method: 'get',
        params: obj
    })
}

//添加子账户
export function addUser (obj) {
    return request({
        url: '/auth/user/save',
        method: 'post',
        data: obj
    })
}

//修改子账户
export function editUser (obj) {
    return request({
        url: '/auth/jtluser',
        method: 'post',
        data: obj
    })
}

//删除子账户
export function deletUser (obj) {
    return request({
        url: '/auth/jtluser/' + obj,
        method: 'delete',
    })
}

//获取所有角色
export function fandRole () {
    return request({
        url: '/menu/inner/jtlRole/findPageList',
        method: 'get',
        // params: obj
    })
}


//添加角色
export function insert(obj) {
    return request({
        url: '/menu/inner/jtlRole/insert',
        method: 'post',
        data: obj
    })
}
