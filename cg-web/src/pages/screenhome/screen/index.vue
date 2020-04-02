<template>
    <div class="screencontain" style="background-image:url('/img/indexback.jpg')">
        <h1 class="title" style="position: relative;">
            <span style="color:#fff;">智慧消防监管中心</span>
            <i class="icon-ai-out" @click="returnback" style="position: absolute;top:20px;right:20px;color: #fff;transform: scale(1.5);cursor:pointer;"></i>
            <!-- <a-button type="primary" @click="returnback">返&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回</a-button> -->
        </h1>
        <div class="box">
            <div class="left">
                <div class="leftone">
                    <companyEcharts ref="companyEcharts" :orgId="orgId"></companyEcharts>
                </div>
                <div class="lefttwo">
                    <countbarEcharts ref="countbarEcharts" :orgId="orgId"></countbarEcharts>
                </div>
                <div class="leftthree">
                    <evaluation :orgId="orgId"></evaluation>
                </div>
            </div>
            <div class="center">
                <div class="centerone">
                    <monitormap @showVideo="showVideo" :visible="visible"></monitormap>
                </div>
                <div class="centertwo">
                    <alarmtable :companyList="companyList"></alarmtable>
                </div>
            </div>
            <div class="right">
                <div class="leftone">
                    <currentScanEcharts ref="currentscan" :orgId="orgId"></currentScanEcharts>
                </div>
                <div class="lefttwo">
                    <lineEcharts ref="lineEcharts"></lineEcharts>
                </div>
                <div class="leftthree">
                    <dealResEcharts ref="dealres" :orgId="orgId"></dealResEcharts>
                </div>
            </div>
        </div>
        <a-modal
            title="实时视频"
            :visible="visible"
            width="900px"
            @ok="handleOk"
            @cancel="handleCancel"
            >
            <LinkVideo ref="LinkVideo"/>
        </a-modal>
    </div>
</template>

<script>
import currentscan from './currentscan'
import dealres from './dealres'
import lineEcharts from './line'
import companyEcharts from './companyEcharts'
import countbarEcharts from './count'
import evaluation from './evaluation'
import monitormap from './monitormap'
import alarmtable from './table'
import LinkVideo from '@/components/public/LinkVideo'
import { myUser } from '@/api/public'
import { atlasData } from '@/api/statistics/home'

export default {
    components:{
        currentScanEcharts:currentscan,
        dealResEcharts:dealres,
        lineEcharts:lineEcharts,
        companyEcharts:companyEcharts,
        countbarEcharts:countbarEcharts,
        evaluation:evaluation,
        monitormap:monitormap,
        alarmtable:alarmtable,
        LinkVideo:LinkVideo
    },
    data () {
        return {
            visible:false,
            orgId:null,
            companyList:null
        }
    },
    created(){
        myUser().then(res=>{
            if(res && res.data && res.data.success){
                this.orgId=res.data.value.orgId
            }
        })
        atlasData().then(res => {
            if (res && res.data && res.data.success) {
                this.companyList=res.data.value
            }
        })
    },
    mounted(){
        var that=this
        window.onresize=function(){
            if (that.$refs.currentscan) that.$refs.currentscan.resize()
            if (that.$refs.dealres) that.$refs.dealres.resize()
            if (that.$refs.lineEcharts) that.$refs.lineEcharts.resize()
            if (that.$refs.companyEcharts) that.$refs.companyEcharts.resize()
            if (that.$refs.countbarEcharts) that.$refs.countbarEcharts.resize()
        }
    },
    methods:{
        handleOk(){
            this.visible=false
        },
        handleCancel(){
            this.visible=false
        },
        showVideo(item){
            var that=this
            this.visible=true
            this.$nextTick(()=>{
                that.$refs.LinkVideo.getCameraList(item)
            })
        },
        returnback(){
            this.$router.push('/baseinfo')
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
        .left,.right{
            width:25%;
            min-width:300px;
            .leftone{
                height:35%;
            }
            .lefttwo{
                height:35%;
            }
            .leftthree{
                height:30%;
            }
        }
        .center{
            width:50%;
            min-width:600px;
            .centerone{
                height: 70%;
            }
            .centertwo{
                height: 30%;
            }
        }
    }
}
</style>