<template>
    <div>
        <div class="status_div">
            <span size="small">月份： </span>
            <a-month-picker
              v-model="time"
              type="month"
              class="status_date_pick"
              placeholder="选择日期">
            </a-month-picker>
            <a-button type="primary" icon="el-icon-search" @click="dateSearch">查询</a-button>
        </div>
        <div id="echartfenxi" class="chart_style"></div>
    </div>
</template>
<script>
import moment from 'moment';
import { stateAnalysisByMonth } from '@/api/monitor/monitor'
export default {
    props: ["paramData","tabnum"],
    data () {
        return {
            time: moment(new Date(), 'YYYY-MM'),
            notLinkCount: [], //离线设备数量
            alarmCount: [], //报警设备数量
            troubleCount: [], //故障数量
            alarmAndTroubleCount: [], // 报警加故障个数个数
            dateArr: [],
        };
    },
    watch: {
        'paramData.deviceId':function(val, oval){
            this.getAnalyCharts({ 
                deviceId: val,
                time: this.time ? this.time.format('YYYY-MM'):'',
            }, "echartfenxi", "状态趋势");
        },
        tabnum(){
            if(this.tabnum==7){
                this.getAnalyCharts({ 
                    deviceId: this.paramData.deviceId,
                    time: this.time ? this.time.format('YYYY-MM'):'',
                }, "echartfenxi", "状态趋势");
            }
        }
    },
    created () { 
    },
    mounted () {
        // this.lineChart('echartfenxi', '状态趋势')
        this.getAnalyCharts({ 
            deviceId: this.paramData.deviceId,
            time: this.time ? this.time.format('YYYY-MM'):'',
        }, "echartfenxi", "状态趋势");
    },
    computed: {
    },
    beforeCreate() {
    },
    destoryed(){
    },
    methods: {
        // 状态查询
        dateSearch() {
            this.getAnalyCharts({ 
                deviceId: this.paramData.deviceId,
                time: this.time ? this.time.format('YYYY-MM'):'',
            }, "echartfenxi", "状态趋势");
        },
        //状态分析
        getAnalyCharts(obj, id, title) {
            this.notLinkCount = []
            this.alarmCount = []
            this.troubleCount = []
            this.alarmAndTroubleCount = []
            this.dateArr = []
            stateAnalysisByMonth(obj).then(res => {
                if (res && res.data && res.data.success) {
                    let data = res.data.value
                    for (let i = 0, len = data.length; i < len; i++) {
                        this.notLinkCount.push(data[i].notLinkCount)
                        this.alarmCount.push(data[i].alarmCount)
                        this.troubleCount.push(data[i].troubleCount)
                        this.alarmAndTroubleCount.push(data[i].alarmAndTroubleCount)
                        this.dateArr.push(data[i].alarmDate.split(' ')[0].replace(/-/g, '/'))
                    }
                    setTimeout(() => {
                        this.lineChart(id, title)
                    })
                }
            })
        },
        // 折线图 报警：#fd3e3c；故障：#ffbb2a；离线：#a6a6a6；屏蔽：#38a3ec；正常：#5cdd00；
        lineChart(id, tit) {
            var dom = document.getElementById(id);
            let myChart = this.$echarts.init(dom);
            myChart.clear()

            let chartOption = {
                title: {
                    text: tit
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['报警', '故障', '离线', '报警&故障'],
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    // boundaryGap: false,
                    data: this.dateArr
                },
                yAxis: {
                    name: '数量：次',
                    type: 'value',
                    // max: 500
                },
                series: [{
                    name: '报警',
                    type: 'line',
                    smooth: true,
                    data: this.alarmCount,
                    itemStyle: {
                        color: '#fd3e3c'
                    },
                    lineStyle: {
                        color: '#fd3e3c'
                    },
                }, {
                    name: '故障',
                    type: 'line',
                    smooth: true,
                    data: this.troubleCount,
                    itemStyle: {
                        color: '#ffbb2a'
                    },
                    lineStyle: {
                        color: '#ffbb2a'
                    },
                }, {
                    name: '离线',
                    type: 'line',
                    smooth: true,
                    data: this.notLinkCount,
                    itemStyle: {
                        color: '#a6a6a6'
                    },
                    lineStyle: {
                        color: '#a6a6a6'
                    },
                }, {
                    name: '报警&故障',
                    type: 'line',
                    smooth: true,
                    data: this.alarmAndTroubleCount,
                    itemStyle: {
                        color: '#fd3e3c'
                    },
                    lineStyle: {
                        color: '#fd3e3c'
                    },
                }]
            };
            if (chartOption && typeof chartOption === "object") {
                myChart.setOption(chartOption, true);
            }
        },
    }
}
</script>
<style lang="scss">
.chart_style{
    height: 400px;
    margin-top: 20px;
}
.status_div{
    .status_date_pick{
        margin: 0px 20px ;
    }
}
</style>
