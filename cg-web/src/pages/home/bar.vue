<template>
    <div style="width:100%;height:300px;" id="allchannl"></div>
</template>

<script>
import { allSystemPandect } from '@/api/statistics/home'
export default {
    data(){
        return{
            myCharts:null,
            xData:[],
            alarmData:[],
            unnormalData:[],
            outlineData:[],
            normalData:[]
        }
    },
    created(){
        this.getData()
    },
    mounted(){
        this.initEcharts()
    },
    methods:{
        getData(){
            allSystemPandect().then(res=>{
                console.log(res)
                if(res && res.data && res.data.success && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            this.xData.push(s.systemName)
                            this.alarmData.push(s.alarmCount)
                            this.unnormalData.push(s.faultCount)
                            this.outlineData.push(s.notLinkCount)
                            this.normalData.push(s.normalCount)
                        })
                    }else{
                        this.xData=[]
                    }
                }else{
                    this.xData=[]
                }
                this.initEcharts()
            }).catch(()=>{
                this.initEcharts()
            })
        },
        resize(){
            this.myCharts.resize()
        },
        initEcharts(){
            var that=this
            var channlDome = document.getElementById("allchannl");
            this.myCharts = this.$echarts.init(channlDome);
            var channalOption = {
                title: {
                    show: true,
                    text: "各系统设备实时总览"
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ["报警", "故障","离线",  "正常"],
                    right:0,
                },
                grid: {
                    left: "3%",
                    right: "6%",
                    bottom: "6%",
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data:that.xData,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            interval: 0,
                            rotate: -15
                        },
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "数量：台",
                        minInterval:1,
                        splitLine:{
                            show:true,
                            lineStyle:{
                                type:'dashed'
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "报警",
                        type: "bar",
                        barWidth:12,
                        itemStyle:{
                            normal:{
                                color:'rgb(255,39,39)'
                            }
                        },
                        stack: "报警",
                        color:'#fd3e3c',
                        data:that.alarmData,
                    },
                    {
                        name: "故障",
                        type: "bar",
                        barWidth:12,
                        itemStyle:{
                            normal:{
                                color:'rgb(255,125,39)'
                            }
                        },
                        stack: "故障",
                        color:'#ffbb2a',
                        data:that.unnormalData,
                    },
                    {
                        name: "离线",
                        type: "bar",
                        barWidth:12,
                        itemStyle:{
                            normal:{
                                color:'rgb(212,212,212)'
                            }
                        },
                        stack: "离线",
                        color:'#a6a6a6',
                        data:that.outlineData,
                    },
                    {
                        name: "正常",
                        type: "bar",
                        barWidth:12,
                        itemStyle:{
                            normal:{
                                color:'rgb(39,147,39)'
                            }
                        },
                        stack: "正常",
                        color:'#5cdd00',
                        data:that.normalData,
                    },
                ]
            };
            this.myCharts.setOption(channalOption,true);
        }
    }
}
</script>
