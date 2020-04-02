import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { dict } from '@/const/dict'
// import axios from 'axios'
import axios from './router/axios';
import VueAxios from 'vue-axios'
import echarts from 'echarts'
import 'echarts/extension/bmap/bmap';
import moment from 'moment'
import 'moment/locale/zh-cn';

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import './styles/common.scss';
import App from './App.vue'
import router from './router'
import './router/router'

import store from './store';

import uploadmsg from './util/uploadmsg'
import CopyText from './util/CopyText';

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(Antd)
Vue.use(CopyText);

Vue.prototype.$echarts = echarts
Vue.prototype.$imgUrl = dict.IMGURL // 开发和测试
moment.locale('zh-cn');
Vue.prototype.moment = moment
Vue.prototype.$uploadmsg = uploadmsg.install

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
