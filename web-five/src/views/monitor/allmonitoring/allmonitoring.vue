<template>
  <div>
    <basic-container class="statisti_box">
      <el-row>
        <el-col :span="24">
          <div class="fire_alarm_data">
            <div class="data_show_div">
              <avue-data-icons class="data_show" :option="easyDataOption"></avue-data-icons>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <p class="statetitle_box">
            各系统设备总览
            <!-- <span>({{allScanTime}})</span> -->
          </p>
          <div class="echarts_class" id="allchannl"></div>
        </el-col>
        <el-col :span="8">
          <p class="statetitle_box">
            设备报警整体趋势分析
            <span></span>
          </p>

          <div class="echarts_class" id="allchannls"></div>
        </el-col>
        <el-col :span="8">
          <p class="statetitle_box">
            设备故障率分析
            <!-- <span>({{defaultThinkDate}})</span> -->
          </p>
          <div id="failure_box">
            <div class="echarts_class" id="allequipment"></div>
            <ul class="statistical_text">
              <li>
                <p>设备总数量</p>
                <span v-if="this.fenxi">{{this.fenxi.joinAmount}}</span>
              </li>
              <li>
                <p>故障设备数量</p>
                <span v-if="this.fenxi">{{this.fenxi.faultAmount}}</span>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <p class="statetitle_box">
            报警处理率分析
            <!-- <span>({{defaultThinkDate}})</span> -->
          </p>
          <div class="echarts_class" id="allcalls"></div>
        </el-col>
        <el-col :span="8">
          <p class="statetitle_box">
            警情处理结果分析
            <!-- <span>({{defaultThinkDate}})</span> -->
          </p>
          <div class="echarts_class" id="callreslt"></div>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  dataAnalysis,
  analysisList,
  selectMalfunctionAvg,
  selctAlertState,
  selctAlertStateAnalyze,
  analysisAllbar,
  analysisAllbar2,
  analysisResult
} from "@/api/monitor/industry";

