<template>
    <div class="screencontain">
        <h1 class="title">
            <span>智慧消防监管中心</span>
        </h1>
        <div class="box">
            <div class="left">
                <div class="leftone">
                    单位类型分布
                </div>
                <div class="lefttwo">
                    单位数量统计
                </div>
                <div class="leftthree">
                    单位测评
                </div>
            </div>
            <div class="center">
                <div class="centerone">
                    地图
                </div>
                <div class="centertwo">
                    表格
                </div>
            </div>
            <div class="right">
                <div class="leftone">
                    <currentScanEcharts ref="currentscan"></currentScanEcharts>
                </div>
                <div class="lefttwo">
                    <lineEcharts ref="lineEcharts"></lineEcharts>
                </div>
                <div class="leftthree">
                    <dealResEcharts ref="dealres"></dealResEcharts>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import currentscan from './currentscan'
import dealres from './dealres'
import lineEcharts from './line'
export default {
    components:{
        currentScanEcharts:currentscan,
        dealResEcharts:dealres,
        lineEcharts:lineEcharts
    },
    data () {
        return {
            
        }
    },
    created(){
        
    },
    mounted(){
        var that=this
        window.onresize=function(){
            if (that.$refs.currentscan) that.$refs.currentscan.resize()
            if (that.$refs.dealres) that.$refs.dealres.resize()
            if (that.$refs.lineEcharts) that.$refs.lineEcharts.resize()
        }
    },
    methods:{
        
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
                height:30%;
                border: 1px red solid;
            }
            .lefttwo{
                height:30%;
                border: 1px yellow solid;
            }
            .leftthree{
                height:40%;
                border: 1px green solid;
            }
        }
        .center{
            width:50%;
            min-width:600px;
            .centerone{
                height: 60%;
                border: 1px pink solid;
            }
            .centertwo{
                height: 40%;
                border: 1px black solid;
            }
        }
    }
}
</style>