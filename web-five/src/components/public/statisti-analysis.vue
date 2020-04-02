<template>
  <basic-container class="statisti_analysis">
    <el-row>
      <el-col :span="24">
        <div class="fire_alarm_data">
          <div class="data_show_div">
            <avue-data-icons class="data_show" :option="easyDataOption"></avue-data-icons>
            <!-- <avue-data-tabs class="data_show" :option="easyDataOption"></avue-data-tabs> -->
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="chart_style">
      <el-col :span="12">
        <p class="statetitle">
          设备监控状态分析
          <span>{{'('+datay[0].logDate+')'}}</span>
        </p>
        <div class="chart_height" id="stateAnalId"></div>
      </el-col>
      <el-col :span="12">
        <p class="statetitle">
          设备报警趋势分析
          <span></span>
        </p>
        <div class="chart_height" id="trendAnalId"></div>
      </el-col>
      <el-col :span="12">
        <p class="statetitle">
          设备故障率分析
          <span>{{'('+datay[0].logDate+')'}}</span>
        </p>
        <div id="failure_box">
          <div class="chart_height" id="failureRateAnalId"></div>
          <ul class="statistical_text">
            <li>
              <p>接入设备数量</p>
              <span>{{datay[0].joinAmount}}</span>
            </li>
            <li>
              <p>故障设备数量</p>
              <span>{{datay[0].faultAmount}}</span>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="12">
        <p class="statetitle">
          系统整体分析
          <span>{{'('+datay[0].logDate+')'}}</span>
        </p>
        <div class="chart_height" id="overallAnalId"></div>
      </el-col>
    </el-row>
  </basic-container>
</template>
<style lang="scss">
</style>

<script>
var htmlshitext = "<span class='spanname'>(实时)</span>";
export default {
  name: "StatistiAnalysis",
  props: ["datay", "datax", "elshownum"],
  data() {
    return {
      // 报警：#fd3e3c；故障：#ffbb2a；离线：#a6a6a6；屏蔽：#38a3ec；正常：#5cdd00；
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
      }
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.initStateAnal();
      this.initTrendAnal();
      this.initFailureRateAnal();
      this.initOverallAnal();
      this.styleClasshtml();
      this.easyDataOption.data[0].count = this.elshownum.normalAmount;
      this.easyDataOption.data[1].count = this.elshownum.alarmAmount;
      this.easyDataOption.data[2].count = this.elshownum.faultAmount;
      this.easyDataOption.data[3].count = this.elshownum.offlineAmount;
    });
  },
  methods: {
    //  状态分析图表初始化
    initStateAnal() {
      var dom = document.getElementById("stateAnalId");
      var myChart = this.$echarts.init(dom);
      console.log(this.datay)
      var nomalldata = this.datay[0].joinAmount;
      var unlinedata = this.datay[0].offlineAmount;
      var datasy = [nomalldata, unlinedata];
      
      let option = {
        title: {
          text: "设备监控状态分析",
          show: false
        },
        color: ["#38a3ec"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
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
            data: ["接入设备数量", "离线设备数量"],
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
            // name:'直接访问',
            type: "bar",
            barWidth: "20%",
            data: datasy
          }
        ]
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
      // 自适应
      setTimeout(function() {
        $(window).resize(function() {
          myChart.resize();
        });
      }, 200);
      
    },
    //  设备报警趋势分析
    initTrendAnal() {
      var dom = document.getElementById("trendAnalId");
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
            var timedatas = [];
            timedatas.splice(0, timedatas.length);
            for (var i in data) {
              var timex = data[i].logDate;
              timedatas.push(timex);
            }
            return timedatas;
          })(this.datay)
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: (function(data) {
              var numdatas = [];
              numdatas.splice(0, numdatas.length);
              for (var i in data) {
                var numdata = data[i].alarmAmount;
                numdatas.push(numdata);
              }
              return numdatas;
            })(this.datay),
            type: "line",
            itemStyle: {
              color: "#fd3e3c"
            }
          }
        ]
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
      // 自适应
      setTimeout(function() {
        $(window).resize(function() {
          myChart.resize();
        });
      }, 200);
    },
    //  设备故障率分析
    initFailureRateAnal() {
      var dom = document.getElementById("failureRateAnalId");
      var myChart = this.$echarts.init(dom);
      let option = {
        title: {
          text: "设备故障率分析",
          show: false
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "5%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: ["接入设备", "故障设备"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["49%", "65%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center",
                formatter: function(data) {
                  // console.log(data);
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
              {
                value: this.datay[0].joinAmount,
                name: "接入设备",
                itemStyle: {
                  color: "#5cdd00"
                }
              },
              {
                value: this.datay[0].faultAmount,
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
    //  系统整体分析
    initOverallAnal() {
      var dom = document.getElementById("overallAnalId");
      var myChart = this.$echarts.init(dom);
      let option = {
        title: {
          text: "系统整体分析",
          show: false
        },
        tooltip: {},
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: "正常", max: Number(this.datay[0].normalAmount) + 10 },
            { name: "警报", max: Number(this.datay[0].alarmAmount) + 10 },
            { name: "离线", max: Number(this.datay[0].offlineAmount) + 10 },
            { name: "故障", max: Number(this.datay[0].faultAmount) + 10 }
          ]
        },
        grid: {
          top: "10%",
          containLabel: true
        },
        series: [
          {
            name: "系统整体分析",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: (function(data) {
                  var normalAmount = data[0].normalAmount;
                  var alarmAmount = data[0].alarmAmount;
                  var offlineAmount = data[0].offlineAmount;
                  var faultAmount = data[0].faultAmount;
                  var statusData = [
                    normalAmount,
                    alarmAmount,
                    offlineAmount,
                    faultAmount
                  ];
                  return statusData;
                })(this.datay),
                name: "系统整体分析",
                itemStyle: {
                  color: "#38a3ec"
                }
              }
            ]
          }
        ]
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
      // 自适应
      setTimeout(function() {
        $(window).resize(function() {
          myChart.resize();
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
.statisti_analysis {
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
  .el-col {
    margin-top: 20px;
    .statetitle {
      font-size: 17px;
      span {
        font-size: 14px;
      }
    }
  }
  .fire_device {
    .avue-crud__menu {
      display: none;
    }
  }
  .el-card {
    border: none;
  }
  .chart_height {
    height: 300px;
    padding: 0px 0px;
    position: relative;
    top: -22px;
  }
  #overallAnalId {
    top: 10px;
  }
  .chart_style {
    width: 80%;
    margin-left: 10%;
  }
  // 故障率图样式
  #failure_box {
    position: relative;
    width: 100%;
    #failureRateAnalId {
      width: 70%;
      display: inline-block;
      // padding: 0px;
    }
    .statistical_text {
      display: inline-block;
      width: 40%;
      text-align: left;
      position: absolute;
      top: 93px;
      left: 65%;
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
}
</style>
