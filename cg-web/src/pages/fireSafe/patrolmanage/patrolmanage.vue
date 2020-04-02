<template>
    <div>
        <a-tabs defaultActiveKey="1" :tabBarGutter="0" @change="tabChange">
            <a-tab-pane tab="巡查点管理" key="1">
                <patroltab1 :tabnum="tabnum"></patroltab1>
            </a-tab-pane>
            <a-tab-pane tab="巡查任务配置" key="2">
                <patroltab2 :tabnum="tabnum"></patroltab2>
            </a-tab-pane>
            <a-tab-pane tab="巡查任务" key="3">
                <patroltab3 :tabnum="tabnum"></patroltab3>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import patroltab1 from './tab/patroltab1'
import patroltab2 from './tab/patroltab2'
import patroltab3 from './tab/patroltab3'
export default {
    components:{
        patroltab1,
        patroltab2,
        patroltab3,
    },
    created(){
        
    },
    data () {
        return {
            tabnum:1
        }
    },
    methods:{
        tabChange(key){
            this.tabnum=key
        },
    }
    
}
</script>