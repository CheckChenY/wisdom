<template>
    <div style="padding:0 20px;">
        <a-steps direction="vertical" size="small" :current="current">
            <a-step :title="warndata.createTime" :description="description1"/>
            <a-step :title="dealdata.firstViewTime" :description="description2"/>
            <a-step :title="dealdata.dealTime" :description="description3"/>
        </a-steps>
        <div style="display: flex;padding-left:40px;margin-top:-10px;">
            <p style="color: rgba(0,0,0,.45);">处理结果图：</p>
            <div style="padding: 3px;">
                <img :src="dealdata.warnDealResultPhoto" v-if="dealdata.warnDealResultPhoto" style="max-width:250px;max-height:100px;"/>
            </div>
        </div>
    </div>
</template>
<script>
import { findDetailById,findByRecordId } from '@/api/warncenter/warnpublic'
export default {
    props:['warnnum','record'],
    watch:{
        warnnum(){
            if(this.warnnum==3){
                this.getData()
            }
        }
    },
    data(){
        return{
            current:3,
            warndata:{},
            dealdata:{},
            description1:'',
            description2:'',
            description3:'',
            warnConfirmList:{
                '1':'真实火警',
                '2':'异常',
                '3':'误报',
                '4':'测试',
            },
        }
    },
    created(){
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            findDetailById({param:this.record.id}).then(res=>{
                if(res && res.data && res.data.success){
                    this.warndata=res.data.value
                    this.description1=`${res.data.value.deviceType}，位置：${res.data.value.location} ${res.data.value.deviceName}，报警类型：${res.data.value.alarmDetails.join('')}，警情程度：${res.data.value.alarmLevel}`
                }
            })
            findByRecordId({recordId:this.record.id}).then(res=>{
                if(res && res.data && res.data.success){
                    this.dealdata=res.data.value
                    this.dealdata.warnDealResultPhoto = this.$imgUrl + this.dealdata.warnDealResultPhoto
                    this.description2=`用户：${res.data.value.firstViewerName}，查看警情消息`
                    this.description3=`用户：${res.data.value.warnHandlerName}，警情处理为：${this.warnConfirmList[res.data.value.warnConfirmType]}，警情说明为：${res.data.value.warnDealDes}`
                }
            })
        }
    }
}
</script>