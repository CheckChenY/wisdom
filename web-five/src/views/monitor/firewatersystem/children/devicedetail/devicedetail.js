import DevicePosition from '@/components/public/device-position'
import { statusOption } from '@/const/monitor/firealarm'

import { 
  getEquipment,//设备信息
  getMotesystem,//當前狀態
  getUnitdevice,//相關圖片
  getRecord,//相關記錄
  getAnaly,//状态分析
} from '@/api/monitor/firewirless'
import {
  getWarnMsg
} from '@/util/warn'

import ImageView from '@/components/public/image-view'
let deviceDetail = {
  name: 'deviceDetailDialog',
  components: {
    'device-position': DevicePosition,
    'image-view': ImageView
  },
  props:["setPropsId"],
  data () {
    return {
      dialogVisible: true,
      type: {
        prop: 'tab1'
      },
      option: {
        column: [{
          // icon:'el-icon-info',
          label: '设备信息',
          prop: 'tab1',
        }, {
          // icon:'el-icon-warning',
          label: '当前状态',
          prop: 'tab2',
        }, {
          // icon:'el-icon-warning',
          label: '相关图片',
          prop: 'tab3',
        }, {
          // icon:'el-icon-warning',
          label: '关联视频',
          prop: 'tab4',
        }, {
          // icon:'el-icon-warning',
          label: '动态曲线',
          prop: 'tab5',
        }, {
          // icon:'el-icon-warning',
          label: '状态记录',
          prop: 'tab6',
        }, {
          // icon:'el-icon-warning',
          label: '状态分析',
          prop: 'tab7',
        }]
      },
      tabTwoText:{
        createTime :'',
        warnState:'',
        warn01:'',
      },
      statusSteps: [],
      tableLoading: false,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 6 // 每页显示多少条
      },
      tableData: [],
      tableOption: statusOption,
      statusDateStart: '',
      statusDateEnd: '',
      chartOption: null,
      myChart: '',
      chartDynamicOption: null,
      dynamicChart: '',
      dialogImage: false,
      facilityPhoto: '',
      tabOneData:{
        deviceName:"",//设备名称
        deviceCode:"",//设备标识码
        deviceType:"",//设备类型
        buildingId:"",//所在建筑

        floorId:"",//设备楼层
        location:"",//设备安装位置
        areaCode:"",//设备区号
        loopNumber:"",//设备回路号
        pointNumber:"",//设备点位号

        installTime:"",//安装时间
        deviceModel:"",//设备型号
        softwareVersion:"",//软件版本
        manufacturer:"",//生产厂家
        manufactureDate:"",//生产日期

        validityTerm:"",//有效期
        warnState:"",//设备使用状态
        surroundingPhoto:"",//周边图
      },
      offlineAmount:[],//离线设备数量
      alarmAmount:[],//报警设备数量
      faultAmount:[],//故障数量
      dataList:[],//x轴日期坐标
      logObj : {
        logDateStart : "",
        logDateEnd : "",
        deviceId : "",
      },
      listQuery: {
        page: 1,
        limit: 6,
        deviceId:''
      },
      timeout:false,
      search: {
        createTimeStart: '',
        createTimeEnd: '',
      },
      statusDes: '',
    }
  },
  created () {
    this.getEquipmentInt(this.setPropsId.id);
  },
  mounted() {
    setTimeout(() => {
      this.filter()
    })
  },
  methods: {
    //设备信息
    getEquipmentInt(id){
      getEquipment(id).then(res=>{
        if(res&&res.data){
          let dataList = res.data.data
          this.tabOneData.deviceName = dataList.deviceName//设备名称
          this.tabOneData.deviceCode = dataList.deviceCode//设备标识码
          this.tabOneData.deviceType = dataList.deviceType//设备类型
          this.tabOneData.buildingId = dataList.buildingId//所在建筑

          this.tabOneData.floorId = dataList.floorId//设备楼层
          this.tabOneData.location = dataList.location//设备安装位置
          this.tabOneData.areaCode = dataList.areaCode//设备区号
          this.tabOneData.loopNumber = dataList.loopNumber//设备回路号
          this.tabOneData.pointNumber = dataList.pointNumber//设备点位号

          this.tabOneData.installTime = dataList.installTime//安装时间
          this.tabOneData.deviceModel = dataList.deviceModel//设备型号
          this.tabOneData.softwareVersion = dataList.softwareVersion//软件版本
          this.tabOneData.manufacturer = dataList.manufacturer//生产厂家
          this.tabOneData.manufactureDate = dataList.manufactureDate//生产日期

          this.tabOneData.validityTerm = dataList.validityTerm//有效期
          this.tabOneData.warnState = dataList.warnState//设备使用状态
          this.tabOneData.surroundingPhoto = dataList.surroundingPhoto//周边图
          // console.log(res)
        }
      })
    },
    // 弹窗关闭前
    handleClose () {
      this.$emit('handleClose')
    },
    // 选择页签
    handleTabChange(column) {
      this.type = column
      if (column.prop == 'tab1') {
        // this.getBaseInfo()
      } else if (column.prop == 'tab2') {
        this.statusSteps=[];
        this.getCurrentStatus(this.setPropsId.deviceId);
      } else if (column.prop == 'tab3') {
        this.getUnitdeviceImg(this.setPropsId.deviceId);
      } else if (column.prop == 'tab5') {
        this.getAnalyCharts({deviceId:this.setPropsId.deviceId},"echartDynamic","三相电流动态变化曲线");
      } else if (column.prop == 'tab6') {
        this.listQuery.deviceId = this.setPropsId.deviceId;
        this.getUnitRecord(this.listQuery);
      }  else if (column.prop == 'tab7') {
        this.getAnalyCharts({deviceId:this.setPropsId.deviceId},"echart","状态趋势");
      }
    },
    // 去除h5中 &nbsp;
    filter () {
      let tab0List = window['tab-0']
      for (let i = 0, len = tab0List.length; i < len; i++) {
        tab0List[i].innerHTML = tab0List[i].innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
      }
      let tab1List = window['tab-1']
      for (let i = 0, len = tab1List.length; i < len; i++) {
        tab1List[i].innerHTML = tab1List[i].innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
      }
      let tab2 = document.getElementById('tab-2')
      tab2.innerHTML = tab2.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
      let tab3 = document.getElementById('tab-3')
      tab3.innerHTML = tab3.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
      let tab4 = document.getElementById('tab-4')
      tab4.innerHTML = tab4.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
      let tab5 = document.getElementById('tab-5')
      tab5.innerHTML = tab5.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
      let tab6 = document.getElementById('tab-6')
      tab6.innerHTML = tab6.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
    },
    //當前狀態
    getCurrentStatus(id){
      getMotesystem(id).then(res=>{
        if(res&&res.data){
          let data = res.data.data;
          this.tabTwoText.createTime = data.createTime.substring(0,10);
          this.tabTwoText.warnState = data.warnState;
          this.tabTwoText.warn01 = data.warn01;
          if(data.firstViewTime){
            let obj = {}
            obj["time"] = data.firstViewTime;
            obj["description"] = data.firstViewer ;
            this.statusSteps.push(obj)
          }else if(data.firstViewTime){
            let obj = {},objTwo={};
            obj["time"] = data.firstViewTime;
            obj["description"] = data.warnState ;

            obj["time"] = data.dealTime;
            obj["description"] = data.firstViewer ;
            this.statusSteps.push(obj)
            this.statusSteps.push(objTwo)

          }else if(data.firstViewTime){
            let obj = {}
            obj["time"] = data.firstViewTime;
            obj["description"] = data.warnState ;
            this.statusSteps.push(obj)
          }
          // console.log(this.statusSteps)
          
        }
      })
    },
    //相關圖片
    getUnitdeviceImg(id){
      getUnitdevice(id).then(res=>{
        this.statusDes = res.data.data.statusDes;
      })
    },
    //相关记录
    getUnitRecord(id){
      this.tableLoading = true
      getRecord(id).then(res=>{
        if(res&&res.data){
          res.data.data.forEach(s=>{
            s.statusDes = this.statusDes
            s.stateDesc=getWarnMsg(s)
          })
          let data = res.data.data;
          this.tableData = data;
          this.page.total = res.data.total;
          setTimeout(() => {
            this.tableLoading = false
          }, 1000)
        }
      }).catch(error=>{
        this.tableLoading = false
        if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
          this.timeout=true
        }
      })
    },
    //状态分析
    getAnalyCharts(obj,id,title){
      getAnaly(obj).then(res=>{
        if(res&&res.data){
          let data = res.data.data
          for (let i = 0, len = data.length; i < len; i++) {
            this.offlineAmount.push(data[i].offlineAmount)
            this.alarmAmount.push(data[i].alarmAmount)
            this.faultAmount.push(data[i].faultAmount)
            this.dataList.push(data[i].logDate.substring(0,7))
          }
          setTimeout(() => {
            this.lineChart(id,title)
          })
        }
      })
    },
    // 取消按钮
    cancel () {
      this.$emit('handleClose')
    },
    // 确定按钮
    submit () {
      this.$emit('handleClose')
    },
    // 搜索
    searchChange(){
      this.search.createTimeStart = this.search.createTimeStart ? this.search.createTimeStart.format('yyyy-MM-dd'): ''
      this.search.createTimeEnd = this.search.createTimeEnd ? this.search.createTimeEnd.format('yyyy-MM-dd'): ''
      this.getUnitRecord(Object.assign(this.listQuery, this.search))
    },
    //相关记录弹窗数据情况
    dialogReset () {
      this.search.createTimeStart = ''
      this.search.createTimeEnd = ''
    },
    // 折线图 报警：#fd3e3c；故障：#ffbb2a；离线：#a6a6a6；#38a3ec；正常：#5cdd00；
    lineChart (id,title) {
      var dom = document.getElementById(id);
      this.myChart = this.$echarts.init(dom);
      this.myCharts.clear()
      
      this.chartOption = {
        title: {
          text: title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['报警','故障','离线','正常']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          x:'1000',
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          name: '数量：次',
          type: 'value',
          data: this.dataList,
        },
        series: [{
          name:'报警',
          type:'line',
          data:this.alarmAmount,
          itemStyle: {
            color: '#fd3e3c'
          },
          lineStyle: {
            color: '#fd3e3c'
          },
        },{
          name:'故障',
          type:'line',
          data:this.faultAmount,
          itemStyle: {
            color: '#ffbb2a'
          },
          lineStyle: {
            color: '#ffbb2a'
          },
        },{
          name:'离线',
          type:'line',
          data:this.offlineAmount,
          itemStyle: {
            color: '#a6a6a6'
          },
          lineStyle: {
            color: '#a6a6a6'
          },
        }]
      };
      if (this.chartOption && typeof this.chartOption === "object") {
        this.myChart.setOption(this.chartOption, true);
      }
      // this.dateSearch()
    },
    // 状态分析时间搜索
    dateSearch () {
      let startYear = new Date().getFullYear() - 1
      let startMonth = new Date().getMonth() + 1
      let endYear = new Date().getFullYear()
      let endMonth = new Date().getMonth() + 1
      if (this.statusDateStart && this.statusDateEnd) {
        startYear = this.statusDateStart.getFullYear()
        startMonth = this.statusDateStart.getMonth() + 1
        endYear = this.statusDateEnd.getFullYear()
        endMonth = this.statusDateEnd.getMonth() + 1
      }
      // this.chartOption.xAxis.data = []
      if (startYear == endYear && startMonth > endMonth) {
        this.$message('月份错误，请从新选择'); 
        return
      }
      // debugger;
      if (startYear == endYear) {
        for (let i = startMonth; i <= endMonth; i++) {
          this.dataList.push(startYear + '/' + i)
        }
      }
      if (startYear > endYear) {
        this.$message('年份错误，请从新选择'); 
        return
      }
      
      if ((endYear - startYear) >= 1) {
        for (let i = startMonth; i <= 12; i++) {
          this.dataList.push(startYear + '/' + i)
        }
        
        for (let i = startYear + 1; i < endYear; i++) {
          for (let j = 1; j <= 12; j ++) {
            this.dataList.push(i + '/' + j)
          }
        }
        for (let i = 1; i <= endMonth; i++) {
          this.dataList.push(endYear + '/' + i)
        }
      }
      let logDateStart = startYear + '-' + startMonth + '-01';
      let logDateEnd = endYear + '-' + endMonth + '-01';
      this.logObj.logDateStart = logDateStart;
      this.logObj.logDateEnd = logDateEnd;
      this.logObj.deviceId = this.setPropsId.deviceId;
      this.getAnalyCharts(this.logObj);
      // this.myChart.setOption(this.chartOption, true);
    },
    currentChange(val) {
      this.page.currentPage = val
      this.listQuery.page = val
      this.getUnitRecord(this.listQuery)
    },
    sizeChange(val) {
      this.page.pageSize = val
      this.listQuery.limit = val
      this.getList(this.listQuery)
    },
    // 放大显示图片
    showImg (url) {
      this.facilityPhoto = url
      this.dialogImage = true
    },
    // 关闭弹窗
    closeImg () {
      this.dialogImage = false
    },
  },
}
export default deviceDetail