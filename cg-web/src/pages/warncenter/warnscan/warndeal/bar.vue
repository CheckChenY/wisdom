<template>
    <div id="bar" style="width:100%;height:100%;"></div>
</template>
<script> 
const echarts = require('echarts');
export default {
    data () {
        return {
            myChart:null,
            xAxisData:[],
            yAxisData:[]
        }
    },
    props:["barData"],
    watch:{
        barData(){
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
            this.myChart = echarts.init(document.getElementById('bar'));
            var option = {
                title:{
                    text:'警情柱状图'
                },
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '6%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : this.xAxisData,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel:{
                            rotate:-15,
                            // align:'center',
                            // margin:20
                        }
                    }
                ],
                yAxis: {
                    minInterval : 1,
                    splitLine :{
                        lineStyle:{
                            type:'dashed'
                        },
                    },
                },
                series : [
                    {
                        name:'警情数量',
                        type:'bar',
                        barWidth: '30',
                        data:this.yAxisData
                    }
                ]
            };
            this.myChart.setOption(option);
        },
        initData(){
            this.xAxisData=[]
            this.yAxisData=[]
            this.barData.forEach(s=>{
                this.xAxisData.push(s.name)
                this.yAxisData.push(s.num)
            })
            this.renderEcharts()
        },
        resize(){
            this.myChart.resize();
        },
    }
}
</script>