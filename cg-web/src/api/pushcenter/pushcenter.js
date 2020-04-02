import request from '@/router/axios'

export function findSendMessageList (obj) {
    return request({
        url: '/notice/inner/jtlNoticeMessage/findSendMessageList',
        method: 'post',
        data: obj
    })
}

// 推送通知(人员)
export function updatePush (obj) {
    return request({
        url: '/notice/inner/jtlNoticeMessage/updatePush',
        method: 'post',
        data: obj
    })
}

// 推送通知（组织）
export function updatePushOrg (obj) {
    return request({
        url: '/notice/inner/jtlNoticeMessage/updatePushOrg',
        method: 'post',
        data: obj
    })
}

// 推送通知
export function pushNotice (obj) {
    return request({
        url: '/notice/inner/jtlNoticeMessage/pushNotice',
        method: 'post',
        data: obj
    })
}

// 添加修改推送消息
export function save (obj) {
    return request({
        url: '/notice/inner/jtlNoticeMessage/save',
        method: 'post',
        data: obj
    })
}

export function getAllCompanyByOrgId () {
    return request({
        url: '/notice/inner/jtlNoticeMessage/getAllCompanyByOrgId',
        method: 'get',
    })
}

export function getAllUserByOrgId () {
    return request({
        url: '/notice/inner/jtlNoticeMessage/getAllUserByOrgId',
        method: 'get',
    })
}


export function deleteNotice (obj) {
    return request({
        url: '/notice/inner/jtlNoticeMessage/delete',
        method: 'get',
        params: obj
    })
}

export function findViewMessageList (obj) {
    return request({
        url: '/notice/inner/jtlNoticeAcceptMessage/findAllAlarmAndAllMessage',
        method: 'get',
        params: obj
    })
}

export function findPageList (obj) {
    return request({
        url: '/notice/inner/jtlNoticeAcceptMessage/findViewMessageList',
        method: 'post',
        data: obj
    })
}

export function findAlarmSituationList (obj) {
    return request({
        url: '/notice/inner/jtlNoticeAcceptMessage/findAlarmSituationList',
        method: 'post',
        data: obj
    })
}

export function updateAlreadyread (obj) {
    return request({
        url: '/notice/inner/jtlNoticeAcceptMessage/updateAlreadyread',
        method: 'post',
        data: obj
    })
}

export function delMessage (obj) {
    return request({
        url: '/notice/inner/jtlNoticeAcceptMessage/delMessage',
        method: 'post',
        data: obj
    })
}

export function findCompanyCount () {
    return request({
        url: '/notice/inner/jtlNoticeAcceptMessage/findCompanyCount',
        method: 'get',
    })
}

export function findCount () {
    return request({
        url: '/notice/inner/jtlNoticeAcceptMessage/findCount',
        method: 'get',
    })
}

export function findDetailById (obj) {
    return request({
        url: '/warn/inner/jtlAlarmRecord/findDetailById',
        method: 'get',
        params: obj
    })
}