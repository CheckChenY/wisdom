import request from '@/router/axios'
//单位管理
export function findPageList (obj) {
    return request({
        url: '/company/inner/jtlCompany/findPageList',
        method: 'get',
        params: obj
    })
}

export function findOrgPageList (obj) {
    return request({
        url: '/company/inner/jtlCompanyReview/findOrgPageList',
        method: 'get',
        params: obj
    })
}

//付费功能包
export function tableList (obj) {
    return request({
        url: '/pack/inner/jtlFunctionPackage/findPackageOrg',
        method: 'get',
        params: obj
    })
}

//付费功能包
export function findAllPackage (obj) {
    return request({
        url: '/pack/inner/jtlPackageUserRelation/findAllPackage',
        method: 'get',
        params: obj
    })
}

//单位关联付费功能包
export function insert (obj) {
    return request({
        url: '/pack/inner/jtlPackageUserRelation/insert',
        method: 'post',
        data: obj
    })
}

//单位关闭关联付费功能包
export function callOff (obj) {
    return request({
        url: '/pack/inner/jtlPackageUserRelation/callOff',
        method: 'get',
        params: obj
    })
}
//单位关闭关联付费功能包
// export function callOff (obj) {
//     return request({
//         url: '/pack/inner/jtlPackageUserRelation/callOff',
//         method: 'post',
//         data: obj
//     })
// }


