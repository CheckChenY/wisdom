import { setToken, removeToken } from '../../util/auth'
import { setStore, getStore } from '../../util/store'
import { encryption } from '@/util/util'
import { calcDate } from '../../util/date.js';
import { validatenull } from '../../util/validate';
// import webiste from '@/const/website'
import { loginIn } from '@/api/loginregister'
// import router from "@/router/router"
import { findOrgByUserId } from "@/api/public"


function addPath(ele) {
    const propsConfig = {};
    const propsDefault = {
        label: propsConfig.label || 'label',
        path: propsConfig.path || 'path',
        icon: propsConfig.icon || 'icon',
        children: propsConfig.children || 'children'
    }
    const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
    if (!isChild) return
    ele[propsDefault.children].forEach(child => {
        if (!child[propsDefault.path].includes('http') && !child[propsDefault.path].includes('https')) {
            child[propsDefault.path] = `${ele[propsDefault.path]}/${child[propsDefault.path]?child[propsDefault.path]:'index'}`
        }
        addPath(child);
    })
}
const user = {
    state: {
        userInfo: getStore({ name: 'userInfo'}) || {},
        orgInfo: getStore({ name: 'orgInfo'}) || {},
        permission: [],
        roles: [],
        menu: getStore({ name: 'menu' }) || [],
        menuAll: [],
        access_token: getStore({
            name: 'access_token'
        }) || '',
        refresh_token: getStore({
            name: 'refresh_token'
        }) || ''
    },
    actions: {
        //根据用户名登录********************************************************************
        LoginByUsername({ dispatch, commit }, userInfo) {
            const user = encryption({
                data: userInfo,
                type: 'Aes',
                key: 'jintelai12345678',
                param: ['password']
            });
            return new Promise((resolve, reject) => {
                loginIn(user).then(res => {
                    if(res && res.response && !res.response.data.access_token){
                        reject(res);
                        return
                    }
                    // if (!res || !res.response) {
                    //     reject(res);
                    //     return
                    // }
                    const data = res.data;
                    commit('SET_ACCESS_TOKEN', data.access_token)
                    commit('SET_REFRESH_TOKEN', data.refresh_token)
                    setToken(data.access_token)
                    resolve('loginSuccess');
                    dispatch('GetOrgInfo')
                })
            })
        },
        //根据用户名登录********************************************************************
        
        //根据手机号登录
        LoginByPhone({ commit }, userInfo) {
            return new Promise((resolve) => {
                loginByUsername(userInfo.phone, userInfo.code).then(res => {
                    if (!res) {
                        resolve();
                        return
                    }
                    const data = res.data;
                    commit('SET_ACCESS_TOKEN', data.access_token)
                    commit('SET_REFRESH_TOKEN', data.refresh_token)
                    // commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    setToken(data.access_token)
                    resolve();
                })
            })
        },
        GetTableData(params, page) {
            return new Promise((resolve) => {
                // getTableData(page).then(res => {
                //     if (!res) {
                //         resolve();
                //         return
                //     }
                //     const data = res.data;
                //     resolve(data);
                // })
            })
        },
        GetUserInfo({ commit }, userInfo) {
            commit('SET_USERIFNO', userInfo);
        },
        GetOrgInfo({ commit }) {
            return new Promise((resolve, reject) => {
                findOrgByUserId().then((res) => {
                    commit('SET_ORGIFNO', res.data.value);
                    resolve(res.data);
                })
            })
        },
        //刷新token
        RefeshToken({ commit }) {
            return new Promise((resolve, reject) => {
                const access_token = getStore({
                    name: 'access_token',
                    debug: true,
                });
                const date = calcDate(access_token.datetime, new Date().getTime());
                if (validatenull(date)) return;
                // if (date.seconds >= webiste.tokenTime) {
                //     // Message({message: '刷新token: ' + date.seconds})
                //     // RefeshToken(getStore({ name: 'refresh_token' })).then((res) => {
                //     //     if (!res) {
                //     //         resolve();
                //     //         return
                //     //     }
                //     //     const data = res.data;
                //     //     commit('SET_ACCESS_TOKEN', data.access_token)
                //     //     commit('SET_REFRESH_TOKEN', data.refresh_token)
                //     //     setToken(data.access_token)
                //     //     resolve();
                //     // }).catch(error => {
                //     //     reject(error)
                //     // })
                // }
            })
        },
        // 登出
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                // logout().then(() => {
                //     commit('SET_MENU', [])
                //     commit('SET_ROLES', [])
                //     commit('DEL_ALL_TAG');
                //     commit('CLEAR_LOCK');
                //     commit('SET_ACCESS_TOKEN', '')
                //     commit('SET_REFRESH_TOKEN', '')
                //     removeToken()
                //     resolve()
                // }).catch(error => {
                //     reject(error)
                // })
            })
        },
        //注销session
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_MENU', [])
                commit('SET_ROLES', [])
                // commit('DEL_ALL_TAG');
                commit('CLEAR_LOCK');
                commit('SET_ACCESS_TOKEN', '')
                commit('SET_REFRESH_TOKEN', '')
                commit('CLEAR_PERMISSION');
                removeToken()
                resolve()
            })
        },
        //获取系统菜单
        GetMenu({ commit }, parentId) {
            return new Promise(resolve => {
                // getMenu(parentId).then((res) => {
                //     if (!(res && res.data)) {
                //         resolve();
                //         return
                //     }
                //     const data = res.data.data;
                //     data.forEach(ele => {
                //         addPath(ele);
                //     })
                //     commit('SET_MENU', data)
                //     resolve(data)
                // })
            })
        },
        //获取全部菜单
        GetMenuAll({ commit }) {
            return new Promise(resolve => {
                // getMenuAll().then((res) => {
                //     if (!res) {
                //         resolve();
                //         return
                //     }
                //     const data = res.data;
                //     commit('SET_MENU_ALL', data);
                //     resolve(data);
                // })
            })
        },
        //获取全部菜单
        SetPermission({ commit }, data) {
            commit('SET_PERMISSION', data);
        },
    },
    mutations: {
        SET_ACCESS_TOKEN: (state, access_token) => {
            state.access_token = access_token
            setStore({
                name: 'access_token',
                content: state.access_token,
                type: 'session'
            })
        },
        SET_REFRESH_TOKEN: (state, rfToken) => {
            state.refresh_token = rfToken
            setStore({
                name: 'refresh_token',
                content: state.refresh_token,
                type: 'session'
            })
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
            setStore({ name: 'token', content: state.token, type: 'session' })
        },
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo;
            setStore({ name: 'userInfo', content: userInfo})
        },
        SET_ORGIFNO: (state, orgInfo) => {
            state.orgInfo = orgInfo;
            setStore({ name: 'orgInfo', content: orgInfo})
        },
        SET_MENU: (state, menu) => {
            state.menu = menu
            setStore({
                name: 'menu',
                content: state.menu,
                type: 'session'
            })
        },
        SET_MENU_ALL: (state, menuAll) => {
            state.menuAll = menuAll;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_PERMISSION: (state, permission) => {
            permission.forEach(item => {
                if (state.permission.indexOf(item.menuCode) === -1) {
                    state.permission.push(item.menuCode)
                }
            })
        },
        CLEAR_PERMISSION: (state) => {
            state.permission = []
        }
    }

}
export default user