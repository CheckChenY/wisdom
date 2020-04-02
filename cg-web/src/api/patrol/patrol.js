import request from '@/router/axios'
export function savePoint (obj) {
    return request({
        url: '/inspect/inner/safePoint/save',
        method: 'post',
        data: obj
    })
}

export function updatePoint (obj) {
    return request({
        url: '/inspect/inner/safePoint/update',
        method: 'post',
        data: obj
    })
}

export function findPatrolCard (obj) {
    return request({
        url: '/inspect/inner/safePoint/findPatrolCard',
        method: 'post',
        data: obj
    })
}

export function findPatrolPointPageList (obj) {
    return request({
        url: '/inspect/inner/safePoint/findPageList',
        method: 'post',
        data: obj
    })
}

export function safePatrolPointDelete (obj) {
    return request({
        url: '/inspect/inner/safePoint/delete',
        method: 'get',
        params: obj
    })
}

export function safeTaskSave (obj) {
    return request({
        url: '/inspect/inner/safeTask/save',
        method: 'post',
        data: obj
    })
}

// 分页查巡查任务
export function findTaskPageList (obj) {
    return request({
        url: '/inspect/inner/safeTask/findPageList',
        method: 'post',
        data: obj
    })
}

export function getAllUserByOrgId (obj) {
    return request({
        url: '/inspect/inner/safeTask/getAllUserByOrgId',
        method: 'get',
        params: obj
    })
}

export function taskPointInfos (obj) {
    return request({
        url: '/inspect/inner/safeTask/taskPointInfos',
        method: 'post',
        data: obj
    })
}

export function batchConfigPoint (obj) {
    return request({
        url: '/inspect/inner/safeTask/batchConfigPoint',
        method: 'post',
        data: obj
    })
}

export function patrolTaskDelete (obj) {
    return request({
        url: '/inspect/inner/safeTask/delete',
        method: 'get',
        params: obj
    })
}

export function safeTaskLoopSave (obj) {
    return request({
        url: '/inspect/inner/safeTaskLoop/save',
        method: 'post',
        data: obj
    })
}

export function findPatrolCycle (obj) {
    return request({
        url: '/inspect/inner/safeTaskLoop/findPatrolCycle',
        method: 'post',
        data: obj
    })
}

export function safeTaskLoopDelete (obj) {
    return request({
        url: '/inspect/inner/safeTaskLoop/delete',
        method: 'post',
        data: obj
    })
}

export function notConfiguredTaskPoints (obj) {
    return request({
        url: '/inspect/inner/safeTask/notConfiguredTaskPoints',
        method: 'post',
        data: obj
    })
}

export function safePatrolRecordFindPageList (obj) {
    return request({
        url: '/inspect/inner/safePatrolRecord/findPatrolRecord',
        method: 'post',
        data: obj
    })
}

export function safeTaskPointRelationDelete (obj) {
    return request({
        url: '/inspect/inner/safeTaskPointRelation/delete',
        method: 'get',
        params: obj
    })
}

export function safePatrolRecordFindById (obj) {
    return request({
        url: '/inspect/inner/safePatrolRecord/findById',
        method: 'get',
        params: obj
    })
}

export function taskInfoList (obj) {
    return request({
        url: '/inspect/inner/safePatrolRecord/taskInfoList',
        method: 'post',
        data: obj
    })
}
