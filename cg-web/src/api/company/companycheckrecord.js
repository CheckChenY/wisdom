import request from '@/router/axios'
// export function findPageList (obj) {
//     return request({
//         url: '/company/inner/jtlCompanyReview/findPageList',
//         method: 'get',
//         data: obj
//     })
// }
//单位审核
export function findPageList (obj) {
    return request({
        url: '/company/inner/jtlCompanyReview/findPageList',
        method: 'get',
        params: obj
    })
}

//所有的审核人
export function findRoleList (obj) {
    return request({
        url: '/menu/inner/jtlRole/findPageList',
        method: 'get',
        params: obj
    })
}