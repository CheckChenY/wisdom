<template>
    <div>
        <div style="display:flex">
            <div style="width:50%;">
                <a-row :gutter="12">
                    <a-col :span="24">
                        <span class="label">上报时间：</span>
                        <span>{{currentdata.createTime}}</span>
                    </a-col>
                </a-row>
                <a-row :gutter="12">
                    <a-col :span="24">
                        <span class="label">报警类型：</span>
                        <span>{{currentdata.alarmDetails}}</span>
                    </a-col>
                </a-row>
            </div>
            <div style="width:50%;">
                <a-row :gutter="12">
                    <a-col :span="24">
                        <span class="label">设备状态：</span>
                        <span>{{warnTypeList[currentdata.alarmType]}}</span>
                    </a-col>
                </a-row>
            </div>
        </div>
        <p style="margin:10px;">当前数据</p>
        <div style="display: flex;">
            <div style="width: 50%;padding:0 10%;">
                <a-table size="small" :columns="columns1" :pagination='pagination1' :dataSource="currentdata.nowDates" bordered>
                    <template slot="title">
                        实时数据
                    </template>
                </a-table>
            </div>
            <!-- <div style="width: 50%;padding:0 10%;">
                <a-table size="small" :columns="columns2" :pagination='pagination2' :dataSource="currentdata.thresholdDates" bordered>
                    <template slot="title" slot-scope="currentPageData">
                        阈值数据
                    </template>
                </a-table>
            </div> -->
        </div>
    </div>
</template>
<script>
import { getAlarmDate, } from '@/api/warncenter/warnpublic'
export default {
    props:['warnnum','record'],
    watch:{
        warnnum(){
            if(this.warnnum==2){
                this.getData()
            }
        }
    },
    mounted(){
        this.getData()
    },
    data(){
        return{
            pagination2:{
                size:'middle'
            },
            pagination1:{
                size:'middle'
            },
            columns1:[{
                title: '数据类型',
                dataIndex: 'dataDic',
            },{
                title: '实时数据',
                dataIndex: 'dataS',
            }],
            columns2:[{
                title: '数据类型',
                dataIndex: 'thresholdKey',
            },{
                title: '阈值',
                dataIndex: 'value',
            }],
            data1:[],
            data2:[],
            currentdata:{},
            warnTypeList:{
                '0':'测试',
                '1':'报警',
                '2':'故障',
                '3':'报警&故障',
                '4':'离线',
            },
        }
    },
    methods:{
        getData(){
            getAlarmDate({recordId:this.record.id}).then(res=>{
                if(res && res.data && res.data.success){
                    if(res.data.value.alarmDetails && res.data.value.alarmDetails.length){
                        res.data.value.alarmDetails=res.data.value.alarmDetails.join('')
                    }
                    this.currentdata=res.data.value
                    if(res.data.value.nowDates && res.data.value.nowDates.length){
                        res.data.value.nowDates.forEach(s=>s.key=s.dataDic)
                    }
                    if(res.data.value.thresholdDates && res.data.value.thresholdDates.length){
                        res.data.value.thresholdDates.forEach(s=>s.key=s.thresholdKey)
                    }
                    this.data1=res.data.value.nowDates
                    this.data2=res.data.value.thresholdDates
                }
            })
        },
    }
}
</script>