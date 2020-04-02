import request from '@/router/axios'
// export function findPageList (obj) {
//     return request({
//         url: '/company/inner/jtlCompanyReview/findPageList',
//         method: 'get',
//         data: obj
//     })
// }
//单位审核
export function findPageList (query) {
    return request({
        url: '/company/inner/jtlCompanyReview/findPageList',
        method: 'get',
        params: query
    })
}

export function findOrgPageList (obj) {
    return request({
        url: '/company/inner/jtlCompanyReview/findOrgPageList',
        method: 'get',
        params: obj
    })
}

//单位审核
export function insert (obj) {
    return request({
        url: '/company/inner/jtlCompanyReview/insert',
        method: 'post',
        data: obj
    })
}
