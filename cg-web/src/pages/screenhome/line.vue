<template>
    <div style="width:100%;height:100%;" id="osevenalarm"></div>
</template>

<script>
export default {
    data(){
        return{
            myLineCharts:null
        }
    },
    mounted(){
        var echartsbar=[]
        var channlDome = document.getElementById("osevenalarm");
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
                top: '30%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
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
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'未处理',
                    type:'line',
                    itemStyle:{
                        normal:{
                            color:'rgb(255,125,39)'
                        }
                    },
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'已处理',
                    type:'line',
                    itemStyle:{
                        normal:{
                            color:'rgb(39,147,39)'
                        }
                    },
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
            ]
        };
        this.myLineCharts.setOption(channalOption);
    },
    methods:{
        resize(){
            this.myLineCharts.resize()
        }
    }
}
</script>
