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
                    <firedoortab1 :paramData="paramData" :tabnum="tabnum"></firedoortab1>
                </a-tab-pane>
                <a-tab-pane tab="实时数据" key="2">
                    <firedoortab2 :paramData="paramData" :tabnum="tabnum"></firedoortab2>
                </a-tab-pane>
                <a-tab-pane tab="相关图片" key="3">
                    <firedoortab3 :paramData="paramData" :tabnum="tabnum"></firedoortab3>
                </a-tab-pane>
                <a-tab-pane tab="关联视频" key="4">
                    <firedoortab4 :paramData="paramData" :tabnum="tabnum"></firedoortab4>
                </a-tab-pane>
                <a-tab-pane tab="联动设备" key="5">
                    <firedoortab5 :paramData="paramData" :tabnum="tabnum"></firedoortab5>
                </a-tab-pane>
                <a-tab-pane tab="警情记录" key="6">
                    <firedoortab6 :paramData="paramData" :tabnum="tabnum"></firedoortab6>
                </a-tab-pane>
                <a-tab-pane tab="状态分析" key="7">
                    <firedoortab7 :paramData="paramData" :tabnum="tabnum"></firedoortab7>
                </a-tab-pane>
                <a-tab-pane tab="动态曲线" key="8">
                    <firedoortab8></firedoortab8>
                </a-tab-pane>
                <a-tab-pane tab="操作日志" key="9">
                    <firedoortab9 :paramData="paramData" :tabnum="tabnum"></firedoortab9>
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
import firedoortab1 from './tab/firedoortab1'
import firedoortab2 from './tab/firedoortab2'
import firedoortab3 from './tab/firedoortab3'
import firedoortab4 from './tab/firedoortab4'
import firedoortab5 from './tab/firedoortab5'
import firedoortab6 from './tab/firedoortab6'
import firedoortab7 from './tab/firedoortab7'
import firedoortab8 from './tab/firedoortab8'
import firedoortab9 from './tab/firedoortab9'
export default {
    components:{
        firedoortab1,
        firedoortab2,
        firedoortab3,
        firedoortab4,
        firedoortab5,
        firedoortab6,
        firedoortab7,
        firedoortab8,
        firedoortab9,
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