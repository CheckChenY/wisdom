<template>
    <div style="width:100%;height:95%;padding-top:5%;" id="countbar"></div>
</template>

<script>
import { getCompanyTypeDistribution } from '@/api/statistics/home'
export default {
    props:["orgId"],
    data(){
        return{
            myCountCharts:null,
            count:[],
            normal:[],
            unnormal:[],
            interval: ''
        }
    },
    mounted(){
        this.initEcharts()
    },
    created () {
        this.interval = setInterval(() => {
            if (this.orgId) {
                this.initData()
            }
        },30 * 1000)
    },
    watch:{
        orgId(){
            this.initData()
        }
    },
    methods:{
        initData(){
            getCompanyTypeDistribution({orgId:this.orgId}).then(res=>{
                if(res && res.data && res.data.success && res.data.value){
                    this.count=[res.data.value.societyAll,res.data.value.manageAll,res.data.value.parentCompanyAll,res.data.value.agentAll]
                    this.normal=[res.data.value.societyNormal,res.data.value.manageNormal,res.data.value.parentCompanyNormal,res.data.value.agentNormal]
                    this.unnormal=[res.data.value.societyUnNormal,res.data.value.manageUnNormal,res.data.value.parentCompanyUnNormal,res.data.value.agentUnNormal]
                }else{
                    this.count=[]
                    this.normal=[]
                    this.unnormal=[]
                }
                this.initEcharts()
            })
        },
        initEcharts(){
            var that=this
            var echartsbar=[]
            var channlDome = document.getElementById("countbar");
            this.myCountCharts = this.$echarts.init(channlDome);
            let channalOption = {
                title: {
                    text: "单位数量统计",
                    left:'6%',
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
                    data: ["总数量", "启用单位","禁用单位"],
                    right:'6%',
                    top:'10%',
                    icon:'roundRect',
                    textStyle:{
                        color:'#fff',
                    }
                },
                grid: {
                    left: "6%",
                    right: "6%",
                    bottom: "0",
                    top:'30%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: "category",
                        data:['社会单位','监管单位','总公司','代理商'],
                        axisTick: {
                            alignWithLabel: true
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
                yAxis: [
                    {
                        type: "value",
                        name: "数量：个",
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
                        name: "总数量",
                        type: "bar",
                        barWidth:12,
                        itemStyle:{
                            normal:{
                                color:'rgb(39,147,39)'
                            }
                        },
                        stack: "总数量",
                        color:'#fd3e3c',
                        data:that.count,
                    },
                    {
                        name: "启用单位",
                        type: "bar",
                        barWidth:12,
                        itemStyle:{
                            normal:{
                                color:'rgb(255,125,39)'
                            }
                        },
                        stack: "启用单位",
                        color:'#ffbb2a',
                        data:that.normal,
                    },
                    {
                        name: "禁用单位",
                        type: "bar",
                        barWidth:12,
                        itemStyle:{
                            normal:{
                                color:'rgb(212,212,212)'
                            }
                        },
                        stack: "禁用单位",
                        color:'#a6a6a6',
                        data:that.unnormal,
                    },
                ]
            };
            this.myCountCharts.setOption(channalOption,true);
        },
        resize(){
            this.myCountCharts.resize()
        }
    },
    destroyed () {
        clearInterval(this.interval)
    }
}
</script>
