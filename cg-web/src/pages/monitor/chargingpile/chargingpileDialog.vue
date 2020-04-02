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
            <a-tabs :activeKey="tabnum" @change="onTabChange">
                <a-tab-pane tab="设备信息" key="1">
                    <chargingpiletab1 :paramData="paramData" :tabnum="tabnum"></chargingpiletab1>
                </a-tab-pane>
                <a-tab-pane tab="实时数据" key="2">
                    <chargingpiletab2 :paramData="paramData" :tabnum="tabnum"></chargingpiletab2>
                </a-tab-pane>
                <a-tab-pane tab="相关图片" key="3">
                    <chargingpiletab3 :paramData="paramData" :tabnum="tabnum"></chargingpiletab3>
                </a-tab-pane>
                <a-tab-pane tab="关联视频" key="4">
                    <chargingpiletab4 :paramData="paramData" :tabnum="tabnum"></chargingpiletab4>
                </a-tab-pane>
                <a-tab-pane tab="联动设备" key="5">
                    <chargingpiletab5 :paramData="paramData" :tabnum="tabnum"></chargingpiletab5>
                </a-tab-pane>
                <a-tab-pane tab="警情记录" key="6">
                    <chargingpiletab6 :paramData="paramData" :tabnum="tabnum"></chargingpiletab6>
                </a-tab-pane>
                <a-tab-pane tab="状态分析" key="7">
                    <chargingpiletab7 :paramData="paramData" :tabnum="tabnum"></chargingpiletab7>
                </a-tab-pane>
                <a-tab-pane tab="动态曲线" key="8">
                    <chargingpiletab8></chargingpiletab8>
                </a-tab-pane>
                <a-tab-pane tab="操作日志" key="9">
                    <chargingpiletab9 :paramData="paramData" :tabnum="tabnum"></chargingpiletab9>
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
import chargingpiletab1 from './tab/chargingpiletab1'
import chargingpiletab2 from './tab/chargingpiletab2'
import chargingpiletab3 from './tab/chargingpiletab3'
import chargingpiletab4 from './tab/chargingpiletab4'
import chargingpiletab5 from './tab/chargingpiletab5'
import chargingpiletab6 from './tab/chargingpiletab6'
import chargingpiletab7 from './tab/chargingpiletab7'
import chargingpiletab8 from './tab/chargingpiletab8'
import chargingpiletab9 from './tab/chargingpiletab9'
export default {
    components:{
        chargingpiletab1,
        chargingpiletab2,
        chargingpiletab3,
        chargingpiletab4,
        chargingpiletab5,
        chargingpiletab6,
        chargingpiletab7,
        chargingpiletab8,
        chargingpiletab9,
    },
    data() {
        return {
            visible: false,
            paramData: {},
            tabnum:1,
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
            this.paramData = record
            this.$store.dispatch("setRowLight", record.deviceId)
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