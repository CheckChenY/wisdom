import request from '@/router/axios'

export function findPageList (obj) {
    return request({
        url: '/company/inner/jtlCompanyRelation/findPageList',
        method: 'post',
        data: obj
    })
}

//单位关联
// export function findPageList (obj) {
//     return request({
//         url: '/company/inner/jtlCompanyRelation/findPageList',
//         method: 'get',
//         params: obj
//     })
// }

export function findById (obj) {
    return request({
        url: '/company/inner/jtlCompany/findById',
        method: 'get',
        params: obj
    })
}

//添加关联
export function insert (obj) {
    return request({
        url: '/company/inner/jtlCompanyRelation/insert',
        method: 'post',
        data: obj
    })
}

//修改关联
export function update (obj) {
    return request({
        url: '/company/inner/jtlCompanyRelation/update',
        method: 'post',
        data: obj
    })
}

//删除关联
export function deleteRelation (obj) {
    return request({
        url: '/company/inner/jtlCompanyRelation/delete',
        method: 'get',
        params: obj
    })
}

//根据关联关系查询父子单位
export function findOrgByType (obj) {
    return request({
        url: '/company/inner/jtlCompanyRelation/findOrgByType',
        method: 'get',
        params: obj
    })
}
