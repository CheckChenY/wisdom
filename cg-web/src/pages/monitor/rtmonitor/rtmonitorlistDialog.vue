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
            <a-tabs :activeKey="tabnum" @change="onTabChange" :tabBarGutter="0">
                <a-tab-pane tab="设备信息" key="1">
                    <rtmonitorlisttab1 :paramData="paramData" :tabnum="tabnum"></rtmonitorlisttab1>
                </a-tab-pane>
                <a-tab-pane tab="实时数据" key="2">
                    <rtmonitorlisttab2 :paramData="paramData" :tabnum="tabnum"></rtmonitorlisttab2>
                </a-tab-pane>
                <a-tab-pane tab="相关图片" key="3">
                    <rtmonitorlisttab3 :paramData="paramData" :tabnum="tabnum"></rtmonitorlisttab3>
                </a-tab-pane>
                <a-tab-pane tab="关联视频" key="4">
                    <rtmonitorlisttab4 :paramData="paramData" :tabnum="tabnum"></rtmonitorlisttab4>
                </a-tab-pane>
                <a-tab-pane tab="联动设备" key="5">
                    <rtmonitorlisttab5 :paramData="paramData" :tabnum="tabnum"></rtmonitorlisttab5>
                </a-tab-pane>
                <a-tab-pane tab="警情记录" key="6">
                    <rtmonitorlisttab6 :paramData="paramData" :tabnum="tabnum"></rtmonitorlisttab6>
                </a-tab-pane>
                <a-tab-pane tab="状态分析" key="7">
                    <rtmonitorlisttab7 :paramData="paramData" :tabnum="tabnum"></rtmonitorlisttab7>
                </a-tab-pane>
                <a-tab-pane tab="动态曲线" key="8">
                    <rtmonitorlisttab8></rtmonitorlisttab8>
                </a-tab-pane>
                <a-tab-pane tab="操作日志" key="9">
                    <rtmonitorlisttab9 :paramData="paramData" :tabnum="tabnum"></rtmonitorlisttab9>
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
import rtmonitorlisttab1 from './tab/rtmonitorlisttab1'
import rtmonitorlisttab2 from './tab/rtmonitorlisttab2'
import rtmonitorlisttab3 from './tab/rtmonitorlisttab3'
import rtmonitorlisttab4 from './tab/rtmonitorlisttab4'
import rtmonitorlisttab5 from './tab/rtmonitorlisttab5'
import rtmonitorlisttab6 from './tab/rtmonitorlisttab6'
import rtmonitorlisttab7 from './tab/rtmonitorlisttab7'
import rtmonitorlisttab8 from './tab/rtmonitorlisttab8'
import rtmonitorlisttab9 from './tab/rtmonitorlisttab9'
export default {
    components:{
        rtmonitorlisttab1,
        rtmonitorlisttab2,
        rtmonitorlisttab3,
        rtmonitorlisttab4,
        rtmonitorlisttab5,
        rtmonitorlisttab6,
        rtmonitorlisttab7,
        rtmonitorlisttab8,
        rtmonitorlisttab9,
    },
    data() {
        return {
            visible: false,
            paramData: {},
            tabnum:1
        };
    },
    created(){
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
            this.paramData = record
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