<template>
    <div class="containered">
        <a-tabs defaultActiveKey="1" @change="onTabChange">
            <a-tab-pane tab="考勤设置" key="1">
                <tab1 :tabnum="tabnum"></tab1>
            </a-tab-pane>
            <a-tab-pane tab="考勤记录" key="2">
                <tab2 :tabnum="tabnum"></tab2>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import tab1 from './attendset/index'
import tab2 from './attendrecord/index'
export default {
    data () {
        return {
            tabnum:1
        }
    },
    components:{
        tab1,
        tab2,
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
<style lang='scss'>

</style>