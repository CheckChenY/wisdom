<template>
    <div>
        <a-tabs defaultActiveKey="1" @change="onTabChange">
            <a-tab-pane tab="组合关联" key="1">
                <tab1 :tabnum="tabnum"></tab1>
            </a-tab-pane>
            <a-tab-pane tab="视频关联" key="2">
                <tab2 :tabnum="tabnum"></tab2>
            </a-tab-pane>
            <a-tab-pane tab="联动管理" key="3">
                <tab3 :tabnum="tabnum"></tab3>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import tab1 from './unionlink/index'
import tab2 from './videolink/index'
import tab3 from './linkmanage/index'
export default {
    data () {
        return{
            tabnum:1
        }
    },
    components:{
        tab1,
        tab2,
        tab3
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