var htmlshitext = "<span class='spanname'>(实时)</span>";
export default {
  name: "inndustry_index",
  components: {},
  data() {
    return {
      analysisType: "",
      echartsline: [],
      echartsbar: [],
      echartsgauge: [],
      easyDataOption: {
        data: [
          {
            title: "正常设备",
            count: "12332",
            icon: "y-icon-icon",
            color: "#5cdd00"
          },
          {
            title: "报警设备",
            count: 33,
            icon: "y-icon-baojing",
            color: "#fd3e3c"
          },
          {
            title: "故障设备",
            count: 2223,
            icon: "y-icon-faults-statistics",
            color: "#ffbb2a"
          },
          {
            title: "离线设备",
            count: 2223,
            icon: "y-icon-lixian",
            color: "#a6a6a6"
          }
        ]
      },
      allScanTime:'',
      defaultThinkDate:'',
      alarmThinkDate:'',
      resultThinkDate:'',
      fenxi:{
        joinAmount:'',
        faultAmount:''
      },
      chulilv:{}
    };
  },
  created() {},
  computed: {},
  mounted() {
    //  console.log(this.menu)
    this.analysisAxios(this.analysisType);
    this.styleClasshtml();
  },
  methods: {
    // 设备总览数据请求
    analysisAxios(data) {
      dataAnalysis(data).then(res => {
        console.log(res);
        this.easyDataOption.data[0].count = res.data.data.normalAmount;
        this.easyDataOption.data[1].count = res.data.data.alarmAmount;
        this.easyDataOption.data[2].count = res.data.data.faultAmount;
        this.easyDataOption.data[3].count = res.data.data.offlineAmount;
      });
      selectMalfunctionAvg().then(res=>{
        this.fenxi.joinAmount=0
        this.fenxi.faultAmount=0
        if(res && res.data.data){
          this.fenxi.joinAmount=res.data.data.joinAmount
          this.fenxi.faultAmount=res.data.data.faultAmount
        }else{
          this.fenxi.joinAmount=0
          this.fenxi.faultAmount=0
        }
        this.initFailureRateAnal();
      })
      selctAlertState().then(res=>{
        if(res && res.data.data){
          this.chulilv=res.data.data
        }else{
          this.chulilv={
            allCount:1,
            notDisposeCount:0
          }
        }
        this.callfined()
      })
      analysisList(data).then(res => {
        if(res && res.data && res.data.data && res.data.data.length){
          this.defaultThinkDate = res.data.data[0].logDate
          this.echartsline = res.data.data;
          console.log('initTrendAnalinitTrendAnal', res.data.data);
          this.initTrendAnal();
        }else{
          this.initTrendAnal();
        }
      });
      analysisAllbar2().then(res => {
        this.allScanTime=res.data.data[0].logDate
        this.echartsbar = res.data.data;
        this.allchannlechrts();
      });

      selctAlertStateAnalyze().then(res=>{
        if(res && res.data.data){
          this.echartsgauge = res.data.data;
        }else{
          this.echartsgauge={
            abnormal:0,
            misinformation:0,
            realFire:0,
            test:0
          }
        }
        this.cellresoult();
      })
      // analysisResult().then(res => {
        
      //   this.echartsgauge = res.data.data;
      //   this.callfined();
      //   this.cellresoult();
      // });
    },

    // 设备总览图配置
    allchannlechrts() {
      var channlDome = document.getElementById("allchannl");
      var myCharts = this.$echarts.init(channlDome);
      var channalOption = {
        title: {
          show: false,
          text: "设备总览柱状图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["报警", "离线", "故障", "正常"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "火灾自动报警系统",
              "消防水系统",
              "电气火灾监控系统",
              "无线火灾报警系统",
              "视频监控系统",
              "防火门监控系统",
              "消防电源监控系统",
              "智慧用电监控系统",
              "充电桩监测系统"
            ],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,
              rotate: -40
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "数量/台",
            minInterval:1
          }
        ],
        series: [
          {
            name: "报警",
            type: "bar",
            stack: "报警",
            color:'#fd3e3c',
            data: (function(data) {
              var alarmdatas = [];
              for (var i in data) {
                if (data[i].systemId == "1") {
                  alarmdatas[0] = data[i].alarmAmount;
                } else if (data[i].systemId == "2") {
                  alarmdatas[1] = data[i].alarmAmount;
                } else if (data[i].systemId == "3") {
                  alarmdatas[2] = data[i].alarmAmount;
                } else if (data[i].systemId == "4") {
                  alarmdatas[3] = data[i].alarmAmount;
                } else if (data[i].systemId == "5") {
                  alarmdatas[4] = data[i].alarmAmount;
                } else if (data[i].systemId == "6") {
                  alarmdatas[5] = data[i].alarmAmount;
                } else if (data[i].systemId == "7") {
                  alarmdatas[6] = data[i].alarmAmount;
                } else if (data[i].systemId == "8") {
                  alarmdatas[7] = data[i].alarmAmount;
                } else if (data[i].systemId == "9") {
                  alarmdatas[8] = data[i].alarmAmount;
                }
              }
              // console.log(alarmdatas)
              return alarmdatas
            })(this.echartsbar)
          },
          {
            name: "离线",
            type: "bar",
            stack: "离线",
            color:'#a6a6a6',
            data: (function(data) {
              var alarmdatas = [];
              for (var i in data) {
                if (data[i].systemId == "1") {
                  alarmdatas[0] = data[i].offlineAmount;
                } else if (data[i].systemId == "2") {
                  alarmdatas[1] = data[i].offlineAmount;
                } else if (data[i].systemId == "3") {
                  alarmdatas[2] = data[i].offlineAmount;
                } else if (data[i].systemId == "4") {
                  alarmdatas[3] = data[i].offlineAmount;
                } else if (data[i].systemId == "5") {
                  alarmdatas[4] = data[i].offlineAmount;
                } else if (data[i].systemId == "6") {
                  alarmdatas[5] = data[i].offlineAmount;
                } else if (data[i].systemId == "7") {
                  alarmdatas[6] = data[i].offlineAmount;
                } else if (data[i].systemId == "8") {
                  alarmdatas[7] = data[i].offlineAmount;
                } else if (data[i].systemId == "9") {
                  alarmdatas[8] = data[i].offlineAmount;
                }
              }
              // console.log(alarmdatas)
              return alarmdatas
            })(this.echartsbar)
          },
          {
            name: "故障",
            type: "bar",
            stack: "故障",
            color:'#ffbb2a',
            data: (function(data) {
              var alarmdatas = [];
              for (var i in data) {
                if (data[i].systemId == "1") {
                  alarmdatas[0] = data[i].faultAmount;
                } else if (data[i].systemId == "2") {
                  alarmdatas[1] = data[i].faultAmount;
                } else if (data[i].systemId == "3") {
                  alarmdatas[2] = data[i].faultAmount;
                } else if (data[i].systemId == "4") {
                  alarmdatas[3] = data[i].faultAmount;
                } else if (data[i].systemId == "5") {
                  alarmdatas[4] = data[i].faultAmount;
                } else if (data[i].systemId == "6") {
                  alarmdatas[5] = data[i].faultAmount;
                } else if (data[i].systemId == "7") {
                  alarmdatas[6] = data[i].faultAmount;
                } else if (data[i].systemId == "8") {
                  alarmdatas[7] = data[i].faultAmount;
                } else if (data[i].systemId == "9") {
                  alarmdatas[8] = data[i].faultAmount;
                }
              }
              // console.log(alarmdatas)
              return alarmdatas
            })(this.echartsbar)
          },
          {
            name: "正常",
            type: "bar",
            stack: "正常",
            color:'#5cdd00',
            data: (function(data) {
              var alarmdatas = [];
              for (var i in data) {
                if (data[i].systemId == "1") {
                  alarmdatas[0] = data[i].normalAmount;
                } else if (data[i].systemId == "2") {
                  alarmdatas[1] = data[i].normalAmount;
                } else if (data[i].systemId == "3") {
                  alarmdatas[2] = data[i].normalAmount;
                } else if (data[i].systemId == "4") {
                  alarmdatas[3] = data[i].normalAmount;
                } else if (data[i].systemId == "5") {
                  alarmdatas[4] = data[i].normalAmount;
                } else if (data[i].systemId == "6") {
                  alarmdatas[5] = data[i].normalAmount;
                } else if (data[i].systemId == "7") {
                  alarmdatas[6] = data[i].normalAmount;
                } else if (data[i].systemId == "8") {
                  alarmdatas[7] = data[i].normalAmount;
                } else if (data[i].systemId == "9") {
                  alarmdatas[8] = data[i].normalAmount;
                }
              }
              // console.log(alarmdatas)
              return alarmdatas
            })(this.echartsbar)
          }
        ]
      };
      myCharts.setOption(channalOption);
    },
    //  设备报警趋势分析
    initTrendAnal() {
      var dom = document.getElementById("allchannls");
      var myChart = this.$echarts.init(dom);
      let option = {
        title: {
          text: "设备报警趋势分析",
          show: false
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: (function(data) {
            // console.log(data);
            var echartsLine = [];
            echartsLine.splice(0, echartsLine.length);
            for (var i = 0; i < data.length; i++) {
              var timedata = data[i].logDate.substring(
                5,
                data[i].logDate.length
              );
              echartsLine.push(timedata);
            }
            return echartsLine;
          })(this.echartsline)
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: (function(data) {
              var alarmNums = [];
              alarmNums.splice(0, alarmNums.length);
              for (var a in data) {
                var alarmNum = data[a].alarmAmount;
                alarmNums.push(alarmNum);
              }
              return alarmNums;
            })(this.echartsline),
            type: "line",
            itemStyle: {
              color: "#fd3e3c"
            }
          }
        ]
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
        // 自适应
        setTimeout(function() {
          $(window).resize(function() {
            myChart.resize();
          });
        }, 200);
      }
    },
    
    //  设备故障率分析
    initFailureRateAnal() {
      var dom = document.getElementById("allequipment");
      var myChart = this.$echarts.init(dom);
      let option = {
        title: {
          text: "设备故障率分析",
          show: false
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //   orient: "vertical",
        //   x: "right",
        //   data: ["故障设备"]
        // },
        grid: {
          left: "0%",
          right: "14%",
          // top:"20%",
          bottom: "3%",
          containLabel: true
        },
        series: [
          {
            name: "设备故障率分析",
            type: "pie",
            radius: ["49%", "65%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center",
                formatter: function(data) {
                  var datashow = data.name + data.percent + "%";
                  return datashow;
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "15",
                  fontWeight: "bold",
                  color: "#666",
                  baseline: "middle",
                  align: "center"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              // {
              //   value: this.fenxi.joinAmount,
              //   name: "接入设备",
              //   itemStyle: {
              //     color: "#5cdd00"
              //   }
              // },
              {
                value: this.fenxi.faultAmount,
                name: "故障设备",
                itemStyle: {
                  color: "#ffbb2a"
                }
              }
            ]
          }
        ]
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
        let index = 0; // 高亮索引
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: index,
          dataIndex: index
        });
        myChart.on("mouseover", function(e) {
          if (e.dataIndex != index) {
            myChart.dispatchAction({
              type: "downplay",
              seriesIndex: 0,
              dataIndex: index
            });
          }
        });
        myChart.on("mouseout", function(e) {
          index = e.dataIndex;
          myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: e.dataIndex
          });
        });
        // 自适应
        setTimeout(function() {
          $(window).resize(function() {
            myChart.resize();
          });
        }, 200);
      }
    },
    // 设备报警处理率
    callfined() {
      var channlDome = document.getElementById("allcalls");
      var myCharts = this.$echarts.init(channlDome);
      var options = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {}
        },
        series: [
          {
            name: "报警处理率",
            type: "gauge",
            // center: ['25%', '25%'],
            detail: {
              formatter: "{value}%",
              textStyle: {
                fontSize: 15
              }
            },

            data: [
              {
                value: (function(data) {
                  console.log(data)
                  if (data) {
                    return parseInt(data.notDisposeCount/data.allCount*100)
                  }
                })(this.chulilv),
                name: "处理率",
                label: {
                  fontSize: 20
                }
              }
            ]
          }
        ]
      };
      myCharts.setOption(options);
      // 自适应
      setTimeout(function() {
        $(window).resize(function() {
          myCharts.resize();
        });
      }, 200);
    },
    //警情处理结果分析
    cellresoult() {
      var channlDome = document.getElementById("callreslt");
      var myCharts = this.$echarts.init(channlDome);
      var options = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "0%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["真实火警", "隐患", "异常报警", "测试"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "报警情况",
            type: "bar",
            barWidth: "60%",
            data: [
              this.echartsgauge.realFire,
              this.echartsgauge.misinformation,
              this.echartsgauge.abnormal,
              this.echartsgauge.test
            ]
          }
        ]
      };
      myCharts.setOption(options);
      // 自适应
      setTimeout(function() {
        $(window).resize(function() {
          myCharts.resize();
        });
      }, 200);
    },

    // 统计顶部样式修改
    styleClasshtml() {
      var domHtml = $(".item-info").find(".count");
      domHtml.append(htmlshitext);
    }
  }
};
</script>
<style lang="scss">
.statisti_box {
  height: 100%;
  // overflow: hidden;
  // overflow-y: scroll;
  .fire_alarm_data {
    background: #fff;
    padding: 20px 15px 25px;
    border-radius: 4px;
    color: #999;
    margin: 0 10px;
    .data_show_div {
      .data_show {
        .item {
          .item-info {
            .count {
              .spanname {
                font-size: 14px;
                color: #999;
                display: inline-block;
                margin-left: 5px;
              }
            }
          }
          border: 1px #eee solid;
          border-radius: 5px;
        }
      }
    }
  }
  // 故障率图样式
  #failure_box {
    position: relative;
    width: 100%;
    #allcall {
      // width: 70%;
      display: inline-block;
      // padding: 0px;
    }
    .statistical_text {
      display: inline-block;
      width: 40%;
      text-align: left;
      position: absolute;
      top: 93px;
      left: 82%;
      li {
        p {
          color: #979797;
        }
        span {
          display: inline;
          color: #272727;
          font-size: 19px;
        }
      }
    }
  }
  .el-col {
    margin-top: 20px;
    //  overflow: scroll;
    .echarts_class {
      height: 300px;
    }
    .statetitle_box {
      font-size: 17px;
      span {
        font-size: 14px;
      }
    }
  }
}
</style>