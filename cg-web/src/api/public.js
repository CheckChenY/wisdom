
import request from '@/router/axios'
//注册提交
export function registerSubmit (obj) {
    return request({
        url: '/company/inner/jtlCompany/insert',
        method: 'post',
        data: obj
    })
}
//注册上传营业执照
export function addFile (obj) {
    return request({
        url: '/upload/open/file/addFile',
        method: 'post',
        headers: {'Content-Type':'multipart/form-data'},
        data: obj,
    })
}
// 获取字典数据
export function findDictList (obj) {
    return request({
        url: '/pub/inner/jtlSysDict/findList',
        method: 'post',
        data: obj,
    })
}

export function findById (obj) {
    return request({
        url: '/company/inner/jtlCompany/findById',
        method: 'get',
        params: obj
    })
}

//注册获取验证码
export function checkPhone (val) {
    return request({
        url: '/auth/getPhoneCode',
        method: 'get',
        params: val,
        headers: {
            'Authorization': 'Basic anRsOmp0bA=='  
        },
    })
}

//审核状态
export function findOrgByUserId () {
    return request({
        url: '/company/inner/jtlCompany/findOrgByUserId',
        method: 'get',
    })
}

//查询省市县
 
export function findProvince (obj) {
    return request({
        url: '/pub/inner/jtlSysDict/findProvince',
        method: 'get',
        params:obj
    })
}

//当前用户信息
export function myUser () {
    return request({
        url: '/auth/jtluser/myUser',
        method: 'get',
    })
}

//查询所有的系统类型、设备类型
export function findDeviceDict (obj) {
    return request({
        url: '/pub/inner/jtlDeviceDict/findAll',
        method: 'post',
        params: obj
    })
}

//获取全部设备型号
export function getDeviceFindList (obj) {
    return request({
        url: '/device/inner/jtlDeviceSystemDic/findList',
        method: 'post',
        params: obj
    })
}

export function findLicense () {
    return request({
        url: '/device/inner/jtlDeviceSystemDic/findLicense',
        method: 'get',
    })
}

export function getOrgDetail (obj) {
    return request({
        url: '/device/inner/jtlDevice/getOrgDetail',
        method: 'get',
        params: obj
    })
}

export function voice(obj) {
    return request({
        url: '/voice/token',
        method: 'post',
        params: obj
    })
}

export function getUsers (obj) {
    return request({
        url: '/auth/user/org-users',
        method: 'get',
        params: obj
    })
}

export function getMyChildCompanyList (obj) {
    return request({
        url: '/company/inner/jtlCompanyRelation/getMyChildCompanyList',
        method: 'get',
        params: obj
    })
}

export function moreAddObj (obj) {
    return request({
      url: '/device/inner/jtlDeviceExcel/upload',
      method: 'post',
      headers: {'Content-Type':'multipart/form-data'},
      data: obj
    })
}

export function getUploadData () {
    return request({
      url: '/device/inner/jtlDeviceExcel/getData',
      method: 'get',
    })
}

// 获取网关列表
export function findAllNet () {
    return request({
      url: '/elect/web/acbdevice/findAllNet',
      method: 'get'
    })
}