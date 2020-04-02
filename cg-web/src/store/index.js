import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import admin from './modules/admin'
import logs from './modules/logs'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({ 
    modules: {
        user,
        common,
        logs,
        admin
    },
    getters,
})

export default store