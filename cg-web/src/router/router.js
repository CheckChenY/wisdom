import router from './index'
router.beforeEach((to, from, next) => {
    // console.log(to)
    // console.log(from)
    next()
})