<template>
    <div class="child_unit">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="10">
                    <a-form-item label="开始日期">
                        <a-date-picker
                            v-model="params.starttime"
                            type="date"
                            class="status_date_pick"
                            placeholder="选择日期">
                        </a-date-picker>
                    </a-form-item>
                </a-col>
                <a-col :span="10">
                    <a-form-item label="结束日期">
                        <a-date-picker
                            v-model="params.endtime"
                            type="date"
                            class="status_date_pick"
                            placeholder="选择日期">
                        </a-date-picker>
                    </a-form-item>
                </a-col>
                <a-col :span="10">
                    <a-form-item label="设备状态">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-model="params.alarmType">
                                <a-select-option v-for="(item,index) in alarmTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5" style="margin-top: 3px;">
                    <a-button type="primary" html-type="submit">
                        查询
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        清空
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
        <div class="table-operations"> 
            <a-button type="primary" @click="handlePrint">打印</a-button>
            <a-button type="primary" @click="handleAdd">导出</a-button>
        </div>
        <a-table 
            bordered 
            :dataSource="dataSource" 
            :pagination="pagination"
            :loading="loading"
            :columns="columns">
        </a-table>
    </div>
</template>
<script>
import { getDeviceFindList } from "@/api/public"
import { getAlarmByDevice } from '@/api/monitor/monitor'
import { debuglog } from 'util';
import { dict } from '@/const/dict'
import moment from 'moment';
import { print } from "@/util/print.js";

export default {
    components: {
    },
    props: ["paramData","tabnum"],
    data() {
        return {
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize: 8,
                current: 1
            },
            loading: false,
            columns: [
                {
                    title: '时间',
                    dataIndex: 'createTime',
                },
                {
                    title: '数据',
                    dataIndex: 'dateString',
                },
                {
                    title: '设备状态',
                    dataIndex: 'alarmType',
                },
                {
                    title: '报警类型',
                    dataIndex: 'alarmString',
                },
            ],
            form: this.$form.createForm(this),
            params: {
                page:0,
                size:8,
                deviceId: null,
                alarmType: null,
                starttime: moment(new Date(), 'YYYY-MM-DD'),
                endtime: moment(new Date(), 'YYYY-MM-DD'),
                startTime: null,
                endTime: null,
            },
            alarmTypeList: dict.USESTATE,
            printData: [],
        };
    },
    created(){
        this.params.deviceId = this.paramData.deviceId
        this.getAlarmByDevice()
    },
    watch:{
        'paramData.deviceId':function(val, oval){
            this.params.deviceId = val
            this.getAlarmByDevice()
        },
        tabnum(){
            if(this.tabnum==6){
                this.getAlarmByDevice()
            }
        }
    },
    mounted () {
        this.getDict()
    },
    methods: {
        handleSearch() {
            this.params.page = 0
            this.pagination.current = 1
            this.params.startTime = this.params.starttime.format('YYYY-MM-DD')
            this.params.endTime = this.params.endtime.format('YYYY-MM-DD')
            this.getAlarmByDevice()
        },
        handleReset() {
            this.form.resetFields();
        },
        getDict () {
            let _this = this
            getDeviceFindList({type:1}).then(res=>{
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                    }
                }
            })
        },
        getAlarmByDevice () {
            this.loading = true;
            delete this.params.starttime
            delete this.params.endtime
            getAlarmByDevice(this.params).then(res => {
                if (res && res.data && res.data.success) {
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    res.data.value.content = res.data.value.content?res.data.value.content:[]
                    res.data.value.content.forEach(item => {
                        item.key = item.id
                        item.alarmString = item.alarmDetails?item.alarmDetails.join():''
                        item.dateString = ''
                        item.nowDates.forEach(obj => {
                            item.dateString = item.dateString + obj.dataDic + '：' + obj.dataS
                        })
                        let warn = dict.USESTATE.filter(s => s.value == item.alarmType)
                        item.alarmType = warn.length>0?warn[0].label:''
                    })
                    this.dataSource = res.data.value.content;
                    this.pagination = pagination;
                } else {
                    this.dataSource = []
                }
                this.loading = false;
            })
        },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getAlarmByDevice()
        },
        handleAdd () {

        },
        handlePrint () {
            var title='警情记录'
            var limit=13
            var header=['时间','数据','设备状态','报警类型']
            var column=['createTime','dateString','alarmType','alarmString']
            console.log(this.printData)
            print(title,limit,header,column,this.printData)
        },
    },
};
</script>
<style lang='scss'>
.child_unit{
    .table-operations {
        text-align: left;
        margin-bottom: 16px;
    }

    .table-operations > button {
        margin-right: 8px;
    }
    .status_date_pick{
        margin: 0px 20px ;
    }
}
</style>