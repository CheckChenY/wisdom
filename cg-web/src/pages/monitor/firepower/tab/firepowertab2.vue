<template>
    <a-form class="monitor_tab_index">
        <a-row :gutter="24">
            <a-col :span="12">
                <a-form-item 
                    label="上报时间"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                    {{form.createTime}}
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="当前状态"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                    {{form.warnState}}
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="报警类型"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                    {{form.alarmType?form.alarmType:'无'}}
                </a-form-item>
            </a-col>
            <a-col :span="24">
                当前数据:
            </a-col>
            <a-col :span="12">
                <a-card title="实时数据" :bordered="false">
                    <a-table :columns="columnsData"
                        :dataSource="data"
                        :scroll="{ y: 450 }"
                        :pagination="false"
                        :loading="loading"
                        >
                    </a-table>
                </a-card>
            </a-col>
        </a-row>
    </a-form>
</template>
<script>
const columnsData = [
    {
      title: '数据类型',
      dataIndex: 'key',
    },
    {
      title: '实时数据',
      dataIndex: 'value',
    },
];
import { getDeviceMonitoringData } from '@/api/monitor/monitor'
export default {
    props: ["paramData","tabnum"],
    data () {
        return {
            data:[],
            form: {},
            loading: false,
            columnsData: columnsData,

        };
    },
    watch:{
        'paramData.deviceId':function(val, oval){
            this.getDeviceMonitoringData(val)
        },
        tabnum(){
            if(this.tabnum==2){
                this.getDeviceMonitoringData(this.paramData.deviceId)
            }
        }
    },
    created () { 
        this.getDeviceMonitoringData(this.paramData.deviceId)
    },
    mounted () {
    },
    computed: {
    },
    beforeCreate() {
    },
    destoryed(){
    },
    methods: {
        getDeviceMonitoringData (id) {
            this.loading = true
            getDeviceMonitoringData({deviceId:id}).then(res => {
                if (res && res.data && res.data.success) {
                    this.form = res.data.value
                    this.data = res.data.value.newDatas
                } else {
                    this.form = {}
                    this.data = []
                }
                this.loading = false
            })
        },
    }
}
</script>
<style lang="scss">
.monitor_tab_index{
    .ant-steps-item{
        width:400px;
        flex: none;
    }
    .ant-form-item-label{
        width:120px;
    }
    .ant-input,
    .ant-select-selection{
        width:250px;
    }
    .code_input{
        width:250px;
        input{
            width: inherit;
        }
    }
}
</style>
