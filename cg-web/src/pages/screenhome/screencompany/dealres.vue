<template>
    <div style="width:100%;height:95%;padding-top:5%;" id="odealres"></div>
</template>

<script>
import { adminAlarmDealResult } from '@/api/statistics/home'
export default {
    props:["orgId"],
    data(){
        return{
            myDealResCharts:null
        }
    },
    watch:{
        orgId(){
            this.initData()
        }
    },
    created(){
        
    },
    mounted(){
        this.initEcharts[0,0,0,0]
    },
    methods:{
        resize(){
            this.myDealResCharts.resize()
        },
        initData(){
            adminAlarmDealResult({orgId:this.orgId}).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    var dealData=res.data.value
                    this.initEcharts([dealData.realFireCount, dealData.misinformationCount, dealData.unNormalCount, dealData.testCount,])
                }else{
                    this.initEcharts[0,0,0,0]
                }
            })
        },
        initEcharts(data){
            var that=this
            var channlDome = document.getElementById("odealres");
            this.myDealResCharts = this.$echarts.init(channlDome);
            var channalOption = {
                color: ['#3398DB'],
                title: {
                    text: '报警处理结果分析',
                    left:'6%',
                    textStyle:{
                        color:'#fff',
                    },
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '6%',
                    right: '4%',
                    bottom: '3%',
                    top: '25%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['真实火警', '异常', '误报', '测试',],
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
                yAxis : {
                    type: "value",
                    name: "数量：次",
                    nameTextStyle:{
                        color:'#fff',
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 0,
                        textStyle:{
                            color:'#fff',
                        }
                    },
                    minInterval:1,
                    splitLine:{
                        show:true,
                        lineStyle:{
                            type:'dashed'
                        }
                    }
                },
                series : [
                    {
                        name:'处理结果',
                        type:'bar',
                        barWidth: '30%',
                        data:data
                    }
                ]
            };
            this.myDealResCharts.setOption(channalOption,true);
        }
    }
}
</script>
