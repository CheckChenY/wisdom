<template>
    <div style="width:100%;height:100%;" id="allchannlBarRes"></div>
</template>

<script>
export default {
    data(){
        return{
            myCurrentScanCharts:null
        }
    },
    mounted(){
        var echartsbar=[]
        var channlDome = document.getElementById("allchannlBarRes");
        this.myCurrentScanCharts = this.$echarts.init(channlDome);
        var channalOption = {
            title: {
                text: '设备实时总览'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top:'30%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['正常', '故障', '报警', '离线',],
                    axisTick: {
                        alignWithLabel: true
                    },
                }
            ],
            yAxis : {
                type: "value",
                name: "数量：台",
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
                    data:[10, 52, 200, 334,],
                    itemStyle:{
                        normal:{  
　　　　　　　　　　　　    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                            color: function (params){
                                var colorList = ['rgb(39,147,39)','rgb(255,125,39)','rgb(255,39,39)','rgb(212,212,212)'];
                                return colorList[params.dataIndex];
                            },
                        },
                    }
                },
            ]
        };
        this.myCurrentScanCharts.setOption(channalOption);
    },
    methods:{
        resize(){
            this.myCurrentScanCharts.resize()
        }
    }
}
</script>
