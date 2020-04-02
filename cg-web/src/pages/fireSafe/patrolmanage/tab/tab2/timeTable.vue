<template>
    <div class="child_unit">
        <div class="table-operations">
            <a-button type="primary" @click="handleAdd">添加周期</a-button>
        </div>
        <a-table bordered 
            :dataSource="dataSource" 
            :pagination="false"
            :scroll="{ x: 0, y: 700 }"
            :loading="loading"
            :columns="columns">
            <template slot="startTime" slot-scope="text, record">
                <a-time-picker v-model="record.startTime" 
                    :allowClear="false" 
                    @change="startTimeChange" 
                    @openChange="openChangeS" 
                    :minuteStep="5"
                    format="HH:mm" />
            </template>
            <template slot="endTime" slot-scope="text, record">
                <a-time-picker v-model="record.endTime" 
                    :allowClear="false" 
                    @change="endTimeChange" 
                    @openChange="openChangeE" 
                    :disabledHours="disabledHoursE" 
                    :minuteStep="5"
                    :disabledMinutes="disabledMinutesE" format="HH:mm" />
            </template>
            <template slot="week" slot-scope="text, record">
                <a-select
                    :disabled="disabled"
                    placeholder="请选择"
                    showSearch
                    optionFilterProp="children"
                    v-model="record.week"
                    >
                    <a-select-option v-for="val in selectData" :key="val.value" :value="val.value">
                        {{val.label}}
                    </a-select-option>
                </a-select>
            </template>
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
                    <a-button @click="() => onSave(record)" 
                        type="primary" 
                        style="margin-right: 10px;">保存</a-button>
                    <a-popconfirm title="确定删除?" okText="确定" 
                        cancelText="取消" 
                        @confirm="() => onDelete(record)">
                        <a-button type="danger">删除</a-button>
                    </a-popconfirm>
                </div>
            </template>
        </a-table>
    </div>
</template>
<script>
import { findDictList } from "@/api/public"
import { findPageList, insert, update, deleteBuilding } from "@/api/building"
import { safeTaskLoopSave,findPatrolCycle,safeTaskLoopDelete  } from "@/api/patrol/patrol"

