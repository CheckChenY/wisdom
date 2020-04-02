import router from './router/router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false });
const lockPage = store.getters.website.lockPage; //锁屏页
const whiteList = store.getters.website.whiteList; //不鉴权白名单
const whiteTagList = store.getters.website.whiteTagList; //不加tags白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (store.getters.access_token) {
        store.dispatch('RefeshToken')
        setTimeout(() => {
            if (store.getters.isLock && to.path != lockPage) {
                next({ path: lockPage })
            } else if (to.path === '/login') {
                next({ path: '/' })
            } else {
                if (store.getters.roles.length === 0) {
                    store.dispatch('GetUserInfo').then(() => {
                        next({...to, replace: true })
                    }).catch(() => {
                        store.dispatch('FedLogOut').then(() => {
                            next({ path: '/login' })
                        })
                    })
                } else {
                    if (!router.$avueRouter.vaildPath(whiteTagList, to.path)) {
                        const value = to.query.src ? to.query.src : to.path;
                        const label = to.query.name ? to.query.name : to.name;
                        store.commit('ADD_TAG', {
                            label: label,
                            value: value,
                            params: to.params,
                            query: to.query
                        });
                    }
                    next()
                }
            }
        }, 800)
    } else {
        if (router.$avueRouter.vaildPath(whiteList, to.path)) {
            next()
        } else {
            next('/login')
        }
    }
})

router.afterEach(() => {
    NProgress.done();
    const title = store.getters.tag.label;
    router.$avueRouter.setTitle(title);
});
//正则验证路由