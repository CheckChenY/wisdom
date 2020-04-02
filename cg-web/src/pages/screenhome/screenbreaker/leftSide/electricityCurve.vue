<template>
    <div class="electricity_curve">
        <div class="electricity_title">
            <span class="y-icon-xinhao title_text">每日用电量变化趋势</span>
            <span class="tab_title">
                <span class="textColor">本周</span>
            </span>
        </div>
        <div class="electricity_body" id="electricityLine"></div>
    </div>
</template>
<script>
import { getWeekElecCharts } from "@/api/screen/screen";
export default {
    name: 'electricityCurve',
    data(){
        return{
        }
    },
    created(){
    },
    mounted(){
        this.getWeekElecCharts()
    },
    methods:{
        // 饼状图
        pieInit (xdata, sdata) {
            let dom = document.getElementById("electricityLine");
            let myChart = this.$echarts.init(dom);
            let color = ['#00a4ff']
            let option = {
                color: color,
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '20%',
                    top: '13%',
                    containLabel: true
                },
                tooltip : {
                    trigger: 'item',
                    backgroundColor: '#314cbb',
                    formatter: function (params, ticket, callback) {
                        let dom = '<span style="color:#b3c8ff;font-size:13px;height: 30px;line-height: 30px;display: inline-block;">' +
                                    '<span style="margin:25px;">' + params.name + '</span>' +
                                    '<span style="margin:25px;">' + params.value + 'kw.h</span>' +
                                  '</span>'
                        return dom;
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#368cff'
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    data: xdata
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#4d5b86'],
                            type: 'dashed'
                        }
                    },
                    axisLabel: {
                        color: '#00fcfe'
                    }
                },
                series: [{
                    data: sdata,
                    type: 'line',
                    smooth: true,
                    areaStyle: {}
                }]
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
            window.addEventListener("resize", function() {
                myChart.resize();
            });
        },
        // 获取每日用电量变化趋势
        getWeekElecCharts () {
            getWeekElecCharts().then(res => {
                let xdata = [], sdata = []
                if (res && res.data && res.data.status === 0) {
                    console.log(res.data.data)
                    res.data.data.forEach(item => {
                        xdata.push(item.g_create_date)
                        sdata.push(item.data)
                    })
                }
                this.pieInit(xdata, sdata)
            })
        }
    }
}
</script>

<style lang="scss">
.electricity_curve{
    border: #2d7cfb 1px solid;
    height: 250px;
    background-color: rgba(16,29,78,0.5);
    .electricity_title{
        color: #00fcfe;
        display: flex;
        justify-content: space-between;
        height: 38px;
        align-items: flex-end;
        .title_text{
            font-size: 18px !important;
            display: inline-block;
            text-align: center;
            padding-left: 8px;
        }
        .y-icon-xinhao:before{
            padding-right: 8px;
        }
        .tab_title{
            font-size: 14px;
            span{
                width: 66px;
                display: inline-block;
            }
        }
    }
    .electricity_body{
        width:100%;
        height:230px
    }
    // .textColor{
    //     color: #fff;
    // }
}
</style>
        