import request from '@/router/axios'

// //关联列表
// export function findGroupPage (obj) {
//     return request({
//         url: '/device/inner/jtlDeviceRelation/findGroupPage',
//         method: 'get',
//         params: obj
//     })
// }

export function findDeviceTypeDict (obj) {
    return request({
        url: '/pub/inner/jtlDeviceDict/findPageList',
        method: 'post',
        data: obj
    })
}

//非视频列表
export function findNoCameraPage (obj) {
    return request({
        url: '/device/inner/jtlDeviceRelation/findNoCameraPage',
        method: 'get',
        params: obj
    })
}


//未关联的视频设备
export function findNotLinkCamera (obj) {
    return request({
        url: '/device/inner/jtlDeviceRelation/findNotLinkCamera',
        method: 'get',
        params: obj
    })
}

//已关联的视频设备
export function findLinkCamera (obj) {
    return request({
        url: '/device/inner/jtlDeviceRelation/findLinkCamera',
        method: 'get',
        params: obj
    })
}

//关联摄像头操作
export function insertCamera (obj) {
    return request({
        url: '/device/inner/jtlDeviceRelation/insertCamera',
        method: 'post',
        data: obj
    })
}

//解绑
export function deleteGroup (obj) {
    return request({
        url: '/device/inner/jtlDeviceRelation/deleteGroup',
        method: 'get',
        params: obj
    })
}

//关联摄像头操作
export function insertMainCamera (obj) {
    return request({
        url: '/device/inner/jtlDeviceRelation/insertMainCamera',
        method: 'post',
        data: obj
    })
}

//组合关联列表
export function findGroupPage (obj) {
    return request({
        url: '/device/inner/jtlDeviceRelation/findGroupPage',
        method: 'get',
        params: obj
    })
}

//组合未关联列表
export function findNoLinkGroupPage (obj) {
    return request({
        url: '/device/inner/jtlDeviceRelation/findNoLinkGroupPage',
        method: 'get',
        params: obj
    })
}

//组合已关联列表
export function findLinkGroupPage (obj) {
    return request({
        url: '/device/inner/jtlDeviceRelation/findLinkGroupPage',
        method: 'get',
        params: obj
    })
}

//关联子设备
export function insertGroup (obj) {
    return request({
        url: '/device/inner/jtlDeviceRelation/insertGroup',
        method: 'post',
        data: obj
    })
}

//联动管理设备
export function findLinkPage (obj) {
    return request({
        url: '/device/inner/jtlLinkLogicGroup/findLinkPage',
        method: 'get',
        params: obj
    })
}

//获取该设备下所有的逻辑组
export function logicGroupList (obj) {
    return request({
        url: '/device/inner/jtlLinkLogicGroup/findPageList',
        method: 'post',
        data: obj
    })
}

//添加逻辑组
export function insertLogicGroup (obj) {
    return request({
        url: '/device/inner/jtlLinkLogicGroup/insert',
        method: 'post',
        data: obj
    })
}

//逻辑组信息
export function findById (obj) {
    return request({
        url: '/device/inner/jtlLinkLogicGroup/findById',
        method: 'get',
        params: obj
    })
}

//新增更改逻辑
export function saveOrUpdateLogicDetail (obj) {
    return request({
        url: '/device/inner/jtlLinkLogicDetail/saveOrUpdateLogicDetail',
        method: 'post',
        data: obj
    })
}

//联动管理 非联动设备
export function findNotLinkPage (obj) {
    return request({
        url: '/device/inner/jtlLinkLogicGroup/findNotLinkPage',
        method: 'get',
        params: obj
    })
}

//删除逻辑
export function deleteLogic (obj) {
    return request({
        url: '/device/inner/jtlLinkLogic/delete',
        method: 'get',
        params: obj
    })
}

//删除逻辑
export function deleteLogicGroup (obj) {
    return request({
        url: '/device/inner/jtlLinkLogicGroup/delete',
        method: 'get',
        params: obj
    })
}

//获取联动动作模式
export function getCompany (obj) {
    return request({
        url: '/company/inner/jtlCompany/getCompany',
        method: 'get',
        params: obj
    })
}

//模式更改
export function updateLinkage (obj) {
    return request({
        url: '/company/inner/jtlCompany/updateLinkage',
        method: 'get',
        params: obj
    })
}

//主摄像头查询
export function mainCamera (obj) {
    return request({
        url: '/camera/inner/jtlDeviceCamera/main',
        method: 'get',
        params: obj
    })
}
