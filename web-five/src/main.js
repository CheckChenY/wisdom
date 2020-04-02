import 'babel-polyfill';
import 'classlist-polyfill';
import Vue from 'vue';
import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import './permission'; // 权限
import './error'; // 日志
import router from './router/router';

import 'avue-plugin-transfer/packages' //引入avue-plugin-transfer插件

// import 'avue-plugin-ueditor/packages' //引入avue-plugin-ueditor插件(如果要兼容ie自行换掉富文本编辑器，此款插件不兼容ie)
import store from './store';
import {
    loadStyle
} from './util/util'
import * as urls from '@/config/env';
import {
    iconfontUrl,
    iconfontVersion
} from '@/config/env';
import * as filters from './filters' // 全局filter
import './styles/common.scss';

// //源文件包
// import './packages/index.js';
// import './packages/theme-chalk/src/index.scss';
// 自定义组件
import basicContainer from './components/basic-container/main'
import avueCrudInput from './components/avue-crud/crud-input'
import SlideVerify from './components/public/slide-verify'
import VueClipboard from 'vue-clipboard2'
// 插件 json 展示
import vueJsonTreeView from 'vue-json-tree-view'
import echarts from 'echarts'
import chartist from 'chartist'

Vue.use(window.AVUE);

Vue.use(router)

Vue.use(VueClipboard)

Vue.use(vueJsonTreeView)

Vue.use(VueAxios, axios)
Vue.prototype.$echarts = echarts
Vue.prototype.$chartist = chartist

Vue.component('basicContainer', basicContainer)
Vue.component('avueCrudInput', avueCrudInput)
Vue.component('SlideVerify', SlideVerify)
Vue.component(SlideVerify.name, SlideVerify)

Object.keys(urls).forEach(key => {
    Vue.prototype[key] = urls[key];
})

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

iconfontVersion.forEach(ele => {
    loadStyle(iconfontUrl.replace('$key', ele));
})

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')