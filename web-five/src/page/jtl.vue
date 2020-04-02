<template>
  <div class="home_index">
    <el-row class="avue-view_main">
      <el-col class="avue-view_main_left" :span="16">
        <avue-data-icons class="data_show" :option="easyDataOption"></avue-data-icons>
        <div class="equipment_trend main_border">
          <el-row class="chart_description">
            <el-col :span="16" class="chart_descript_left">
              <div>设备总趋势</div>
              <el-date-picker v-model="month" type="month"></el-date-picker>
            </el-col>
            <el-col :span="8" class="chart_descript_right">
              <span class="point1"></span>
              <span>在线率</span>
              <span class="point2" style="background:#ffbb2a"></span>
              <span>故障率</span>
            </el-col>
          </el-row>
          <div class="chartist"></div>
        </div>
        <div class="warning_list main_border">
          <avue-crud 
            :data="data"
            :option="tableOption">
            <template slot="empty">
                <avue-empty
                :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
                :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
                >
              </avue-empty>
              </template>
            <template slot-scope="scope">
              <!-- {{scope.row.device}} -->
              <!-- <img class="device_img" :src="scope.row.device.img"/> -->
              <!-- <span class="device_img">1</span> -->
              <span class="device_name">{{scope.row.deviceName}}</span>
            </template>
            <template slot-scope="scope"
                      slot="deviceType">
              <el-tag>{{deviceTypeDic[scope.row.deviceType]}}</el-tag>
            </template>
            <template slot-scope="scope"
                      slot="location">
              <span>{{scope.row.location}}</span>
            </template>
            <template slot-scope="scope" slot="menu">
              <el-button :type="scope.row.dealState=='0'?'primary':'info'"
                              size="small"
                              :disabled="scope.row.dealState=='0'?false:true"
                              @click.stop="handleEdit()">{{scope.row.dealState=='0'?'处理':'已处理'}}</el-button>
            </template>
          </avue-crud>
        </div>
      </el-col>
      <el-col class="avue-view_main_right" :span="8">
        <el-card class="box-card main_border">
          <div slot="header" class="clearfix">
            <span>通知公告</span>
          </div>
          <ul class="avue-view_main_right_content">
            <li v-for="(item, index) in noticeList" :key="index" @click="showNotice(item)" style="cursor: pointer;">
              <!-- <i :class="item.icon"></i> -->
              <!-- <img :src="item.avatar" /> -->
              <div>
                <div class="right_content_title">{{item.noticeTitle}}</div>
                <div class="right_content_date">
                  {{item.createdDate}} 
                </div>
              </div>
            </li>
          </ul>
        </el-card>
        <el-container class="alarm_statistics">
          <el-header>
            <span>月度报警统计</span>
            <el-date-picker v-model="AlarmMonth" type="month"></el-date-picker>
          </el-header>
          <el-container>
            <el-aside width="120px">
              <ul class="list-inline">
                <li><i class="circle text-purple"></i>报警</li>
                <li><i class="circle text-success"></i>故障</li>
                <li><i class="circle text-info"></i>离线</li>
              </ul>
            </el-aside>
            <el-main>
                <div id="sales-donute" class="alarm_statistics_draw"></div>
                <!-- <div class="round">
                  <div class="round-overlap">
                    <div>{{alarmCount}}</div>
                    <div>报警次数</div>
                  </div>
                </div> -->
            </el-main>
          </el-container>
        </el-container>
      </el-col>
    </el-row>
    <el-dialog
      :title="noticeData.noticeTitle"
      :visible.sync="noticeDialogVisible"
      width="50%"
      center>
      <avue-form ref="form" v-model="noticeData" :option="option0">
      </avue-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="noticeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="noticeDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { AllUnitCount,noticemessage,analysisdeviceorgday,devicealertdeal,selectMonthAlertStatistics } from '@/api/unit/home.js'
