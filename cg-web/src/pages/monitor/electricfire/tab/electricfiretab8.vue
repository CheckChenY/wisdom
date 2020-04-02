<template>
    <div class="charts_body">
        <div class="status_div">
            <span>日期：</span>
            <a-date-picker
                v-model="createTimeStart"
                type="date"
                class="status_date_pick"
                placeholder="开始日期"
            ></a-date-picker>
            <a-date-picker
                v-model="createTimeEnd"
                type="date"
                class="status_date_pick"
                placeholder="结束日期"
            ></a-date-picker>
            <a-button
                type="primary"
                icon="el-icon-search"
                @click="tab5Search"
            >查询</a-button>
        </div>
        <div id="echartLines" class="chart_style"></div>
        <div id="echartLinesEle" class="chart_style"></div>
        <div id="echartLinesOne" class="chart_style"></div>
        <div id="echartLinesEleTwo" class="chart_style"></div>
    </div>
</template>
<script>
import moment from 'moment';
import { getLine } from '@/util/lineChart';
export default {
    data () {
        return {
            createTimeStart: moment(new Date(), 'YYYY-MM-dd'),
            createTimeEnd:moment(new Date(), 'YYYY-MM-dd'),
            dataList: [],
        };
    },
    watch: {
    },
    created () { 
    },
    mounted () {
        let resName1 = ['Ua','Ub','Uc','过压阀值','欠压阀值'];
        let resColor1 = ['#2f4554','#61a0a8','#d48265','#ffbb2a','#fd3e3c'];

        let resName2 = ['Ia','Ib','Ic','过载阀值'];
        let resColor2 = ['#2f4554','#61a0a8','#d48265','#fd3e3c'];
        
        let resName3 = ['漏电值','漏电报警阀值'];
        let resColor3 = ['#ffbb2a','#fd3e3c'];

        let resName4 = ['A相','B相','C相','零线', '温度阈值'];
        let resColor4 = ['#2f4554','#61a0a8','#ffbb2a','#fd3e3c','#61a0a8'];
        let lineList= [
            [3,2,3,2,1],
            [1,2,3,1,2],
            [2,2,1,3,1]
        ]
        this.lineCharts("echartLines","三相电压变化曲线",lineList,['1-1','1-2','1-3','1-4','1-5'],resName1,resColor1,'电压:V')
        this.lineCharts("echartLinesEle","三相电流变化曲线",lineList,['1-1','1-2','1-3','1-4','1-5'],resName2,resColor2,'电流:A')
        this.lineCharts("echartLinesOne","漏电变化曲线",lineList,['1-1','1-2','1-3','1-4','1-5'],resName3,resColor3,'漏电:mA')
        this.lineCharts("echartLinesEleTwo","三相四线温度变化曲线",lineList,['1-1','1-2','1-3','1-4','1-5'],resName4,resColor4,'温度:℃')
    },
    computed: {
    },
    beforeCreate() {
    },
    destoryed(){
    },
    methods: {
        // 状态查询
        tab5Search(){
            // if(this.createTimeStart){
            //     let startY=new Date(this.createTimeStart).getFullYear()
            //     let startM=new Date(this.createTimeStart).getMonth()+1
            //     let startD=new Date(this.createTimeStart).getDate()
            //     startM = startM<10?('0'+startM):startM
            //     startD = startD<10?('0'+startD):startD
            //     this.createTimeStart=startY+'-'+startM+'-'+startD
            // }
            // if(this.createTimeEnd){
            //     let endY=new Date(this.createTimeEnd).getFullYear()
            //     let endM=new Date(this.createTimeEnd).getMonth()+1
            //     let endD=new Date(this.createTimeEnd).getDate()
            //     endM = endM<10?('0'+endM):endM
            //     endD = endD<10?('0'+endD):endD
            //     this.createTimeEnd=endY+'-'+endM+'-'+endD
            // }
            this.getDynamic({deviceId:this.setData.row.deviceId,page: 1,limit: 8,createTimeStart:this.createTimeStart,createTimeEnd:this.createTimeEnd});
        },
        //动态曲线数据
        getDynamic(obj){
            // getRecord(obj).then(res=>{
            //     console.log(res)
            //     if(res&&res.data){
            //         let data = res.data.data
            //         console.log('动态曲线数据',data);
            //         let resName1 = ['Ua','Ub','Uc','过压阀值','欠压阀值'];
            //         let resColor1 = ['#2f4554','#61a0a8','#d48265','#ffbb2a','#fd3e3c'];

            //         let resName2 = ['Ia','Ib','Ic','过载阀值'];
            //         let resColor2 = ['#2f4554','#61a0a8','#d48265','#fd3e3c'];
                    
            //         let resName3 = ['漏电值','漏电报警阀值'];
            //         let resColor3 = ['#ffbb2a','#fd3e3c'];

            //         let resName4 = ['A相','B相','C相','零线', '温度阈值'];
            //         let resColor4 = ['#2f4554','#61a0a8','#ffbb2a','#fd3e3c','#61a0a8'];

            //         let lineObj = getLine(data);

            //         setTimeout(() => {
            //             this.lineCharts("echartLines","三相电压变化曲线",lineObj.resOne,lineObj.serTime,resName1,resColor1,'电压:V')
            //             this.lineCharts("echartLinesEle","三相电流变化曲线",lineObj.resTwo,lineObj.serTime,resName2,resColor2,'电流:A')
            //             this.lineCharts("echartLinesOne","漏电变化曲线",lineObj.resTre,lineObj.serTime,resName3,resColor3,'漏电:mA')
            //             this.lineCharts("echartLinesEleTwo","三相四线温度变化曲线",lineObj.resFou,lineObj.serTime,resName4,resColor4,'温度:℃')
            //         })
            //     }
            // })
        },
        //动态曲线图
        lineCharts(id, title, ser, serTime, resName, resColor, text) {
            var dom = document.getElementById(id);
            if (!dom) {
                return
            }
            this.myCharts = this.$echarts.init(dom);
            this.myCharts.clear()

            let serObj = [];
            for (let i = 0; i < ser.length; i++) {
                let series = {}
                series['data'] = ser[i];
                series['type'] = 'line';
                series['smooth'] = true;
                series['name'] = resName[i];
                series['itemStyle'] = {
                    'color': resColor[i]
                };
                serObj.push(series)
            }

            this.chartOptions = {
                title: {
                    text: title
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        let relVal = ''
                        let unit = text.split(':')[1]
                        for (let i = 0, len = params.length; i < len; i++) {
                            relVal += params[i].seriesName + ': ' + params[i].value + ' ' + unit + '<br />'
                        }
                        return relVal;
                    }
                },
                legend: {
                    data: resName
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: serTime
                },
                yAxis: {
                    type: 'value',
                    name: text,
                },
                series: serObj
            };
            this.myCharts.setOption(this.chartOptions);
        },
    }
}
</script>
<style lang="scss">
.charts_body{
    overflow-y: scroll;
    height: 750px;
}
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
