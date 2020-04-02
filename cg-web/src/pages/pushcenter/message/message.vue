<template>
    <div>
        <a-tabs :tabBarGutter="0" :activeKey="tabnum" @change="onTabChange">
            <a-tab-pane tab="消息查看" key="1">
                <infoview :paramData="paramData" :tabnum="tabnum"></infoview>
            </a-tab-pane>
            <a-tab-pane tab="消息发送" key="2">
                <infosend :paramData="paramData" :tabnum="tabnum"></infosend>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
import moment from 'moment';
import infoview from './infoview/infoview'
import infosend from './infosend/infosend'
export default {
    components:{
        infoview,
        infosend,
    },
    data() {
        return {
            paramData: {
                deviceId: ''
            },
            tabnum:'1'
        };
    },
    created(){
    },
    mounted () {
    },
    watch:{
      
    },
    methods: {
        onTabChange(key){
            console.log(key)
            this.tabnum=key
        },
    },
};
</script>
<style lang='scss'>
</style>