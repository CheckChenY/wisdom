import request from '@/router/axios'

export const getAdminInfo = () => {
    return request({
        url: '/unit/user/getLoginUser',
        method: 'get',
    })
}

export const editAdminInfo = (data) => {
    return request({
        url: '/unit/user/editInfo',
        method: 'put',
        data: data,
    })
}

export const updatePassword = (data) => {
    return request({
        url: '/unit/user/updatePassword',
        method: 'post',
        data: data,
    })
}