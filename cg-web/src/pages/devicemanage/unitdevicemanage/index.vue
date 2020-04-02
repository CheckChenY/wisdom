<template>
    <a-tabs defaultActiveKey="1" @change="onTabChange">
        <a-tab-pane tab="单位设备管理" key="1">
            <tab1 :tabnum="tabnum"></tab1>
        </a-tab-pane>
        <a-tab-pane tab="单位摄像头管理" key="2">
            <tab2 :tabnum="tabnum"></tab2>
        </a-tab-pane>
    </a-tabs>
</template>

<script>
import tab1 from './nocameramanage/index'
import tab2 from './cameramanage/index'
export default {
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