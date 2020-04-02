<template>
    <div style="width:100%;height:100%;" id="odealres"></div>
</template>

<script>
export default {
    data(){
        return{
            myDealResCharts:null
        }
    },
    mounted(){
        var echartsbar=[]
        var channlDome = document.getElementById("odealres");
        this.myDealResCharts = this.$echarts.init(channlDome);
        var channalOption = {
            color: ['#3398DB'],
            title: {
                text: '报警处理结果分析'
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
                }
            ],
            yAxis : {
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
            series : [
                {
                    name:'处理结果',
                    type:'bar',
                    barWidth: '30%',
                    data:[10, 52, 200, 334,]
                }
            ]
        };
        this.myDealResCharts.setOption(channalOption);
    },
    methods:{
        resize(){
            this.myDealResCharts.resize()
        }
    }
}
</script>
