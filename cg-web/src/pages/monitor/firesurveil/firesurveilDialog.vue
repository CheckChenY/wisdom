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
            <a-tabs defaultActiveKey="1" :tabBarGutter="0">
                <a-tab-pane tab="设备信息" key="1">
                    <firesurveiltab1 :paramData="paramData" v-if="visible"></firesurveiltab1>
                </a-tab-pane>
                <a-tab-pane tab="相关图片" key="2">
                    <firesurveiltab2 :paramData="paramData" v-if="visible"></firesurveiltab2>
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
import firesurveiltab1 from './tab/firesurveiltab1'
import firesurveiltab2 from './tab/firesurveiltab2'
export default {
    components:{
        firesurveiltab1,
        firesurveiltab2,
    },
    data() {
        return {
            visible: false,
            paramData: {}
        };
    },
    created(){
    },
    methods: {
        showDrawer(record) {
            this.visible = true;
            this.paramData = record
        },
        onClose() {
            this.visible = false;
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