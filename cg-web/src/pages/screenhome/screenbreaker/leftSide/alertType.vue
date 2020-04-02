<template>
    <div class="alert_type">
        <div class="alert_title">
            <span class="title_text">报警类型分布</span>
        </div>
        <div class="alert_body" id="pieAlert"></div>
    </div>
</template>
<script>
import { getAlertCountType } from "@/api/screen/screen";
export default {
    name: 'alertType',
    data(){
        return{
        }
    },
    created(){
    },
    mounted(){
        let startTime = new Date().format('yyyy-MM-dd') + ' 00:00:00'
        let endTime = new Date().format('yyyy-MM-dd') + ' 23:59:59'
        this.getAlertCountType(startTime, endTime)
    },
    methods:{
        // 饼状图
        pieInit (dataList) {
            let dom = document.getElementById("pieAlert");
            let myChart = this.$echarts.init(dom);
            let data = genData(dataList);
            let color = ['#00a4ff','#64f890', '#f2da62', '#ff2020', '#ff59ff','#00fafd']
            let option = {
                color: color,
                legend: {
                    orient: 'vertical',
                    right: 70,
                    top: '3%',
                    height: 180,
                    data:data.legendData,
                    textStyle: {
                        color: '#b3c8ff',
                    }
                },
                title: {
                    text: '空开报警',
                    left: '8%',
                    top: 80,
                    textStyle: {
                        color: '#00fcfe',
                        padding: 150,
                    }
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        center: ['15%', '45%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:data.seriesData
                    }
                ]
            };

            function genData(arr) {
                let legendData = [];
                let seriesData = [];
                let total = 0;
                for (let i = 0; i < arr.length; i++) {
                    total += arr[i].value
                }
                for (let i = 0; i < arr.length; i++) {
                    let legend = arr[i].name + "|" + (Math.round((arr[i].value/total)*10000)/100) + '%'
                    legendData.push({
                        name:legend,
                        icon: 'circle'
                    });
                    seriesData.push({
                        name: legend,
                        value: arr[i].value
                    });
                }

                return {
                    legendData: legendData,
                    seriesData: seriesData
                };
            }
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
            window.addEventListener("resize", function() {
                myChart.resize();
            });
        },
        // 图表数据
        getAlertCountType (startTime, endTime) {
            let obj = {
                startTime: startTime,
                endTime: endTime,
            }
            let dataList = []
            getAlertCountType(obj).then(res => {
                if (res && res.data && res.data.status === 0) {
                    let data = res.data.data
                    for(let i = 0,len = data.length; i < len; i++) {
                        let obj = {
                            value:data[i].count, name:data[i].detail
                        }
                        dataList.push(obj)
                    }
                    if (dataList.length === 0) {
                        dataList = [{value:1, name:1}]
                    }
                    this.pieInit(dataList)
                }
            })
        },
    }
}
</script>

<style lang="scss">
.alert_type{
    border: #2d7cfb 1px solid;
    height: 240px;
    background-color: rgba(16,29,78,0.5);
    .alert_title{
        text-align: center;
        .title_text{
            color: #00fcfe;
            font-size: 15px;
            background: url('/img/screen/titlemini.png') no-repeat;
            background-size:100% 55px;
            display: inline-block;
            width: 255px;
            text-align: center;
        }
    }
    .alert_body{
        width:100%;
        height:220px
    }
}
</style>
        