import { tableData } from '@/mock/user'  // userInfo, 
import { menu } from '@/mock/menu'
import request from '../router/axios'
export const loginByUsername = (username, password, code, randomStr) => {
    var grant_type = 'password'
    var scope = 'read write'
    var loginType = 1
    return request({
        url: '/auth/oauth/token',
        headers: {
            'Authorization': 'Basic anRsOmp0bA=='  
        },
        method: 'post',
        params: { username, password, randomStr, code, grant_type, scope, loginType }
    })
}

export const getUserInfo = () => {
    return request({
        url: '/unit/user/info',
        method: 'get'
    })
}
export const RefeshToken = (refresh_token) => {
    var grant_type = 'refresh_token'
    var scope = 'read write'
    var loginType = 1
    return request({
        url: '/auth/oauth/token',
        headers: {
            'Authorization': 'Basic anRsOmp0bA=='  
        },
        method: 'post',
        data: { isToken: false },
        params: { refresh_token, grant_type, scope, loginType }
    })
}

export const getMenu = (parentId) => {
    return request({
        url: '/unit/menu/userMenu',
        method: 'get'
    })
}
export const getMenuAll = () => {
    return new Promise((resolve) => {
        resolve({ data: menu[0] });
    })
}

export const getTableData = (page) => {
    console.log(page);
    return new Promise((resolve) => {
        resolve({ data: tableData });
    })
}

export const logout = () => {
    return request({
        url: '/auth/sysLogout',
        method: 'post'
    })
}

export const getVerifyImage = () => {
    return request({
        url: '/auth/getVerifyImage',
        method: 'get'
    })
}

export const verifyPoint = (obj) => {
    return request({
        url: '/auth/verifyPoint',
        method: 'post',
        params: obj
    })
}

