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
                    <electricfiretab1 :paramData="paramData" :tabnum="tabnum"></electricfiretab1>
                </a-tab-pane>
                <a-tab-pane tab="实时数据" key="2">
                    <electricfiretab2 :paramData="paramData" :tabnum="tabnum"></electricfiretab2>
                </a-tab-pane>
                <a-tab-pane tab="相关图片" key="3">
                    <electricfiretab3 :paramData="paramData" :tabnum="tabnum"></electricfiretab3>
                </a-tab-pane>
                <a-tab-pane tab="关联视频" key="4">
                    <electricfiretab4 :paramData="paramData" :tabnum="tabnum"></electricfiretab4>
                </a-tab-pane>
                <a-tab-pane tab="联动设备" key="5">
                    <electricfiretab5 :paramData="paramData" :tabnum="tabnum"></electricfiretab5>
                </a-tab-pane>
                <a-tab-pane tab="警情记录" key="6">
                    <electricfiretab6 :paramData="paramData" :tabnum="tabnum"></electricfiretab6>
                </a-tab-pane>
                <a-tab-pane tab="状态分析" key="7">
                    <electricfiretab7 :paramData="paramData" :tabnum="tabnum"></electricfiretab7>
                </a-tab-pane>
                <a-tab-pane tab="动态曲线" key="8">
                    <electricfiretab8></electricfiretab8>
                </a-tab-pane>
                <a-tab-pane tab="操作日志" key="9">
                    <electricfiretab9 :paramData="paramData" :tabnum="tabnum"></electricfiretab9>
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
import electricfiretab1 from './tab/electricfiretab1'
import electricfiretab2 from './tab/electricfiretab2'
import electricfiretab3 from './tab/electricfiretab3'
import electricfiretab4 from './tab/electricfiretab4'
import electricfiretab5 from './tab/electricfiretab5'
import electricfiretab6 from './tab/electricfiretab6'
import electricfiretab7 from './tab/electricfiretab7'
import electricfiretab8 from './tab/electricfiretab8'
import electricfiretab9 from './tab/electricfiretab9'
export default {
    components:{
        electricfiretab1,
        electricfiretab2,
        electricfiretab3,
        electricfiretab4,
        electricfiretab5,
        electricfiretab6,
        electricfiretab7,
        electricfiretab8,
        electricfiretab9,
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