<template>
    <div style="width:100%;height:100%;" id="allchannlBarRes"></div>
</template>

<script>
import { getDeviceRealTimePandect } from '@/api/statistics/home'
export default {
    props:["orgId"],
    data(){
        return{
            myCurrentScanCharts:null,
            alarmCount:0,
            normalCount:0,
            notLinkCount:0,
            troubleCount:0,
            testCount:0,
            interval: '',
        }
    },
    created(){
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
    mounted(){
        this.initEcharts()
    },
    methods:{
        resize(){
            this.myCurrentScanCharts.resize()
        },
        initData(){
            getDeviceRealTimePandect({companyId:this.orgId}).then(res=>{
                if(res && res.data && res.data.success){
                    this.alarmCount=res.data.value.alarmCount
                    this.normalCount=res.data.value.normalCount
                    this.notLinkCount=res.data.value.notLinkCount
                    this.troubleCount=res.data.value.troubleCount
                    this.testCount=res.data.value.testCount
                }
                this.initEcharts()
            })
        },
        initEcharts(){
            var that=this
            var channlDome = document.getElementById("allchannlBarRes");
            this.myCurrentScanCharts = this.$echarts.init(channlDome);
            var channalOption = {
                title: {
                    text: '设备实时总览',
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
                    right: '6%',
                    bottom: '3%',
                    top:'30%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['正常', '故障', '报警', '离线','测试报警'],
                        axisTick: {
                            alignWithLabel: true,
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
                    name: "数量：台",
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
                        name:'实时数据',
                        type:'bar',
                        barWidth: '20%',
                        data:[that.normalCount, that.troubleCount, that.alarmCount, that.notLinkCount, that.testCount,],
                        itemStyle:{
                            normal:{  
                                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                color: function (params){
                                    var colorList = ['rgb(39,147,39)','rgb(255,125,39)','rgb(255,39,39)','rgb(212,212,212)','rgb(51,152,219)'];
                                    return colorList[params.dataIndex];
                                },
                            },
                        },
                    },
                ]
            };
            this.myCurrentScanCharts.setOption(channalOption,true);
        }
    },
    destroyed () {
        clearInterval(this.interval)
    }
}
</script>
