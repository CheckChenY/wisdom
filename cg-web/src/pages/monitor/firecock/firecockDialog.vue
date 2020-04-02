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
                    <firecocktab1 :paramData="paramData" :tabnum="tabnum"></firecocktab1>
                </a-tab-pane>
                <a-tab-pane tab="实时数据" key="2">
                    <firecocktab2 :paramData="paramData" :tabnum="tabnum"></firecocktab2>
                </a-tab-pane>
                <a-tab-pane tab="相关图片" key="3">
                    <firecocktab3 :paramData="paramData" :tabnum="tabnum"></firecocktab3>
                </a-tab-pane>
                <a-tab-pane tab="关联视频" key="4">
                    <firecocktab4 :paramData="paramData" :tabnum="tabnum"></firecocktab4>
                </a-tab-pane>
                <a-tab-pane tab="联动设备" key="5">
                    <firecocktab5 :paramData="paramData" :tabnum="tabnum"></firecocktab5>
                </a-tab-pane>
                <a-tab-pane tab="警情记录" key="6">
                    <firecocktab6 :paramData="paramData" :tabnum="tabnum"></firecocktab6>
                </a-tab-pane>
                <a-tab-pane tab="状态分析" key="7">
                    <firecocktab7 :paramData="paramData" :tabnum="tabnum"></firecocktab7>
                </a-tab-pane>
                <a-tab-pane tab="动态曲线" key="8">
                    <firecocktab8></firecocktab8>
                </a-tab-pane>
                <a-tab-pane tab="操作日志" key="9">
                    <firecocktab9 :paramData="paramData" :tabnum="tabnum"></firecocktab9>
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
import firecocktab1 from './tab/firecocktab1'
import firecocktab2 from './tab/firecocktab2'
import firecocktab3 from './tab/firecocktab3'
import firecocktab4 from './tab/firecocktab4'
import firecocktab5 from './tab/firecocktab5'
import firecocktab6 from './tab/firecocktab6'
import firecocktab7 from './tab/firecocktab7'
import firecocktab8 from './tab/firecocktab8'
import firecocktab9 from './tab/firecocktab9'
export default {
    components:{
        firecocktab1,
        firecocktab2,
        firecocktab3,
        firecocktab4,
        firecocktab5,
        firecocktab6,
        firecocktab7,
        firecocktab8,
        firecocktab9,
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