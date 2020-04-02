import request from '@/router/axios'
export function findPageList (obj) {
    return request({
        url: '/company/inner/jtlCompanyBuilding/findPageList',
        method: 'post',
        data: obj
    })
}

export function getAlarmByOrg (obj) {
    return request({
        url: '/warn/inner/jtlAlarmRecord/getAlarmByOrg',
        method: 'get',
        params: obj
    })
}

export function findCountByOrgSystem (obj) {
    return request({
        url: '/warn/inner/jtlAlarmRecord/findCountByOrgSystem',
        method: 'get',
        params: obj
    })
}

export function weekAlarmCountBySupervise (obj) {
    return request({
        url: '/warn/inner/jtlAlarmRecord/weekAlarmCountBySupervise',
        method: 'get',
        params: obj
    })
}

export function startLinkDeviceByHand (obj) {
    return request({
        url: '/device/inner/jtlLinkLogicGroup/startLinkDeviceByHand',
        method: 'get',
        params: obj
    })
}

export function getLinkLogByAlarmId (obj) {
    return request({
        url: '/warn/inner/jtlAlarmLinkLog/getLinkLogByAlarmId',
        method: 'get',
        params: obj
    })
}

export function scheduleTask (obj) {
    return request({
        url: '/warn/inner/jtlAlarmRecord/scheduleTask',
        method: 'get',
        params: obj
    })
}

//快捷操作  个人菜单
export function shortcutsMenu () {
    return request({
        url: '/set/inner/shortcutsMenu/findMenusByUserId',
        method: 'get',
        // params: obj
    })
}
//获取所有的二级菜单
export function jtlRoleUserRelation () {
    return request({
        url: '/menu/inner/jtlRoleUserRelation/findMySecondMenu',
        method: 'get',
        // params: obj
    })
}

//提交选择二级菜单
export function shortcutsInsert (obj) {
    return request({
        url: '/set/inner/shortcutsMenu/insert',
        method: 'post',
        data: obj
    })
}