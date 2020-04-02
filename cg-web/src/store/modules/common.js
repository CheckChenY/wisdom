import {
    setStore,
    getStore,
    removeStore
} from '../../util/store'
import { findCount } from '@/api/pushcenter/pushcenter'
// import {
//     getDic
// } from '@/api/admin'
// import website from '@/const/website'
const common = {

    state: {
        isCollapse: false,
        isFullScren: false,
        isShade: false,
        screen: -1,
        isLock: getStore({ name: 'isLock' }) || false,
        showFullScren: getStore({ name: 'showFullScren' }),
        showTheme: getStore({ name: 'showTheme' }),
        showColor: getStore({ name: 'showColor' }),
        showMenu: getStore({ name: 'showMenu' }),
        theme: getStore({ name: 'theme' }) || '#409EFF',
        themeName: getStore({ name: 'themeName' }) || '',
        lockPasswd: getStore({ name: 'lockPasswd' }) || '',
        // website: website,
        msgCount: {},
        rowLight: '',
    },
    actions: {
        //获取字典公用类
        GetDic(params, dic) {
            return new Promise((resolve) => {
                if (dic instanceof Array) {
                    // Promise.all(dic.map(ele => getDic(ele))).then(data => {
                    //     let result = {};
                    //     dic.forEach((ele, index) => {
                    //         result[ele] = data[index].data;
                    //     })
                    //     resolve(result)
                    // })
                }
            })
        },
        findCount({ commit }){
            findCount().then((res) => {
                commit('SET_MSGCOUNT', res.data.value);
            })
        },
        setRowLight({commit}, rowLight){
            commit('SET_ROWLIGHT', rowLight);
        }
    },
    mutations: {
        SET_SHADE: (state, active) => {
            state.isShade = active;
        },
        SET_COLLAPSE: (state) => {
            state.isCollapse = !state.isCollapse;
        },
        SET_FULLSCREN: (state) => {
            state.isFullScren = !state.isFullScren;
        },
        SET_SHOWMENU: (state, active) => {
            state.showMenu = active;
            setStore({
                name: 'showMenu',
                content: state.showMenu
            })
        },
        SET_SHOWFULLSCREN: (state, active) => {
            state.showFullScren = active;
            setStore({
                name: 'showFullScren',
                content: state.showFullScren
            })
        },
        SET_SHOWTHEME: (state, active) => {
            state.showTheme = active;
            setStore({
                name: 'showTheme',
                content: state.showTheme
            })
        },
        SET_SHOWCOLOR: (state, active) => {
            state.showColor = active;
            setStore({
                name: 'showColor',
                content: state.showColor
            })
        },
        SET_LOCK: (state) => {
            state.isLock = true;
            setStore({
                name: 'isLock',
                content: state.isLock,
                type: 'session'
            })
        },
        SET_SCREEN: (state, screen) => {
            state.screen = screen;
        },
        SET_THEME: (state, color) => {
            state.theme = color;
            setStore({
                name: 'theme',
                content: state.theme,
            })
        },
        SET_THEME_NAME: (state, themeName) => {
            state.themeName = themeName;
            setStore({
                name: 'themeName',
                content: state.themeName,
            })
        },
        SET_LOCK_PASSWD: (state, lockPasswd) => {
            state.lockPasswd = lockPasswd;
            setStore({
                name: 'lockPasswd',
                content: state.lockPasswd,
                type: 'session'
            })
        },
        CLEAR_LOCK: (state) => {
            state.isLock = false;
            state.lockPasswd = '';
            removeStore({
                name: 'lockPasswd'
            });
            removeStore({
                name: 'isLock'
            });
        },
        SET_MSGCOUNT: (state, msgCount) => {
            state.msgCount = msgCount
        },
        SET_ROWLIGHT: (state, rowLight) => {
            state.rowLight = rowLight
        }
    }
}
export default common