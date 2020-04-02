<template>
    <div class="form_dialog">
        <a-drawer
            title="设备详情"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
            :width="900"
            >
            <a-tabs :tabBarGutter="0" :activeKey="tabnum" @change="onTabChange" v-if="visible">
                <a-tab-pane tab="设备信息" key="1">
                    <currentdatatab1 :paramData="paramData" :tabnum="tabnum"></currentdatatab1>
                </a-tab-pane>
                <a-tab-pane tab="实时数据" key="2">
                    <currentdatatab2 :paramData="paramData" :tabnum="tabnum"></currentdatatab2>
                </a-tab-pane>
                <a-tab-pane tab="相关图片" key="3">
                    <currentdatatab3 :paramData="paramData" :tabnum="tabnum"></currentdatatab3>
                </a-tab-pane>
                <a-tab-pane tab="关联视频" key="4">
                    <currentdatatab4 :paramData="paramData" :tabnum="tabnum"></currentdatatab4>
                </a-tab-pane>
                <a-tab-pane tab="联动设备" key="5">
                    <currentdatatab5 :paramData="paramData" :tabnum="tabnum"></currentdatatab5>
                </a-tab-pane>
                <a-tab-pane tab="警情记录" key="6">
                    <currentdatatab6 :paramData="paramData" :tabnum="tabnum"></currentdatatab6>
                </a-tab-pane>
                <a-tab-pane tab="状态分析" key="7">
                    <currentdatatab7 :paramData="paramData" :tabnum="tabnum"></currentdatatab7>
                </a-tab-pane>
                <a-tab-pane tab="动态曲线" key="8">
                    <currentdatatab8 :tabnum="tabnum"></currentdatatab8>
                </a-tab-pane>
                <a-tab-pane tab="操作日志" key="9">
                    <currentdatatab9 :paramData="paramData" :tabnum="tabnum"></currentdatatab9>
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
import currentdatatab1 from './tab/currentdatatab1'
import currentdatatab2 from './tab/currentdatatab2'
import currentdatatab3 from './tab/currentdatatab3'
import currentdatatab4 from './tab/currentdatatab4'
import currentdatatab5 from './tab/currentdatatab5'
import currentdatatab6 from './tab/currentdatatab6'
import currentdatatab7 from './tab/currentdatatab7'
import currentdatatab8 from './tab/currentdatatab8'
import currentdatatab9 from './tab/currentdatatab9'
export default {
    components:{
        currentdatatab1,
        currentdatatab2,
        currentdatatab3,
        currentdatatab4,
        currentdatatab5,
        currentdatatab6,
        currentdatatab7,
        currentdatatab8,
        currentdatatab9,
    },
    data() {
        return {
            visible: false,
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
        visible(){
            if(this.visible){
                this.tabnum='1'
            }
        }
    },
    methods: {
        showDrawer(record) {
            this.visible = true;
            this.$store.dispatch("setRowLight", record.deviceId)
            Object.assign(this.paramData, record)
        },
        onClose() {
            this.visible = false;
            this.$store.dispatch("setRowLight", '')
        },
        onTabChange(key){
            console.log(key)
            this.tabnum=key
        },
    },
};
</script>
<style lang='scss'>
.form_dialog{
    .table-operations {
        text-align: left;
        margin-bottom: 16px;
    }

    .table-operations > button {
        margin-right: 8px;
    }
}
</style>