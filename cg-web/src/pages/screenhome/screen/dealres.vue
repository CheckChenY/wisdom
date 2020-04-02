<template>
    <div style="width:100%;height:98%;padding-top:2%;" id="odealres"></div>
</template>

<script>
import { adminAlarmDealResult, } from '@/api/statistics/home'
export default {
    props:['orgId'],
    data(){
        return{
            myDealResCharts:null,
            interval: ''
        }
    },
    created(){
        this.interval = setInterval(() => {
            if (this.orgId) {
                this.getData()
            }
        },30 * 1000)
    },
    mounted(){
        this.initEcharts([0,0,0,0])
    },
    watch:{
        orgId(){
            this.getData()
        },
    },
    methods:{
        getData(){
            adminAlarmDealResult({orgId:this.orgId}).then(res=>{
                if(res && res.data && res.data.success && res.data.value){
                    this.initEcharts([res.data.value.realFireCount,res.data.value.misinformationCount,res.data.value.unNormalCount,res.data.value.testCount,])
                }else{
                    this.initEcharts([0,0,0,0])
                }
            })
        },
        resize(){
            this.myDealResCharts.resize()
        },
        initEcharts(data){
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
                    top: '26%',
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
        },
    },
    destroyed () {
        clearInterval(this.interval)
    }
}
</script>
