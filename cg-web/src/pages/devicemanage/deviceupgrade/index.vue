<template>
    <a-tabs defaultActiveKey="1" @change="onTabChange">
        <a-tab-pane tab="升级列表" key="1">
            <tab1 :tabnum="tabnum"></tab1>
        </a-tab-pane>
        <a-tab-pane tab="升级日志" key="2">
            <tab2 :tabnum="tabnum"></tab2>
        </a-tab-pane>
    </a-tabs>
</template>

<script>
import tab1 from './upgradelist/index'
import tab2 from './upgradelog/index'
export default {
    name:'deviceupgrade',
    data () {
        return{
            tabnum:1
        }
    },
    components:{
        tab1,
        tab2
    },
    beforeCreate () {

    },
    created(){
        
    },
    methods:{
        onTabChange(key) {
            this.tabnum=key
        }
    }
}
</script>