<template>
    <div>
        <a-row>
            <a-col :span="12">
                <a-layout>
                    <a-layout-header>基本概况</a-layout-header>
                    <a-layout-content>
                        <div class="content_left" style="height:300px">
                            <a-row>
                                <a-col style="height:150px;padding:30px" :span="8" v-for="(item, i) in devicecount" :key="i" >
                                <!-- style="width: 14%;min-width:100px;height:100px;display: flex;flex-direction: column;border:1px #ebeef5 solid;padding-top:20px;cursor: pointer;"> -->
                                    <div style="display: flex;justify-content: center;">{{item.label}}</div>
                                    <div style="display: flex;justify-content: center;font-weight: 900;font-size: 18px;">{{item.value}}台</div>
                                </a-col>
                            </a-row>
                        </div>
                    </a-layout-content>
                </a-layout>
            </a-col>
            <a-col :span="12">
                <a-layout>
                    <a-layout-header>今日警情</a-layout-header>
                    <a-layout-content>
                        <div class="content_left" style="height:300px">
                            <div style="display: flex;justify-content: space-around;height:300px">
                                <div style="width:150px;height:150px;border-radius:100px;border:1px #ebeef5 solid;
                                cursor: pointer;margin-top:75px;padding-top:20px">
                                    <p style="text-align: center;margin-top:30px;">单位安全评分</p>
                                    <p style="text-align: center;margin-top:-10px;">
                                        <span style="font-size: 20px;font-weight: 900;">{{deviceData.code}}</span>分
                                    </p>
                                </div>
                                <div style="min-width:120px;width:30%;">
                                    <div style="height:145px;cursor: pointer;border-radius: 6px;display: flex;flex-direction: column;align-items: center;justify-content:space-around;border:1px #ebeef5 solid;">
                                        <p style="line-height: 1;">当前异常设备</p>
                                        <p style="line-height: 1;">
                                            <span style="font-size: 18px;font-weight: 900;">{{deviceData.unNormalDevice}}</span>台
                                        </p>
                                    </div>
                                    <div style="height:145px;cursor: pointer;border-radius: 6px;margin-top:4px;display: flex;flex-direction: column;align-items: center;justify-content: center;justify-content:space-around;border:1px #ebeef5 solid;">
                                        <p style="line-height: 1;margin-top:5px;">已处理警情</p>
                                        <p style="line-height: 1;margin-top:-10px;"><span style="font-size: 18px;font-weight: 900;">{{deviceData.unDelAlarm}}</span>次</p>
                                    </div>
                                </div>
                                <div style="min-width:120px;width:30%;border-radius: 6px;">
                                    <div style="height:145px;cursor: pointer;border-radius: 4px;display: flex;flex-direction: column;align-items: center;justify-content:space-around;border:1px #ebeef5 solid;">
                                        <p style="line-height: 1;margin-top:5px;">今日警情数量</p>
                                        <p style="line-height: 1;margin-top:-10px;"><span style="font-size: 18px;font-weight: 900;">{{deviceData.alarmCount}}</span>次</p>
                                    </div>
                                    <div style="height:145px;cursor: pointer;border-radius: 6px;margin-top:4px;display: flex;flex-direction: column;align-items: center;justify-content: center;justify-content:space-around;border:1px #ebeef5 solid;">
                                        <p style="line-height: 1;margin-top:5px;">未处理警情</p>
                                        <p style="line-height: 1;margin-top:-10px;"><span style="font-size: 18px;font-weight: 900;">{{deviceData.delAlarm}}</span>次</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a-layout-content>
                </a-layout>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { myUser } from '@/api/public'
import { companyBasics } from '@/api/statistics/home'
export default {
    name:'workBaseInfo',
    data(){
        return{
            orgId:'',
            deviceData:{},
            devicecount:[{
                label:'设备总数量',
                value:500
            },{
                label:'消防设备数量',
                value:500
            },{
                label:'视频设备数量',
                value:500
            },{
                label:'到期设备数量',
                value:500
            },{
                label:'未到期数量',
                value:500
            },{
                label:'即将到期数量',
                value:500
            }],
        }
    },
    watch:{
        orgId(){
            var that=this
            that.initData()
        }
    },
    created(){
        myUser().then(res=>{
            if(res && res.data && res.data.success){
                console.log(res.data)
                this.orgId=res.data.value.orgId
            }
        })
    },
    mounted(){
    },
    methods:{
        initData(){
            this.getOrder()
        },
        getOrder(){
            // debugger;
            companyBasics({orgId:this.orgId}).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    let list = res.data.value;
                    this.deviceData=list
                    this.deviceData.code=this.deviceData.code === '00' ? 0 : this.deviceData.code

                    this.devicecount[0].value=res.data.value.allDeviceSize
                    this.devicecount[1].value=res.data.value.fireDevice
                    this.devicecount[2].value=res.data.value.cameraSize
                    this.devicecount[3].value=res.data.value.expire
                    this.devicecount[4].value=res.data.value.unExpire
                    this.devicecount[5].value=res.data.value.soonExpire

                    console.log(this.devicecount);
                }
            })
        },
    }
}
</script>
<style lang="scss">
    .content_left{
        border:1px #ebeef5 solid;
        background-color: #ffffff;
        margin: 10px;
        padding: 2px;
    }
</style>