import {
  getDict
} from '@/api/unit/dict'
import {
  fetchList,
} from '@/api/unit/floor'
import {
  fetchBuildingList,
} from '@/api/unit/building'
export default {
  name: "jtl",
  data () {
    return {
      tableOption: {
        menuAlign: "center",
        align: "center",
        title: "报警信息列表",
        columnBtn: false,
        menuWidth:200,
        addBtn: false,
        editBtn:false,
        header: true,
        page: false,
        refreshBtn: false,
        delBtn: false,
        column: [{
            label: "设备名称",
            prop: "deviceName",
            minWidth:200,
          },
          {
            label: "设备类型",
            prop: "deviceType",
            minWidth:250,
            slot: true,
          },
          {
            label: "报警地点",
            prop: "location",
            minWidth:200,
          },
        ]
      },
      data: [],
      // 报警：#fd3e3c；故障：#ffbb2a；离线：#a6a6a6；屏蔽：#38a3ec；正常：#5cdd00；
      easyDataOption: {
        data: [
          {
            title: '设备总数',
            count:'',
            icon: 'y-icon-icon',
            color: '#5cdd00',
          },
          {
            title: '报警',
            count: '',
            icon: 'y-icon-baojing',
            color: '#fd3e3c',
          },
          {
            title: '故障',
            count: '',
            icon: 'y-icon-faults-statistics',
            color: '#ffbb2a',
          },
          {
            title: '离线',
            count: '',
            icon: 'y-icon-lixian',
            color: '#a6a6a6',
          },
        ],
      },
      month: '',
      AlarmMonth:'',
      noticeList: [],
      deviceTypeDic:{},
      timeout:false,
      dateArr:[1,2,3,4,5],
      onlineArr:[2,3,4,5,6],
      outlineArr:[5,4,3,2,1],
      thisMonthScanData:{
        
      },
      alarmCount:0,
      noticeData:{},
      noticeDialogVisible:false,
      option0:{
        emptyBtn:false,
        submitBtn:false,
        column: [{
          label: "公告时间",
          prop: "createdDate",
          disabled:true,
        },{
          label: "公告类型",
          prop: "noticeType",
          disabled:true,
          type:'select',
          dicData:[{
            label:'设备消息',
            value:1
          },{
            label:'业务消息',
            value:2
          },{
            label:'通知公告',
            value:3
          }]
        },{
          label: "所在位置",
          prop: "noticeTitle2",
          disabled:true,
          span:24,
        },{
          label: "公告内容",
          prop: "noticeContent",
          disabled:true,
          span:24,
          type:'textarea'
        },]
      },
      buildingDic:{},
      floorDic:{}
    };
  },
  computed: {

  },
  created () {
    this.getDic()
    // this.getMonthYear();
  },
  mounted () {
    this.getDataAllScan()
    this.getAlarmData()
    this.getData()
  },
  watch:{
    'month':function(){
      var year
      year=this.month.getFullYear()
      var month
      month=this.month.getMonth()+1
      if(month<10){
        month='0'+month
      }
      this.month=year+'-'+month
      this.getDataAllScan()
    },
    'AlarmMonth':function(){
      var alarmyear, alarmmonth;
      alarmyear=this.AlarmMonth.getFullYear()
      alarmmonth=this.AlarmMonth.getMonth()+1
      if(alarmmonth<10){
        alarmmonth='0'+alarmmonth
      }
      this.AlarmMonth=alarmyear+'-'+alarmmonth
      console.log(this.AlarmMonth)
      this.getAlarmData()
    },
  },
  methods: {
    showNotice(data){
      this.noticeData=data
      this.noticeDialogVisible=true
    },
    getAlarmData(){
      this.thisMonthScanData.alarmAmount=0
      this.thisMonthScanData.faultAmount=0
      this.thisMonthScanData.offlineAmount=0
      selectMonthAlertStatistics({
        queryTime:this.AlarmMonth
      }).then(res=>{
        this.alarmCount=0
        if(!parseInt(res.data.code)){
          if(res.data.data){
            this.thisMonthScanData.alarmAmount=res.data.data.alarmAmount
            this.alarmCount=res.data.data.alarmAmount+res.data.data.faultAmount+res.data.data.offlineAmount
            this.thisMonthScanData.faultAmount=res.data.data.faultAmount
            this.thisMonthScanData.offlineAmount=res.data.data.offlineAmount
          }
        }
        this.drawAlarmStatistics()
        // analysisdeviceorgday(this.alarmMonth).then(res=>{
        //   console.log(res)
        
        // })
      })
    },
    getDataAllScan(){
      this.onlineArr=[]
      this.outlineArr=[]
      this.dateArr=[]
      analysisdeviceorgday({
        queryTime:this.month
      }).then(res=>{
        if(!parseInt(res.data.code)){
          res.data.data.forEach(s=>{
            s.logDate=s.logDate.substring(5,10)
            this.dateArr.push(s.logDate)
            this.onlineArr.push(s.faultAmount)
            this.outlineArr.push(s.normalAmount)
          })
          this.drawLine();
        }
      })
      console.log(this.dateArr)
      console.log(this.onlineArr)
      console.log(this.outlineArr)
    },
    getDic(){
      var initTime=new Date()
      var inityear
      var initmonth
      inityear=initTime.getFullYear()
      initmonth=initTime.getMonth()+1
      if(initmonth<10){
        initmonth='0'+initmonth
      }
      this.month=inityear+'-'+initmonth
      this.AlarmMonth=inityear+'-'+initmonth
      getDict('device_type').then(res=>{
        console.log(res)
        if(res && res.data && res.data.data.length){
          var obj={}
          res.data.data.forEach(s=>{
            obj[s.value]=s.label
          })
          this.deviceTypeDic=obj
        }
      })

      fetchBuildingList().then(res=>{
        res.data.data.forEach(s=>{
          this.buildingDic[s.id]=s.buildingCode
        })
      })

      fetchList().then(res=>{
        res.data.data.forEach(s=>{
          this.floorDic[s.id]=s.floorCode
        })
      })

    },
    getData(){
      AllUnitCount().then(res=>{
        this.easyDataOption.data[0].count=res.data[0].sumCount
        this.easyDataOption.data[1].count=res.data[0].alarmNumber
        this.easyDataOption.data[2].count=res.data[0].faultNumber
        this.easyDataOption.data[3].count=res.data[0].offLineNumber
      })
      var params={
        page:1,
        limit:4,
      }
      noticemessage(params).then(res=>{
        console.log(res)
        if(!parseInt(res.data.code) && res.data.records.length){
          res.data.records.forEach(s=>{
            if(s.createdDate){
              s.createdDate=s.createdDate.replace('T',' ')
            }
            if(s.noticeType==3||s.noticeType==1){
              // //标题修改
              if(s.noticeType==3){
                if(s.noticeTitle.split('-').length>1){
                  if(s.noticeTitle.split('-')[0]!='null' && !/[\u4E00-\u9FA5]/g.test(s.noticeTitle.split('-')[0])){
                    var devType=this.deviceTypeDic[s.noticeTitle.split('-')[0]]
                    var devState=s.noticeTitle.split('-')[1]
                    s.noticeTitle=devType+'-'+devState
                  }else if(s.noticeTitle.split('-')[0]=='null'){
                    console.log(s.noticeTitle)
                    s.noticeTitle=s.noticeTitle.split('-')[1]
                  }else{
                    
                  }
                }
              }
              
              //所在位置修改
              console.log()
              if(s.noticeTitle2.split('+~+').length>1){
                if(s.noticeTitle2.split('+~+').indexOf('null')!=-1){
                  s.noticeTitle2='无'
                }else{
                  var building=this.buildingDic[s.noticeTitle2.split('+~+')[0]]
                  var floor=this.floorDic[s.noticeTitle2.split('+~+')[1]]
                  var loca=s.noticeTitle2.split('+~+')[2]
                  s.noticeTitle2=building+'--'+floor+'--'+loca
                }
              }
            }
            // if (s.users[0].avatar) s.avatar=s.users[0].avatar
          })
          this.noticeList=res.data.records
          console.log(this.noticeList)
        }
      })

      devicealertdeal().then(res=>{
        if(!parseInt(res.data.code)){
          res.data.data.slice(0,5).forEach(s=>{
            s.deviceType=s.deviceAlertDeal.deviceType
            s.deviceName=s.deviceAlertDeal.deviceName
            s.location=s.deviceAlertDeal.location
            s.dealTime=s.deviceAlertDeal.dealTime
            if(!s.dealTime){
              s.dealTime='无'
            }
          })
          this.data=res.data.data.slice(0,5)
        }
      }).catch(error=>{
        if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
          this.timeout=true
        }
      })
    },
    // 曲线图
    drawLine () {
      var a=this.$chartist.Line('.chartist', {
        labels: this.dateArr,
        series: [
          this.onlineArr,
          this.outlineArr
        ]
      }, {
        height: '220px',
        low: 0,
        fullWidth: true,
        plugins: [
          // this.$chartist.plugins.tooltip()
        ], // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
        axisY: {
            onlyInteger: true,
            // labelInterpolationFnc: function (value) {
            //     return (value / 1) + 'k';
            // }
        }
      });
      a.on('draw', function(context) {
        if(context.type === 'line') {
          if(context.index==0){
            context.element.attr({
              style: 'stroke: #F3BB45;'
            });
          }
        }
        if(context.type === 'point') {
          if(context.seriesIndex==0){
            context.element.attr({
              style: 'stroke: #F3BB45;'
            });
          }
        }
      })
    },

    // 处理按钮
    handleEdit () {
      this.$router.push('/monitor/industry')
    },
    // 本月报警画图
    drawAlarmStatistics () {
      // ============================================================== 
      // doughnut chart option
      // ============================================================== 
      var doughnutChart = this.$echarts.init(document.getElementById('sales-donute'));
      // specify chart configuration item and data
      var option = {
        title:{
          text:`异常次数 ${this.alarmCount}`,
          left:'center',
          top:'50%',
        },
        tooltip: {
          trigger: 'item'
          , formatter: "{a} <br/>{b} : {c} ({d}%)"
        }
        , legend: {
          show: false
          , data: ['报警', '正常', '故障', '离线']
        }
        , toolbox: {
          show: false
          , feature: {
            dataView: {
              show: false
              , readOnly: false
            }
            , magicType: {
              show: false
              , type: ['pie', 'funnel']
              , option: {
                funnel: {
                  x: '25%'
                  , width: '50%'
                  , funnelAlign: 'center'
                  , max: 1548
                }
              }
            }
            , restore: {
              show: true
            }
            , saveAsImage: {
              show: true
            }
          }
        }
        , color: ["#fd3e3c", "#ffbb2a", "#a6a6a6"]
        , calculable: false
        , series: [
          {
            name: '警报'
            , type: 'pie'
            , center: ['50%', '50%']
            , radius: ['65%', '80%']
            , itemStyle: {
              normal: {
                label: {
                  show: false
                }
                , labelLine: {
                  show: false
                }
              }
              , emphasis: {
                label: {
                  show: false
                  , position: 'center'
                  , textStyle: {
                    fontSize: '30'
                    , fontWeight: 'bold'
                  }
                }
              }
            }
            , data: [
              {
                value: this.thisMonthScanData.alarmAmount
                , name: '报警'
              }
              , {
                value: this.thisMonthScanData.faultAmount
                , name: '故障'
              }
              , {
                value: this.thisMonthScanData.offlineAmount
                , name: '离线'
              }

            ]
          }
        ]
      };
      // use configuration item and data specified to show chart
      doughnutChart.setOption(option, true);
      setTimeout(function () {
        doughnutChart.resize()
      }, 100)
    }
  }
};
</script>

