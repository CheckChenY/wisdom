<template>
    <div style="width: 100%;height: 100%;padding:0 3%;display: flex;">
        <div style="width: 19%;height: 100%;display: flex;justify-content: center;align-items: center;">
            <img :src="company.orgImg" style="width: 100%;max-height: 90%;">
        </div>
        <div style="width:72%;margin-left:3%">
            <p style="height: 20%;color: #fff;display: flex;align-items: center;font-weight: 900;font-size: 16px;">单位名称：{{company.orgName}}</p>
            <div style="height: 11%;display: flex;">
                <p style="width: 33%;color: #fff;">统一社会信用代码：{{company.orgCode}}</p>
                <p style="width: 33%;color: #fff;">法人/负责人：{{company.legalPerson}}</p>
                <p style="width: 33%;color: #fff;">设备总数量：{{deviceData.allCount}}台</p>
            </div>
            <div style="height: 11%;display: flex;">
                <p style="width: 33%;color: #fff;">单位类型：{{company.orgType}}</p>
                <p style="width: 33%;color: #fff;">法人电话：{{company.legalPersonPhone}}</p>
                <p style="width: 33%;color: #fff;">消防设备数量：{{deviceData.deviceCount}}台</p>
            </div>
            <div style="height: 11%;display: flex;">
                <p style="width: 33%;color: #fff;">所在地区：{{company.regionId}}</p>
                <p style="width: 33%;color: #fff;">联系人：{{company.userName}}</p>
                <p style="width: 33%;color: #fff;">视频设备数量：{{deviceData.cameraCount}}台</p>
            </div>
            <div style="height: 11%;display: flex;">
                <p style="width: 33%;color: #fff;">单位地址：{{company.address}}</p>
                <p style="width: 33%;color: #fff;">联系电话：{{company.phone}}</p>
                <p style="width: 33%;color: #fff;">离线设备数量：{{deviceData.notLinkCount}}台</p>
            </div>
            <div style="height: 36%;display: flex;">
                <div style="width: 33%;display: flex;flex-direction: column;justify-content:center;">
                    <p style="width:50px;height:50px;border-radius:25px;background:rgb(39,147,39);display: flex;justify-content: center;align-items: center;">
                        <a-icon type="check" style="font-size: 20px;color:#fff;"></a-icon>
                    </p>
                    <p style="color: #fff;">正常设备：{{deviceData.normalDeviceCount}}台</p>
                </div>
                <div style="width: 33%;display: flex;flex-direction: column;justify-content:center;">
                    <p style="width:50px;height:50px;border-radius:25px;background:rgb(255,125,39);display: flex;justify-content: center;align-items: center;">
                        <i class="icon-faults-statistics" style="font-size: 20px;color:#fff;margin-left:10px;"></i>
                    </p>
                    <p style="color: #fff;">异常设备：{{deviceData.abnormalDeviceCount}}台</p>
                </div>
                <div style="width: 33%;display: flex;flex-direction: column;justify-content:center;">
                    <p style="width:50px;height:50px;border-radius:25px;background:rgb(255,39,39);display: flex;justify-content: center;align-items: center;">
                        <i class="icon-baojing" style="font-size: 20px;color:#fff;margin-left:10px;"></i>
                    </p>
                    <p style="color: #fff;">未处理警情：{{deviceData.untreatedAlarmCount}}次</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { orgDeviceStatistics,getOrgDetail } from '@/api/statistics/home'
import { findProvince } from '@/api/public'
export default {
    props:["orgId"],
    data(){
        return{
            myCountCharts:null,
            deviceData:{},
            company:{},
            orgTypeList:[{
                label:'社会单位',
                value:'1'
            },{
                label:'监管单位',
                value:'2'
            },{
                label:'总公司',
                value:'3'
            },{
                label:'代理商',
                value:'4'
            }],
        }
    },
    watch:{
        orgId(){
            this.getData()
        }
    },
    created(){
        
    },
    methods:{
        getData(){
            orgDeviceStatistics({companyId:this.orgId}).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    this.deviceData=res.data.value
                }
            }),
            getOrgDetail({type:2,orgId:this.orgId}).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    findProvince({regionId:res.data.value.company.regionId}).then(o=>{
                        console.log(o)
                        res.data.value.company.regionId=o.data.value[0].province+''+o.data.value[0].city+''+o.data.value[0].county
                    })
                    res.data.value.company.orgType=this.orgTypeList.filter(s=>s.value==res.data.value.company.orgType)[0].label
                    res.data.value.company.orgImg=this.$imgUrl+res.data.value.company.orgImg
                    this.company=res.data.value.company
                }
            })
        }
    }
}
</script>