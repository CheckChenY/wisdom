<template>
    <div style="width:100%;height:100%;" id="countbar"></div>
</template>

<script>
import { allSystemPandect } from '@/api/statistics/home'
export default {
    props:['orgId'],
    data(){
        return{
            myCountCharts:null,
            xData:[],
            alarmData:[],
            unnormalData:[],
            outlineData:[],
            normalData:[]
        }
    },
    watch:{
        orgId(){
            this.getData()
        }
    },
    created(){
        
    },
    mounted(){
        this.initEcharts()
    },
    methods:{
        getData(){
            allSystemPandect({companyId:this.orgId}).then(res=>{
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
        initEcharts(){
            var that=this
            var channlDome = document.getElementById("countbar");
            this.myCountCharts = this.$echarts.init(channlDome);
            let channalOption = {
                title: {
                    text: "各系统设备实时总览",
                    left:'3%',
                    textStyle:{
                        color:'#fff',
                    }
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ["报警", "故障","离线","正常"],
                    right:'3%',
                    top:'10%',
                    icon:'roundRect',
                    textStyle:{
                        color:'#fff',
                    }
                },
                grid: {
                    left: "3%",
                    right: "6%",
                    bottom: "10%",
                    top:'30%',
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
                            rotate: -10,
                            textStyle:{
                                color:'#fff',
                            }
                        },
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "数量：台",
                        nameTextStyle:{
                            color:'#fff',
                        },
                        minInterval:1,
                        splitLine:{
                            show:true,
                            lineStyle:{
                                type:'dashed'
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            rotate: 0,
                            textStyle:{
                                color:'#fff',
                            }
                        },
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
                        color:'#a6a6a6',
                        data:that.normalData,
                    },
                ]
            };
            this.myCountCharts.setOption(channalOption,true);
        },
        resize(){
            this.myCountCharts.resize()
        }
    }
}
</script>