import moment from 'moment';
export default {
    components: {
        
    },
    props:["record"],
    data() {
        return {
            dataSource: [],
            count: 1,
            loading: false,
            columns: [
                {
                    title: '开始时间',
                    dataIndex: 'startTime',
                    scopedSlots: { customRender: 'startTime' },
                },
                {
                    title: '结束时间',
                    dataIndex: 'endTime',
                    scopedSlots: { customRender: 'endTime' },
                },
                {
                    title: '重复',
                    dataIndex: 'week',
                    width: 180,
                    scopedSlots: { customRender: 'week' },
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 180,
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            params: {
                page:0,
                size:6,
                taskId:this.record.id
            },
            selectData: [{
                label:'周一',
                value:'1'
            },{
                label:'周二',
                value:'2'
            },{
                label:'周三',
                value:'3'
            },{
                label:'周四',
                value:'4'
            },{
                label:'周五',
                value:'5'
            },{
                label:'周六',
                value:'6'
            },{
                label:'周日',
                value:'7'
            },{
                label:'每天',
                value:'0'
            },],
            disabled: false,
            tempStartTime:'',
            tempEndTime:'',
            disabledMinutesE(){},
            disabledHoursE(){}
        };
    },
    created(){
        this.getDict()
        this.findPageList()
    },
    methods: {
        startTimeChange(date,dateString){
            console.log(date)
            console.log(dateString)
            let dataSource=this.dataSource
            let row=dataSource[dataSource.length-1]
            row.startTime=date
            this.dataSource=dataSource
            this.tempStartTime=dateString
            console.log(this.dataSource)
        },
        endTimeChange(date,dateString){
            let hStart=parseInt(this.tempStartTime.split(':')[0])
            let h=parseInt(dateString.split(':')[0])
            let m=parseInt(this.tempStartTime.split(':')[1])
            if(h==hStart){
                let mList=[]
                for(let i=0;i<m+1;i++){
                    mList.push(i)
                }
                this.disabledMinutesE=function(){
                    return mList
                }
            }else{
                this.disabledMinutesE=function(){
                    return []
                }
            }

            let dataSource=this.dataSource
            let row=dataSource[dataSource.length-1]
            row.endTime=date
            this.dataSource=dataSource
            this.tempEndTime=dateString
            console.log(this.dataSource)
        },
        openChangeE(){
            let h=parseInt(this.tempStartTime.split(':')[0])
            let hList=[]
            for(let i=0;i<h;i++){
                hList.push(i)
            }
            this.disabledHoursE=function(){
                return hList
            }
        },
        openChangeS(){
            let dataSource=this.dataSource
            let row=dataSource[dataSource.length-1]
            row.endTime=null
            this.dataSource=dataSource
            this.disabledMinutesE=function(){
                return []
            }
        },
        moment,
        handleAdd() {
            if(this.dataSource && this.dataSource.filter(s=>!s.id)){
                let row=this.dataSource[this.dataSource.length-1]
                if(row){
                    if(!row.startTime){
                        this.$message.error('请选择开始时间')
                        return
                    }
                    if(!row.endTime){
                        this.$message.error('请选择结束时间')
                        return
                    }
                    if(!row.week){
                        this.$message.error('请选择重复星期')
                        return
                    }
                }
            }
            const { count, dataSource } = this;
            const newData = {
                key: dataSource.length+1,
                startTime:null,
                endTime: null,
                week:null,
                id:null
            };
            this.dataSource = [...dataSource, newData];
            this.count = count + 1;
        },
        onSave(record) {
            console.log(record)
            console.log(this.tempStartTime)
            console.log(this.tempEndTime)
            
            var params={}
            if(record.id){//修改
                params['startTime']=this.tempStartTime?this.tempStartTime:record.startTime._i
                params['endTime']=this.tempEndTime?this.tempEndTime:record.endTime._i
                params['week']=record.week
                params['taskId']=this.record.id
                params['id']=record.id?record.id:null
                console.log(params)
                if(!params.startTime){
                    this.$message.error('请选择开始时间')
                    return
                }
                if(!params.endTime){
                    this.$message.error('请选择结束时间')
                    return
                }
                if(!params.week){
                    this.$message.error('请选择重复星期')
                    return
                }
                
            }else{
                params['startTime']=this.tempStartTime
                params['endTime']=this.tempEndTime
                params['week']=record.week
                params['taskId']=this.record.id
                params['id']=record.id?record.id:null
                console.log(params)
                if(!params.startTime){
                    this.$message.error('请选择开始时间')
                    return
                }
                if(!params.endTime){
                    this.$message.error('请选择结束时间')
                    return
                }
                if(!params.week){
                    this.$message.error('请选择重复星期')
                    return
                }
            }
            if (params.startTime > params.endTime) {
                this.$message.info('起始时间必须小于结束时间')
                return
            }
            safeTaskLoopSave(params).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    this.$message.success('保存成功')
                    this.findPageList()
                }else{
                    this.$message.error('保存失败')
                }
            })
        },
        onDelete(record) {
            console.log(record)
            if(record.id){
                safeTaskLoopDelete({id:record.id}).then(res => {
                    if (res && res.data && res.data.success) {
                        this.$message.success('删除成功')
                        this.findPageList()
                    } else {
                        this.$message.error('删除失败')
                    }
                })
            }else{
                this.dataSource=this.dataSource.filter(s=>s.id)
            }
        },
        getDict () {
        },
        findPageList () {
            this.loading = true;
            findPatrolCycle(this.params).then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.forEach(item => {
                        item.startTime = moment(item.startTime, 'HH:mm')
                        item.endTime = moment(item.endTime, 'HH:mm')
                        // item.endTime = this.moment(new Date())
                        item.key = item.id
                    })
                    this.dataSource = res.data.value;
                }
                this.loading = false;
            })
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
}
</style>