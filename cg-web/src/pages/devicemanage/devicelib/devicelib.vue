<template>
    <div>
        <a-tabs defaultActiveKey="1" @change="onTabChange">
            <a-tab-pane tab="设备库" key="1">
                <tab1 :tabnum="tabnum"></tab1>
            </a-tab-pane>
            <a-tab-pane tab="摄像头库" key="2">
                <tab2 :tabnum="tabnum"></tab2>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import tab1 from './tab1'
import tab2 from './tab2'
export default {
    components:{
        tab1,
        tab2
    },
    data () {
        return {
            tabnum:1
        }
    },
    methods:{
        onTabChange(key) {
            this.tabnum=key
        }
    }
    
}
</script>