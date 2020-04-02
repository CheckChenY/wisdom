<template>
    <div>
        <div style="display: flex;justify-content: space-around;">
            <div style="width:60%;min-width:600px;display: flex;justify-content: space-around;align-items: center;">
                <div v-for="(item, i) in devicecount" :key="i" style="width: 14%;min-width:100px;height:100px;display: flex;flex-direction: column;border:1px #ebeef5 solid;padding-top:20px;cursor: pointer;">
                    <div style="display: flex;justify-content: center;">{{item.label}}</div>
                    <div style="display: flex;justify-content: center;font-weight: 900;font-size: 18px;">{{item.value}}台</div>
                </div>
            </div>
            <div style="width:35%;min-width:360px;display: flex;justify-content: space-around;">
                <div style="width:120px;height:120px;border-radius:60px;border:1px #ebeef5 solid;cursor: pointer;">
                    <p style="text-align: center;margin-top:30px;">单位安全评分</p>
                    <p style="text-align: center;margin-top:-10px;"><span style="font-size: 20px;font-weight: 900;">{{deviceData.code}}</span>分</p>
                </div>
                <div style="min-width:120px;width:30%;">
                    <div style="height:58px;cursor: pointer;border-radius: 6px;display: flex;flex-direction: column;align-items: center;justify-content:space-around;border:1px #ebeef5 solid;">
                        <p style="line-height: 1;margin-top:5px;">当前异常设备</p>
                        <p style="line-height: 1;margin-top:-10px;"><span style="font-size: 18px;font-weight: 900;">{{deviceData.unNormalDevice}}</span>台</p>
                    </div>
                    <div style="height:58px;cursor: pointer;border-radius: 6px;margin-top:4px;display: flex;flex-direction: column;align-items: center;justify-content: center;justify-content:space-around;border:1px #ebeef5 solid;">
                        <p style="line-height: 1;margin-top:5px;">已处理警情</p>
                        <p style="line-height: 1;margin-top:-10px;"><span style="font-size: 18px;font-weight: 900;">{{deviceData.unDelAlarm}}</span>次</p>
                    </div>
                </div>
                <div style="min-width:120px;width:30%;border-radius: 6px;">
                    <div style="height:58px;cursor: pointer;border-radius: 4px;display: flex;flex-direction: column;align-items: center;justify-content:space-around;border:1px #ebeef5 solid;">
                        <p style="line-height: 1;margin-top:5px;">今日警情数量</p>
                        <p style="line-height: 1;margin-top:-10px;"><span style="font-size: 18px;font-weight: 900;">{{deviceData.alarmCount}}</span>次</p>
                    </div>
                    <div style="height:58px;cursor: pointer;border-radius: 6px;margin-top:4px;display: flex;flex-direction: column;align-items: center;justify-content: center;justify-content:space-around;border:1px #ebeef5 solid;">
                        <p style="line-height: 1;margin-top:5px;">未处理警情</p>
                        <p style="line-height: 1;margin-top:-10px;"><span style="font-size: 18px;font-weight: 900;">{{deviceData.delAlarm}}</span>次</p>
                    </div>
                </div>
            </div>
        </div>
        <div style="display: flex;justify-content: space-around;margin-top:30px;">
            <div style="width:60%;min-width:600px;display: flex;justify-content: space-around;">
                <barEcharts ref="bar"></barEcharts>
            </div>
            <div style="width:35%;min-width:360px;display: flex;justify-content: space-around;">
                <lineEcharts ref="line"></lineEcharts>
            </div>
        </div>
        <div style="display: flex;justify-content: space-around;margin-top:30px;">
            <div style="width:60%;min-width:600px;">
                <p style="font-weight: 900;font-size: 18px;color:rgb(51,51,51);">报警信息列表</p>
                <a-table style="width: 100%;" :loading="tableLoading" size="middle" bordered :dataSource="dataSource" :pagination="pagination" :columns="columns">
                    <template slot="operation">
                        <a-button type="primary" @click="handleDeal">去处理</a-button>
                    </template>
                </a-table>
            </div>
            <div style="width:35%;min-width:360px;display: flex;justify-content: space-around;">
                <barResEcharts ref="lineRes" :orgId="orgId"></barResEcharts>
            </div>
        </div>
    </div>
