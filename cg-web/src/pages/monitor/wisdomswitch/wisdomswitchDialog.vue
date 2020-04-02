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
                    <wisdomswitchtab1 :paramData="paramData" :tabnum="tabnum"></wisdomswitchtab1>
                </a-tab-pane>
                <a-tab-pane tab="实时数据" key="2">
                    <wisdomswitchtab2 :paramData="paramData" :tabnum="tabnum"></wisdomswitchtab2>
                </a-tab-pane>
                <a-tab-pane tab="相关图片" key="3">
                    <wisdomswitchtab3 :paramData="paramData" :tabnum="tabnum"></wisdomswitchtab3>
                </a-tab-pane>
                <a-tab-pane tab="关联视频" key="4">
                    <wisdomswitchtab4 :paramData="paramData" :tabnum="tabnum"></wisdomswitchtab4>
                </a-tab-pane>
                <a-tab-pane tab="联动设备" key="5">
                    <wisdomswitchtab5 :paramData="paramData" :tabnum="tabnum"></wisdomswitchtab5>
                </a-tab-pane>
                <a-tab-pane tab="警情记录" key="6">
                    <wisdomswitchtab6 :paramData="paramData" :tabnum="tabnum"></wisdomswitchtab6>
                </a-tab-pane>
                <a-tab-pane tab="状态分析" key="7">
                    <wisdomswitchtab7 :paramData="paramData" :tabnum="tabnum"></wisdomswitchtab7>
                </a-tab-pane>
                <a-tab-pane tab="动态曲线" key="8">
                    <wisdomswitchtab8></wisdomswitchtab8>
                </a-tab-pane>
                <a-tab-pane tab="操作日志" key="9">
                    <wisdomswitchtab9 :paramData="paramData" :tabnum="tabnum"></wisdomswitchtab9>
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
import wisdomswitchtab1 from './tab/wisdomswitchtab1'
import wisdomswitchtab2 from './tab/wisdomswitchtab2'
import wisdomswitchtab3 from './tab/wisdomswitchtab3'
import wisdomswitchtab4 from './tab/wisdomswitchtab4'
import wisdomswitchtab5 from './tab/wisdomswitchtab5'
import wisdomswitchtab6 from './tab/wisdomswitchtab6'
import wisdomswitchtab7 from './tab/wisdomswitchtab7'
import wisdomswitchtab8 from './tab/wisdomswitchtab8'
import wisdomswitchtab9 from './tab/wisdomswitchtab9'
export default {
    components:{
        wisdomswitchtab1,
        wisdomswitchtab2,
        wisdomswitchtab3,
        wisdomswitchtab4,
        wisdomswitchtab5,
        wisdomswitchtab6,
        wisdomswitchtab7,
        wisdomswitchtab8,
        wisdomswitchtab9,
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