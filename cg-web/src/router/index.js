import Vue from 'vue'
import Router from 'vue-router'
import workbench from '@/pages/workbench/index.vue'
import workplatform from '@/pages/workplatform/index.vue'
import login from '@/pages/login/index.vue'
import system from '@/pages/system/index.vue'
import register from '@/pages/register/index.vue'
import forgetPass from '@/pages/forgetPass/index.vue'
import index_jg from '@/pages/screenhome/screen/index.vue'
import screencompany from '@/pages/screenhome/screencompany/index.vue'
import screenbreaker from '@/pages/screenhome/screenbreaker/index.vue'

import routermanger from './page/index';

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
      name: '',
      component: login,
    },
    {
      path: '/system',
      name: 'system',
      component: system,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/forgetPass',
      name: 'forgetPass',
      component: forgetPass,
    },
    {
      path: '/index_jg',
      name: 'index_jg',
      component: index_jg,
    },
    {
      path: '/screencompany',
      name: 'screencompany',
      component: screencompany,
    },
    {
      path: '/screenbreaker',
      name: 'screenbreaker',
      component: screenbreaker,
    },
    {
      path: '/workplatform',
      name: 'workplatform',
      component: workplatform,
    },
    {
      path: '/workbench',
      name: 'workbench',
      redirect:'/home',
      component: workbench,
      children:routermanger
    },
  ]
})
export default router