</template>

<script>
import bar from './bar'
import line from './line'
import barRes from './barRes'
import { getAlarmByOrg } from '@/api/warncenter/warnscan'
import { companyBasics } from '@/api/statistics/home'
import { dict } from '@/const/dict'
import { myUser } from '@/api/public'
export default {
    components:{
        barEcharts:bar,
        lineEcharts:line,
        barResEcharts:barRes
    },
    data(){
        return{
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
            dataSource:[],
            columns: [
                {
                    title: '报警时间',
                    dataIndex: 'createTime',
                },
                {
                    title: '设备名称',
                    dataIndex: 'deviceName',
                },
                {
                    title: '设备类型',
                    dataIndex: 'deviceType',
                },
                {
                    title: '所属建筑',
                    dataIndex: 'building',
                },
                {
                    title: '楼层/区域',
                    dataIndex: 'floor',
                },
                {
                    title: '安装位置',
                    dataIndex: 'location',
                },
                {
                    title: '警情类型',
                    dataIndex: 'alarmDetails',
                },
                {
                    title: '警情程度',
                    dataIndex: 'alarmLevel',
                },{
                    title: '报警次数',
                    dataIndex: 'alarmTimes',
                },{
                    title: '操作',
                    dataIndex: 'operation',
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            pagination:{
                size:'middle',
                onChange: this.onChange,
            },
            tableLoading:false,
            params:{
                page:0,
                size:3,
            },
            warnTypeList:dict.USESTATE,
            warnLevelList:dict.ALARMLEVEL,
            orgId:'',
            deviceData:{}
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
                this.orgId=res.data.value.orgId
            }
        })
    },
    mounted(){
        var that=this
        window.onresize=function(){
            if (that.$refs.bar) that.$refs.bar.resize()
            if (that.$refs.line) that.$refs.line.resize()
            if (that.$refs.lineRes) that.$refs.lineRes.resize()
        }
    },
    methods:{
        onChange(value){
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        },
        initData(){
            this.getData()
            this.getOrder()
        },
        getOrder(){
            companyBasics({orgId:this.orgId}).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    this.deviceData=res.data.value
                    this.deviceData.code=this.deviceData.code === '00'?0:this.deviceData.code
                    this.devicecount[0].value=res.data.value.allDeviceSize
                    this.devicecount[1].value=res.data.value.fireDevice
                    this.devicecount[2].value=res.data.value.cameraSize
                    this.devicecount[3].value=res.data.value.expire
                    this.devicecount[4].value=res.data.value.unExpire
                    this.devicecount[5].value=res.data.value.soonExpire
                }
            })
        },
        getData(){
            this.tableLoading=true
            getAlarmByOrg(this.params).then(res=>{
                this.tableLoading=false
                if(res && res.data && res.data.success){
                    console.log(res)
                    if(res.data.value.content.length){
                        res.data.value.content.forEach((s,index)=>{
                            s.key=index
                            if(s.alarmDetails){
                                if( s.alarmDetails.length>1){
                                    s.alarmDetails=s.alarmDetails[0]
                                }else{
                                    s.alarmDetails=s.alarmDetails.length?s.alarmDetails[0]:null
                                }
                            }
                            this.warnTypeList.forEach(t=>{
                                if(s.alarmType==t.value){
                                    s.alarmType=t.label
                                }
                            })
                            this.warnLevelList.forEach(t=>{
                                if(s.alarmLevel==t.value){
                                    s.alarmLevel=t.label
                                }
                            })
                        })
                    }else{
                        this.dataSource=[] 
                    }
                    this.dataSource=res.data.value.content
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    pagination.pageSize=res.data.value.size
                    this.pagination = pagination;
                }else{
                    this.dataSource=[]
                }
            })
        },
        handleDeal () {
            this.$router.push('/warnscan')
        }
    }
}
</script>
<style lang="scss" scoped>
    
</style>
