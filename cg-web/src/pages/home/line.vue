<template>
    <div style="width:100%;height:300px;" id="allchannlLine"></div>
</template>

<script>
import { weekAlarmCountBySupervise } from '@/api/statistics/home'
export default {
    data(){
        return{
            myLineCharts:null,
            alarmDate:[],
            allCount:['0'],
            processed:['0'],
            untreated:['0'],
        }
    },
    created(){
        this.initData()
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
                        this.initEcharts()
                    }
                }
                
            })
        },
        resize(){
            this.myLineCharts.resize()
        },
        initEcharts(){
            var that=this
            var channlDome = document.getElementById("allchannlLine");
            this.myLineCharts = this.$echarts.init(channlDome);
            var channalOption = {
                title: {
                    text: '近七日警情趋势分析'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['警情','未处理','已处理'],
                    right:0,
                    top:'10%',
                    icon:'roundRect',
                },
                grid: {
                    left: '3%',
                    right: '6%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data:that.alarmDate
                },
                yAxis: {
                    type: "value",
                    name: "数量：次",
                    minInterval:1,
                    splitLine:{
                        show:true,
                        lineStyle:{
                            type:'dashed'
                        }
                    }
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
                        data:that.allCount
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
                        data:that.untreated
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
                        data:that.processed
                    },
                ]
            };
            this.myLineCharts.setOption(channalOption,true);
        },
    }
}
</script>
