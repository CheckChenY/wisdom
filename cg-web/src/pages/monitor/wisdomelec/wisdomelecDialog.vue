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
                    <wisdomelectab1 :paramData="paramData" :tabnum="tabnum"></wisdomelectab1>
                </a-tab-pane>
                <a-tab-pane tab="实时数据" key="2">
                    <wisdomelectab2 :paramData="paramData" :tabnum="tabnum"></wisdomelectab2>
                </a-tab-pane>
                <a-tab-pane tab="相关图片" key="3">
                    <wisdomelectab3 :paramData="paramData" :tabnum="tabnum"></wisdomelectab3>
                </a-tab-pane>
                <a-tab-pane tab="关联视频" key="4">
                    <wisdomelectab4 :paramData="paramData" :tabnum="tabnum"></wisdomelectab4>
                </a-tab-pane>
                <a-tab-pane tab="联动设备" key="5">
                    <wisdomelectab5 :paramData="paramData" :tabnum="tabnum"></wisdomelectab5>
                </a-tab-pane>
                <a-tab-pane tab="警情记录" key="6">
                    <wisdomelectab6 :paramData="paramData" :tabnum="tabnum"></wisdomelectab6>
                </a-tab-pane>
                <a-tab-pane tab="状态分析" key="7">
                    <wisdomelectab7 :paramData="paramData" :tabnum="tabnum"></wisdomelectab7>
                </a-tab-pane>
                <a-tab-pane tab="动态曲线" key="8">
                    <wisdomelectab8></wisdomelectab8>
                </a-tab-pane>
                <a-tab-pane tab="操作日志" key="9">
                    <wisdomelectab9 :paramData="paramData" :tabnum="tabnum"></wisdomelectab9>
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
import wisdomelectab1 from './tab/wisdomelectab1'
import wisdomelectab2 from './tab/wisdomelectab2'
import wisdomelectab3 from './tab/wisdomelectab3'
import wisdomelectab4 from './tab/wisdomelectab4'
import wisdomelectab5 from './tab/wisdomelectab5'
import wisdomelectab6 from './tab/wisdomelectab6'
import wisdomelectab7 from './tab/wisdomelectab7'
import wisdomelectab8 from './tab/wisdomelectab8'
import wisdomelectab9 from './tab/wisdomelectab9'
export default {
    components:{
        wisdomelectab1,
        wisdomelectab2,
        wisdomelectab3,
        wisdomelectab4,
        wisdomelectab5,
        wisdomelectab6,
        wisdomelectab7,
        wisdomelectab8,
        wisdomelectab9,
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