<style lang="scss">
.home_index{
  .warning_list{
    background: #fff;
    margin-top: 20px;
    padding: 20px 15px 0px;
    min-height: 382px;
    .avue-crud__menu{
      display: none;
    }
  }
  .info {
    padding: 21px 0;
    .img-border {
      width: 64px;
      height: 65px;
      position: relative;
      vertical-align: middle;
      display: inline-block;
    }
    .img-v {
      position: absolute;
      bottom: -2px;
      right: -2px;
      width: 22px;
      height: 22px;
    }
    .img {
      border-radius: 5px;
      width: 64px;
      height: 64px;
      display: inline-block;
      overflow: hidden;
      img {
        display: block;
        max-width: none;
        height: 64px;
        opacity: 1;
        width: 64px;
        margin-left: 0px;
        margin-top: 0px;
      }
    }
    .user {
      margin-left: 20px;
      display: inline-block;
      color: rgb(153, 153, 153);
      vertical-align: middle;
    }
    .user-title {
      font-size: 18px;
      color: rgb(102, 102, 102);
      margin-right: 5px;
      display: inline-block;
      max-width: 200px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .user-subtitle {
      display: inline-block;
      width: 40px;
      height: 16px;
      line-height: 16px;
      border-radius: 2px;
      padding: 0px 5px;
      margin-left: 10px;
      font-size: 12px;
      text-align: center;
      color: rgb(255, 44, 84);
      background-color: rgb(255, 242, 244);
      white-space: nowrap;
    }
    .user-item {
      font-size: 12px;
      line-height: 20px;
    }
  }
  .text-purple{
    background: #fd3e3c;
  }
  .text-success{
    background: #ffbb2a;
  }
  .text-info{
    background: #a6a6a6;
  }
  .circle{
    width: 12px;
    height: 12px;
    border-radius: 100%;
    margin: 0px 10px 0px 20px;
  }
  .el-col {
    margin-bottom: 8px;
  }
}

</style>
