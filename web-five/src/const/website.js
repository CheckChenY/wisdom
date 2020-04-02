export default {
    // 登录 标题
    title: "智慧消防云平台",
    logo: require("../../public/img/zzgjhzzxlogo.jpg"),
    man: require("../../public/img/man.jpg"),
    women: require("../../public/img/women.jpg"),
    indexTitle: '郑州国际会展中心',
    whiteList: ["/login", "/404", "/401", "/lock", "/forgetPass", "/register"], //配置无权限可以访问的页面
    whiteTagList: ["/login", "/404", "/401", "/lock", "/forgetPass", "/supervision", "/register"], //配置不添加tags页面 （'/advanced-router/mutative-detail/*'——*为通配符）
    lockPage: '/lock',
    tokenTime: 60 * 7, // refreshtoken时间
    info: {
        title: "物联网 • 大数据",
        list: "金特莱智慧城市消防管理系统"
    },
    //配置菜单的属性
    menu: {
        props: {
            label: 'label',
            path: 'path',
            icon: 'icon',
            children: 'children'
        }
    }
}