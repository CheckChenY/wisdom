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
                    <firewirelesstab1 :paramData="paramData" :tabnum="tabnum"></firewirelesstab1>
                </a-tab-pane>
                <a-tab-pane tab="实时数据" key="2">
                    <firewirelesstab2 :paramData="paramData" :tabnum="tabnum"></firewirelesstab2>
                </a-tab-pane>
                <a-tab-pane tab="相关图片" key="3">
                    <firewirelesstab3 :paramData="paramData" :tabnum="tabnum"></firewirelesstab3>
                </a-tab-pane>
                <a-tab-pane tab="关联视频" key="4">
                    <firewirelesstab4 :paramData="paramData" :tabnum="tabnum"></firewirelesstab4>
                </a-tab-pane>
                <a-tab-pane tab="联动设备" key="5">
                    <firewirelesstab5 :paramData="paramData" :tabnum="tabnum"></firewirelesstab5>
                </a-tab-pane>
                <a-tab-pane tab="警情记录" key="6">
                    <firewirelesstab6 :paramData="paramData" :tabnum="tabnum"></firewirelesstab6>
                </a-tab-pane>
                <a-tab-pane tab="状态分析" key="7">
                    <firewirelesstab7 :paramData="paramData" :tabnum="tabnum"></firewirelesstab7>
                </a-tab-pane>
                <a-tab-pane tab="动态曲线" key="8">
                    <firewirelesstab8></firewirelesstab8>
                </a-tab-pane>
                <a-tab-pane tab="操作日志" key="9">
                    <firewirelesstab9 :paramData="paramData" :tabnum="tabnum"></firewirelesstab9>
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
import firewirelesstab1 from './tab/firewirelesstab1'
import firewirelesstab2 from './tab/firewirelesstab2'
import firewirelesstab3 from './tab/firewirelesstab3'
import firewirelesstab4 from './tab/firewirelesstab4'
import firewirelesstab5 from './tab/firewirelesstab5'
import firewirelesstab6 from './tab/firewirelesstab6'
import firewirelesstab7 from './tab/firewirelesstab7'
import firewirelesstab8 from './tab/firewirelesstab8'
import firewirelesstab9 from './tab/firewirelesstab9'
export default {
    components:{
        firewirelesstab1,
        firewirelesstab2,
        firewirelesstab3,
        firewirelesstab4,
        firewirelesstab5,
        firewirelesstab6,
        firewirelesstab7,
        firewirelesstab8,
        firewirelesstab9,
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