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
                    <firealarmtab1 :paramData="paramData" :tabnum="tabnum"></firealarmtab1>
                </a-tab-pane>
                <a-tab-pane tab="实时数据" key="2">
                    <firealarmtab2 :paramData="paramData" :tabnum="tabnum"></firealarmtab2>
                </a-tab-pane>
                <a-tab-pane tab="相关图片" key="3">
                    <firealarmtab3 :paramData="paramData" :tabnum="tabnum"></firealarmtab3>
                </a-tab-pane>
                <a-tab-pane tab="关联视频" key="4">
                    <firealarmtab4 :paramData="paramData" :tabnum="tabnum"></firealarmtab4>
                </a-tab-pane>
                <a-tab-pane tab="联动设备" key="5">
                    <firealarmtab5 :paramData="paramData" :tabnum="tabnum"></firealarmtab5>
                </a-tab-pane>
                <a-tab-pane tab="警情记录" key="6">
                    <firealarmtab6 :paramData="paramData" :tabnum="tabnum"></firealarmtab6>
                </a-tab-pane>
                <a-tab-pane tab="状态分析" key="7">
                    <firealarmtab7 :paramData="paramData" :tabnum="tabnum"></firealarmtab7>
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
import firealarmtab1 from './tab/firealarmtab1'
import firealarmtab2 from './tab/firealarmtab2'
import firealarmtab3 from './tab/firealarmtab3'
import firealarmtab4 from './tab/firealarmtab4'
import firealarmtab5 from './tab/firealarmtab5'
import firealarmtab6 from './tab/firealarmtab6'
import firealarmtab7 from './tab/firealarmtab7'
export default {
    components:{
        firealarmtab1,
        firealarmtab2,
        firealarmtab3,
        firealarmtab4,
        firealarmtab5,
        firealarmtab6,
        firealarmtab7,
    },
    data() {
        return {
            visible: false,
            paramData: {
                deviceId: ''
            },
            tabnum:1
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