<template>
    <div style="width:100%;height:100%;padding-top: 20px;" id="osevenalarm"></div>
</template>

<script>
import { weekAlarmCountBySupervise } from '@/api/statistics/home'
export default {
    data(){
        return{
            myLineCharts:null,
            alarmDate:[],
            allCount:[],
            processed:[],
            untreated:[],
            interval: ''
        }
    },
    created(){
        this.initData()
        this.interval = setInterval(() => {
            this.initData()
        },30 * 1000)
    },
    mounted(){
        this.initEcharts()
    },
    methods:{
        initData(){
            weekAlarmCountBySupervise({}).then(res=>{
                if(res && res.data && res.data.success && res.data.value){
                    if(res.data.value.length){
                        this.alarmDate=[]
                        this.allCount=[]
                        this.processed=[]
                        this.untreated=[]
                        res.data.value.forEach(s=>{
                            this.alarmDate.push(s.alarmDate)
                            this.allCount.push(s.allCount.toString())
                            this.processed.push(s.processed.toString())
                            this.untreated.push(s.untreated.toString())
                        })
                    }
                }
                this.initEcharts()
            }).catch(()=>{
                this.initEcharts()
            })
        },
        resize(){
            this.myLineCharts.resize()
        },
        initEcharts(){
            var that=this
            var channlDome = document.getElementById("osevenalarm");
            this.myLineCharts = this.$echarts.init(channlDome);
            var channalOption = {
                title: {
                    text: '近七日警情趋势分析',
                    left:'6%',
                    textStyle:{
                        color:'#fff',
                    },
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['警情','未处理','已处理'],
                    right:'6%',
                    top:'10%',
                    icon:'roundRect',
                    textStyle:{
                        color:'#fff',
                    },
                },
                grid: {
                    left: '6%',
                    right: '16%',
                    bottom: '8%',
                    top: '30%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data:that.alarmDate,
                    axisLabel: {
                        interval: 0,
                        rotate: -10,
                        textStyle:{
                            color:'#fff',
                        }
                    },
                },
                yAxis: {
                    type: "value",
                    name: "数量：次",
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
                        textStyle:{
                            color:'#fff',
                        }
                    },
                },
                series: [
                    {
                        name:'警情',
                        type:'line',
                        itemStyle:{
                            normal:{
                                color:'rgb(255,39,39)'
                            }
                        },
                        stack: '警情',
                        data:that.allCount,
                    },
                    {
                        name:'未处理',
                        type:'line',
                        itemStyle:{
                            normal:{
                                color:'rgb(255,125,39)'
                            }
                        },
                        stack: '未处理',
                        data:that.untreated,
                    },
                    {
                        name:'已处理',
                        type:'line',
                        itemStyle:{
                            normal:{
                                color:'rgb(39,147,39)'
                            }
                        },
                        stack: '已处理',
                        data:that.processed,
                    },
                ]
            };
            this.myLineCharts.setOption(channalOption,true);
        }
    },
    destroyed () {
        clearInterval(this.interval)
    }
}
</script>
