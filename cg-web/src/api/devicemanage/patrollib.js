import request from '@/router/axios'

export function findCardLibrary (obj) {
    return request({
        url: '/inspect/inner/safePoint/findCardLibrary',
        method: 'post',
        data: obj
    })
}

export function findById (obj) {
    return request({
        url: '/company/inner/jtlCompany/findById',
        method: 'get',
        params: obj
    })
}

//添加关联
export function saveCardLibrary (obj) {
    return request({
        url: '/inspect/inner/safePoint/saveCardLibrary',
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

//删除
export function delCardLibrary (obj) {
    return request({
        url: '/inspect/inner/safePoint/delCardLibrary',
        method: 'post',
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
