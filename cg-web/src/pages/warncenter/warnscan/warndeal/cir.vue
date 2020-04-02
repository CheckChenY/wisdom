<template>
    <div id="cir" style="width:100%;height:100%;"></div>
</template>
<script> 
const echarts = require('echarts');
export default {
    data () {
        return {
            myChart:null,
            xAxisData:[],
            noDealCountList:[],
            dealCountList:[],
            abnormalCountList:[]
        }
    },
    props:["cirData"],
    watch:{
        cirData(){
            this.initData()
        }
    },
    components:{
        
    },
    created(){

    },
    mounted(){
        this.initData()
    },
    methods:{
        renderEcharts(){
            var that=this
            this.myChart = echarts.init(document.getElementById('cir'));
            var option = {
                    title: {
                    text: '警情类型折线图',
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid:{
                    top:'35%',
                    bottom:'10%',
                    right:'10%',
                    left:'10%',
                },
                legend: {
                    data:['警情','未处理','已处理'],
                    top:10,
                    right:'10%'
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xAxisData
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} '
                    }
                },
                series: [
                    {
                        name:'警情',
                        type:'line',
                        data:this.abnormalCountList,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                            ]
                        },
                        markLine: {
                            data: [
                                // {type: 'average', name: '平均值'},
                                [{
                                    symbol: 'none',
                                    x: '80%',
                                    yAxis: 'max'
                                }, {
                                    symbol: 'circle',
                                    label: {
                                        normal: {
                                            position: 'start',
                                            formatter: '最大值'
                                        }
                                    },
                                    type: 'max',
                                    name: '最高点'
                                }]
                            ]
                        }
                    },
                    {
                        name:'未处理',
                        type:'line',
                        data:this.noDealCountList,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                            ]
                        },
                        markLine: {
                            data: [
                                // {type: 'average', name: '平均值'},
                                [{
                                    symbol: 'none',
                                    x: '80%',
                                    yAxis: 'max'
                                }, {
                                    symbol: 'circle',
                                    label: {
                                        normal: {
                                            position: 'start',
                                            formatter: '最大值'
                                        }
                                    },
                                    type: 'max',
                                    name: '最高点'
                                }]
                            ]
                        }
                    },
                    {
                        name:'已处理',
                        type:'line',
                        data:this.dealCountList,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                            ]
                        },
                        markLine: {
                            data: [
                                // {type: 'average', name: '平均值'},
                                [{
                                    symbol: 'none',
                                    x: '80%',
                                    yAxis: 'max'
                                }, {
                                    symbol: 'circle',
                                    label: {
                                        normal: {
                                            position: 'start',
                                            formatter: '最大值'
                                        }
                                    },
                                    type: 'max',
                                    name: '最高点'
                                }]
                            ]
                        }
                    }
                ]
            }
            this.myChart.setOption(option);
        },
        initData(){
            this.xAxisData=[]
            this.dealCountList=[]
            this.noDealCountList=[]
            this.abnormalCountList=[]
            this.cirData.forEach(s=>{
                this.xAxisData.push(s.alarmDate)
                this.abnormalCountList.push(s.allCount.toString())
                this.dealCountList.push(s.processed.toString())
                this.noDealCountList.push(s.untreated.toString())
            })
            
            this.renderEcharts()
        },
        resize(){
            // this.myChart.resize();
        },
    }
}
</script>
