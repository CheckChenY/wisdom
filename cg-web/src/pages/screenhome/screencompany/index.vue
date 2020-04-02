<template>
    <div class="screencontain" style="background-image:url('/img/indexback.jpg');background-size:cover;">
        <h1 class="title" style="position: relative;">
            <span style="color:#fff;">智慧消防监管中心</span>
            <a-button type="primary" style="position: absolute;top:20px;right:50px;width:150px;" @click="returnback">返&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回</a-button>
        </h1>
        <div class="box">
            <div class="left">
                <div class="leftone">
                    <company :orgId="orgId"/>
                </div>
                <div class="lefttwo">
                    <allsystem ref="allsystem" :orgId="orgId"></allsystem>
                </div>
                <div class="leftthree">
                    <p style="font-weight: 900;font-size: 18px;color:#fff;margin:1% 0;">报警信息列表</p>
                    <a-table style="width: 100%;" size="middle" bordered :dataSource="dataSource" :pagination="pagination" :columns="columns">
                        <!-- <template slot="operation">
                            <a-button type="primary">查看</a-button>
                        </template> -->
                    </a-table>
                </div>
            </div>
            <div class="right">
                <div class="rightone">
                    <lineEcharts ref="lineEcharts" :orgId="orgId"></lineEcharts>
                </div>
                <div class="righttwo">
                    <dealres ref="dealres" :orgId="orgId"></dealres>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import lineEcharts from './line'
import dealres from './dealres'
import allsystem from './allsystem'
import company from './company'
import { getAlarmByOrg } from '@/api/warncenter/warnscan'
import { dict } from '@/const/dict'
import { myUser } from '@/api/public'

export default {
    components:{
        lineEcharts,
        dealres,
        allsystem,
        company
    },
    data () {
        return {
            visible:false,
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
                }
                // {
                //     title: '操作',
                //     dataIndex: 'operation',
                //     scopedSlots: { customRender: 'operation' },
                // },
            ],
            pagination:{
                size:'middle',
                onChange: this.onChange,
            },
            params:{
                page:0,
                size:3,
                companyId:null,
            },
            warnTypeList:dict.USESTATE,
            warnLevelList:dict.ALARMLEVEL,
            orgId:null
        }
    },
    watch:{
        orgId(){
            this.initData()
        }
    },
    created(){
        // this.$route.params.companyId
    },
    mounted(){
        var that=this
        that.beaut()
        console.log(that.$route.query.companyId)
        that.orgId=that.$route.query.companyId
        that.params.companyId=that.$route.query.companyId
    },
    methods:{
        beaut(){
            var that=this
            window.onresize=function(){
                if (that.$refs.allsystem) that.$refs.allsystem.resize()
                if (that.$refs.dealres) that.$refs.dealres.resize()
                if (that.$refs.lineEcharts) that.$refs.lineEcharts.resize()
            }
            let trlen=document.getElementsByTagName('th').length
            let emptylen=document.getElementsByClassName('ant-table-placeholder').length
            for(let i=0;i<trlen;i++){
                document.getElementsByTagName('th')[i].style.background='none'
                document.getElementsByTagName('th')[i].style.color='#fff'
            }
            for(let i=0;i<emptylen;i++){
                document.getElementsByClassName('ant-table-placeholder')[i].style.background='none'
                document.getElementsByClassName('ant-table-placeholder')[i].style.color='#fff'
            }
        },
        initData(){
            this.getData()
        },
        onChange(value){
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        },
        getData(){
            getAlarmByOrg(this.params).then(res=>{
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
                    this.render()
                }else{
                    this.dataSource=[]
                }
            })
        },
        onChange(value){
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        },
        returnback(){
            this.$router.go(-1)
        },
        render(){
            setTimeout(()=>{
                let trlen=document.getElementsByTagName('tr').length
                let tdlen=document.getElementsByTagName('td').length
                let emptylen=document.getElementsByClassName('ant-table-placeholder').length
                for(let i=0;i<trlen;i++){
                    document.getElementsByTagName('tr')[i].style.background='none'
                    document.getElementsByTagName('tr')[i].style.color='#fff'
                }
                for(let i=0;i<tdlen;i++){
                    document.getElementsByTagName('td')[i].style.background='none'
                    document.getElementsByTagName('td')[i].style.color='#fff'
                }
                for(let i=0;i<emptylen;i++){
                    document.getElementsByClassName('ant-table-placeholder')[i].style.background='none'
                    document.getElementsByClassName('ant-table-placeholder')[i].style.color='#fff'
                }
                let pagelen=document.getElementsByClassName('ant-pagination-item-ellipsis')
                for(let i=0;i<pagelen;i++){
                    document.getElementsByClassName('ant-pagination-item-ellipsis')[i].style.color='#fff'
                }
            },50)
            for(let i=0;i<9;i++){
                document.getElementsByTagName('th')[i].style.background='none'
                document.getElementsByTagName('th')[i].style.color='#fff'
            }
        }
    }
    
}
</script>
<style lang="scss" scoped>
.screencontain{
    min-width:1200px;
    height: 100%;
    .title{
        text-align: center;
        height:7%;
        display:flex;
        justify-content: center;
        align-items:center;
    }
    .box{
        display: flex;
        height: 93%;
        .left{
            width:65%;
            min-width:780px;
            .leftone{
                height:30%;
            }
            .lefttwo{
                height:30%;
            }
            .leftthree{
                height:40%;
                padding:0 3%;
                overflow: hidden;
            }
        }
        .right{
            width:35%;
            min-width:420px;
            .rightone{
                height: 50%;
            }
            .righttwo{
                height: 50%;
            }
        }
    }
}
</style>