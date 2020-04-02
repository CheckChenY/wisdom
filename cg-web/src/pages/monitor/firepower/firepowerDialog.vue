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
                    <firepowertab1 :paramData="paramData" :tabnum="tabnum"></firepowertab1>
                </a-tab-pane>
                <a-tab-pane tab="实时数据" key="2">
                    <firepowertab2 :paramData="paramData" :tabnum="tabnum"></firepowertab2>
                </a-tab-pane>
                <a-tab-pane tab="相关图片" key="3">
                    <firepowertab3 :paramData="paramData" :tabnum="tabnum"></firepowertab3>
                </a-tab-pane>
                <a-tab-pane tab="关联视频" key="4">
                    <firepowertab4 :paramData="paramData" :tabnum="tabnum"></firepowertab4>
                </a-tab-pane>
                <a-tab-pane tab="联动设备" key="5">
                    <firepowertab5 :paramData="paramData" :tabnum="tabnum"></firepowertab5>
                </a-tab-pane>
                <a-tab-pane tab="警情记录" key="6">
                    <firepowertab6 :paramData="paramData" :tabnum="tabnum"></firepowertab6>
                </a-tab-pane>
                <a-tab-pane tab="状态分析" key="7">
                    <firepowertab7 :paramData="paramData" :tabnum="tabnum"></firepowertab7>
                </a-tab-pane>
                <a-tab-pane tab="动态曲线" key="8">
                    <firepowertab8></firepowertab8>
                </a-tab-pane>
                <a-tab-pane tab="操作日志" key="9">
                    <firepowertab9 :paramData="paramData" :tabnum="tabnum"></firepowertab9>
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
import firepowertab1 from './tab/firepowertab1'
import firepowertab2 from './tab/firepowertab2'
import firepowertab3 from './tab/firepowertab3'
import firepowertab4 from './tab/firepowertab4'
import firepowertab5 from './tab/firepowertab5'
import firepowertab6 from './tab/firepowertab6'
import firepowertab7 from './tab/firepowertab7'
import firepowertab8 from './tab/firepowertab8'
import firepowertab9 from './tab/firepowertab9'
export default {
    components:{
        firepowertab1,
        firepowertab2,
        firepowertab3,
        firepowertab4,
        firepowertab5,
        firepowertab6,
        firepowertab7,
        firepowertab8,
        firepowertab9,
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