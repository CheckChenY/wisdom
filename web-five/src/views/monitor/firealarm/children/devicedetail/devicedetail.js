import DevicePosition from '@/components/public/device-position'
import processing from '@/components/monitor/processing'
import {
  statusOption
} from '@/const/monitor/firealarm'
import {
  getObj,
  fetchFloorList
} from "@/api/unit/floor";
import { getInfoTracking } from "@/api/monitor/industry";
import { findAllUser } from '@/api/public'
import ImageView from '@/components/public/image-view'
import { getDict } from '@/api/unit/dict'
import { fetchList } from '@/api/unit/building'
import {
  getEquipment, //设备信息
  getMotesystem, //當前狀態
  getUnitdevice, //相關圖片
  getRecord, //相關記錄
  getAnaly, //状态分析
} from '@/api/monitor/firewirless'
import {
  getWarnMsg
} from "@/util/warn";
let deviceDetail = {
  name: 'deviceDetailDialog',
  components: {
    'device-position': DevicePosition,
    'image-view': ImageView,
    processing
  },
  props:["setPropsId","deviceData"],
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
          label: '状态记录',
          prop: 'tab5',
        }, {
          // icon:'el-icon-warning',
          label: '状态分析',
          prop: 'tab6',
        }]
      },
      // 
      RstatusSteps: [],
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
      discribution:{},//当前状态描述
      distext:"",//状态描述
      myChart: '',
      dialogImage: false,
      facilityPhoto: '',
      tabOneData: {
        useStatus: "",
        deviceId: "", //设备ID
        deviceName: "", //设备名称
        deviceCode: "", //设备标识码
        deviceType: "", //设备类型
        buildingId: "", //所在建筑

        floorId: "", //设备楼层
        location: "", //设备安装位置
        areaCode: "", //设备区号
        loopNumber: "", //设备回路号
        pointNumber: "", //设备点位号

        installTime: "", //安装时间
        deviceModel: "", //设备型号
        softwareVersion: "", //软件版本
        manufacturer: "", //生产厂家
        manufactureDate: "", //生产日期

        validityTerm: "", //有效期
        warnState: "", //设备使用状态
        surroundingPhoto: "", //周边图
      },
      offlineAmount: [], //离线设备数量
      alarmAmount: [], //报警设备数量
      faultAmount: [], //故障数量
      dataList: [], //x轴日期坐标
      logObj: {
        logDateStart: "",
        logDateEnd: "",
        deviceId: "",
      },
      listQuery: {
        page: 1,
        limit: 6,
        deviceId: ''
      },
      src: 'http://192.168.0.188:8080/www/index.html?ip=RSV1805011970028&post=9988&username=admin&password=admin',
      planFloor:"",
      pointSign:"",
      deviceTypeDic:{},
      buildingDic:{},
      floorDic:{},
      warnStateDic:{},
      timeout:false,
      degreeOptions: [],
      useStatusDic: [],
      showProcess: false,
      processoptions: [],
      allUser: [],
      search: {
        createTimeStart: '',
        createTimeEnd: '',
      },
      statusDes: '',
    }
  },
  created() {
    this.getData()
    this.getEquipmentInt(this.setPropsId.id);
    this.getAllUser()
  },
  mounted() {
    setTimeout(() => {
      this.filter()
    })
    this.getUnitdeviceImg(this.setPropsId.deviceId);
  },
  methods: {
    getData(){
      getDict('device_type').then(res=>{
        if(res.data.data.length){
          var obj={}
          res.data.data.forEach(s=>{
            obj[s.value]=s.label
          })
          this.deviceTypeDic=obj
        }
      })
      getDict('device_status').then(res=>{
        if(res.data.data.length){
            var obj={}
            res.data.data.forEach(s=>{
                obj[s.value]=s.label
            })
            this.useStatusDic=obj
        }
      })
      getDict('warn_state').then(res=>{
        if(res.data.data.length){
          var obj={}
          res.data.data.forEach(s=>{
            obj[s.value]=s.label
          })
          this.warnStateDic=obj
          this.tableOption.column[1].dicData=res.data.data
        }
      })
      getDict("warn_level").then(res => {
        if (res && res.data) {
            this.degreeOptions = res.data.data;
        }
      });
      getDict("alert_confirm").then(res => {
        this.processoptions = res.data.data;
      });
      fetchFloorList().then(res=>{
        if(res.data.data.length){
          var obj={}
          res.data.data.forEach(s=>{
            obj[s.id]=s.floorCode
          })
          this.floorDic=obj
        }
      })
      fetchList().then(res=>{
        if(res.data.data.length){
          var obj={}
          res.data.data.forEach(s=>{
            obj[s.id]=s.buildingCode
          })
          this.buildingDic=obj
        }
      })
    },
    //设备信息
    getEquipmentInt(id) {
      getEquipment(id).then(res => {
        if (res && res.data) {
          let dataList = res.data.data
          this.tabOneData.useStatus = dataList.useStatus//所在建筑
          this.tabOneData.deviceId = dataList.deviceId //设备名称
          this.tabOneData.deviceName = dataList.deviceName //设备名称
          this.tabOneData.deviceCode = dataList.deviceCode //设备标识码
          this.tabOneData.deviceType = dataList.deviceType //设备类型
          this.tabOneData.buildingId = dataList.buildingId //所在建筑

          this.tabOneData.floorId = dataList.floorId //设备楼层
          this.tabOneData.location = dataList.location //设备安装位置
          this.tabOneData.areaCode = dataList.areaCode //设备区号
          this.tabOneData.loopNumber = dataList.loopNumber //设备回路号
          this.tabOneData.pointNumber = dataList.pointNumber //设备点位号

          this.tabOneData.installTime = dataList.installTime //安装时间
          this.tabOneData.deviceModel = dataList.deviceModel //设备型号
          this.tabOneData.softwareVersion = dataList.softwareVersion //软件版本
          this.tabOneData.manufacturer = dataList.manufacturer //生产厂家
          this.tabOneData.manufactureDate = dataList.manufactureDate //生产日期

          this.tabOneData.validityTerm = dataList.validityTerm //有效期
          this.tabOneData.warnState = dataList.warnState //设备使用状态
          this.tabOneData.modelPhoto = dataList.modelPhoto //设备型号图
          this.tabOneData.surroundingPhoto = dataList.surroundingPhoto //周边图
        }
      })
    },
    // 弹窗关闭前
    handleClose() {
      this.$emit('handleClose')
    },
    // 选择页签
    handleTabChange(column) {
      this.type = column
      if (column.prop == 'tab1') {
        this.getEquipmentInt(this.setPropsId.id);
      } else if (column.prop == 'tab2') {
        this.getCurrentStatus(this.setPropsId.deviceId);
      } else if (column.prop == 'tab3') {
        this.getUnitdeviceImg(this.setPropsId.deviceId);
      } else if (column.prop == 'tab5') {
        this.listQuery.deviceId = this.setPropsId.deviceId;
        this.getUnitRecord(this.listQuery);
      } else if (column.prop == 'tab6') {
        this.getAnalyCharts({
          deviceId: this.setPropsId.deviceId
        });
      }
    },
    // 去除h5中 &nbsp;
    filter() {
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
    },
    // 当前状态
    getCurrentStatus(id) {
      getMotesystem(id).then(res => {
        // console.log(this.setPropsId);
        var stutasData = res.data.data;
        if (stutasData) {
          this.discribution = stutasData;
          if (stutasData.createTime != null) {
            this.discribution.createTime = stutasData.createTime.replace(
              "T",
              " "
            ).split('.')[0];
          }
          if (stutasData.dealCreateTime != null) {
            this.discribution.dealCreateTime = stutasData.dealCreateTime.replace(
              "T",
              " "
            ).split('.')[0];
          }
          this.distext = getWarnMsg(stutasData)
        }
        if (stutasData != null) {
            if (stutasData.createTime && stutasData.createTime != null) {
                var createTime = stutasData.createTime.replace("T", " ").split('.')[0];
                let wl = this.degreeOptions.filter(s => s.value == stutasData.warnLevel)
              let item = {
                timestamp: '',
                content: '',
              }
              item.timestamp = createTime;
              item.content =
                stutasData.deviceName +
                ",位于 " +
                this.setPropsId.$buildingId +
                ", " +
                this.setPropsId.$floorId +
                ", " +
                this.setPropsId.location +
                ", " +
                " 当前状态: " +
                this.setPropsId.$warnState;
                if (wl.length > 0) {
                  item.content = item.content +
                  ", " +
                  " 报警程度: " +
                  wl.length > 0? wl[0].label: '';
                }
                item.content = item.content + ' 状态描述: ' + this.distext
              this.RstatusSteps = [item]
            } else {
                this.RstatusSteps.splice(0, this.RstatusSteps.length);
            }
        } else {
            this.RstatusSteps.splice(0, this.RstatusSteps.length);
        }
        if (stutasData != null) {
          let warnConfirmor, firstViewer, warnConfirmType
          let arr1 = this.allUser.filter(s => s.id == stutasData.warnConfirmor)
          let arr2 = this.allUser.filter(s => s.id == stutasData.firstViewer)
          let arr3 = this.processoptions.filter(s => s.value == stutasData.warnConfirmType)
          if (arr1.length > 0) warnConfirmor = [0].realName
          if (arr2.length > 0) firstViewer = [0].realName
          if (arr3.length > 0) warnConfirmType = [0].label
          if (stutasData.warnConfirmTime && stutasData.warnConfirmTime != null) {
            var warnConfirmTime = stutasData.warnConfirmTime.replace("T", " ");
            let item = {
              timestamp: '',
              content: '',
            }
            item.timestamp = warnConfirmTime;
            item.content =
                "确认人: " +
                warnConfirmor +
                "   安全确认人确认该警情为: " +
                warnConfirmType +
                "   确认说明: " +
                stutasData.warnConfirmDes;
            this.RstatusSteps.push(item)
          } else {
              this.RstatusSteps.splice(2, this.RstatusSteps.length);
          }
          if (stutasData.firstViewTime && stutasData.firstViewTime != null) {
            var firstViewTime = stutasData.firstViewTime.replace("T", " ");
            let item = {
              timestamp: '',
              content: '',
            }
            item.timestamp = firstViewTime;
            item.content =
                "值班人员: " +
                firstViewer +
                "   安全管理人处理警情为: " +
                stutasData.warnDealDes;
            this.RstatusSteps.push(item)
          } else {
              this.RstatusSteps.splice(1, this.RstatusSteps.length);
          }
        } else {
            this.RstatusSteps.splice(0, this.RstatusSteps.length);
        }
      })
    },
    // 获取用户列表
    getAllUser () {
      findAllUser().then(res => {
        if (res && res.data && res.data.code == '0') {
          this.allUser = res.data.data
        }
      })
    },
    //相关图片
    getUnitdeviceImg(id) {
      getUnitdevice(id).then(res => {
        this.pointSign = res.data.data.pointSign;
        this.statusDes = res.data.data.statusDes;
        getObj(res.data.data.floorId).then(resdata => {
          this.planFloor =resdata.data.data.plan
        })
        // debugger;
      })
    },
    //相关记录
    getUnitRecord(id) {
      this.tableLoading = true
      getRecord(id).then(res => {
        if (res && res.data) {
          let data = res.data.data;
          data.forEach(s=>{
            s.statusDes = this.statusDes
            s.stateDesc = getWarnMsg(s)
          })
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
    getAnalyCharts(obj) {
      this.offlineAmount=[]
      this.alarmAmount=[]
      this.faultAmount=[]
      this.dataList=[]
      getAnaly(obj).then(res => {
        if (res && res.data) {
          let data = res.data.data
          if (data.length <= 0) return
          for (let i = 0, len = data.length; i < len; i++) {
            this.offlineAmount.push(data[i].offlineAmount)
            this.alarmAmount.push(data[i].alarmAmount)
            this.faultAmount.push(data[i].faultAmount)
            this.dataList.push(data[i].logDate.substring(0, 7))
          }
          setTimeout(() => {
            this.lineChart()
          })
        }
      })
    },
    // 提交密码
    submitPass() {
      this.passwordShow = false
      this.smokeAlarmShow = false
      this.intervalShow = false
      this.buttonText = '保存'
    },
    // 修改设备参数
    changeStatus() {
      if (this.buttonText == '修改') {
        this.passwordShow = true
      } else {
        this.smokeAlarmShow = true
        this.intervalShow = true
        this.buttonText = '修改'
      }
    },
    // 取消按钮
    cancel() {
      this.$emit('handleClose')
    },
    // 确定按钮
    submit() {
      this.$emit('handleClose')
    },
    // 搜索
    searchChange() {
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
    lineChart() {
      var dom = document.getElementById("echart");
      this.myChart = this.$echarts.init(dom);
      this.myChart.clear()
      
      this.chartOption = {
        title: {
          text: '状态趋势'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['报警', '故障', '离线', '正常']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          x: '1000',
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.dataList,
        },
        yAxis: {
          name: '数量：次',
          type: 'value',
        },
        series: [{
          name: '报警',
          type: 'line',
          data: this.alarmAmount,
          itemStyle: {
            color: '#fd3e3c'
          },
          lineStyle: {
            color: '#fd3e3c'
          },
        }, {
          name: '故障',
          type: 'line',
          data: this.faultAmount,
          itemStyle: {
            color: '#ffbb2a'
          },
          lineStyle: {
            color: '#ffbb2a'
          },
        }, {
          name: '离线',
          type: 'line',
          data: this.offlineAmount,
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
    dateSearch() {
      this.getAnalyCharts({
        deviceId: this.setPropsId.deviceId,
        createTimeStart:this.statusDateStart?this.statusDateStart.format('yyyy-MM-dd'):'',
        createTimeEnd:this.statusDateEnd?this.statusDateEnd.format('yyyy-MM-dd'):''
      });
      this.myChart.setOption(this.chartOption, true);
    },
    // 放大显示图片
    showImg(url) {
      this.facilityPhoto = url
      this.dialogImage = true
    },
    // 关闭弹窗
    closeImg() {
      this.dialogImage = false
    },
    // 前往处理
    dealWith () {
      if (this.discribution) {
        this.showProcess = true
      } else {
        this.$message('没有报警信息');
      }
    },
    // 关闭弹窗
    closeDealWith () {
      setTimeout(() => {
        this.showProcess = false
        this.handleTabChange( {
          label: '当前状态',
          prop: 'tab2',
        })
      }, 1500)
    }
  },
}
export default deviceDetail