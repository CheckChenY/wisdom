<template>
    <div style="display:flex">
        <div style="width:50%;">
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">上报时间：</span>
                    <span>{{warndata.createTime}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">设备ID/标识码：</span>
                    <span>{{warndata.deviceId}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">设备名称：</span>
                    <span>{{warndata.deviceName}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">所属系统：</span>
                    <span>{{warndata.system}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">设备类型：</span>
                    <span>{{warndata.deviceType}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">设备型号：</span>
                    <span>{{warndata.deviceModel}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">所在建筑：</span>
                    <span>{{warndata.building}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">楼层/区域：</span>
                    <span>{{warndata.floor}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">安装位置：</span>
                    <span>{{warndata.location}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24" style="display: flex;align-items: flex-start;">
                    <span class="label">现场视频截图：</span>
                    <img :src="warndata.alarmPhoto" style="height:100px;"/>
                </a-col>
            </a-row>
        </div>
        <div style="width:50%;">
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">设备状态：</span>
                    <span>{{warndata.alarmType}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">报警类型：</span>
                    <span>{{warndata.alarmDetails}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">警情程度：</span>
                    <span>{{warndata.alarmLevel}}</span>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
import { addFile } from '@/api/public'
import { findDetailById } from '@/api/warncenter/warnpublic'
import { dict } from '@/const/dict'
export default {
    props:['warnnum','visible','record',],
    watch:{
        warnnum(){
            if(this.warnnum==1){
                this.getData()
            }
        },
        visible(){
            if(this.visible){
                this.getData()
            }
        },
    },
    mounted(){
        this.getData()
    },
    data(){
        return{
            warndata:{},
        }
    },
    methods:{
        getData(){
            findDetailById({param:this.record.id}).then(res=>{
                if(res && res.data && res.data.success){
                    let data = res.data.value
                    if(data.alarmDetails && data.alarmDetails.length){
                        data.alarmDetails=data.alarmDetails.join('')
                    }
                    let warnType = dict.USESTATE.filter(item => item.value == data.alarmType)
                    if (warnType.length > 0) {
                        data.alarmType = warnType[0].label
                    }
                    let warnLevel = dict.ALARMLEVEL.filter(item => item.value == data.alarmLevel)
                    if (warnLevel.length > 0) {
                        data.alarmLevel = warnLevel[0].label
                    }
                    this.warndata=data
                }
            })
        },
    }
}
</script>
<style>
.label{
    display: inline-block;
    width:120px;
    text-align: right;
    margin-bottom:10px;
}
</style>