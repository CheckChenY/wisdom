import {
  tableOption
} from '@/const/monitor/firealarm'

import {
  getWaringTree, //获取设备类型树
  searchTableList,
} from '@/api/monitor/firewirless'

import {
  fetchTree,
  fetchFloorList
} from '@/api/unit/floor'
import {
  getDict
} from '@/api/unit/dict'

import deviceDetailDialog from './children/devicedetail/devicedetail.vue'
import StatistiAnalysis from '@/components/public/statisti-analysis.vue'
import {
  analysisList,
  analysisListone
} from "@/api/monitor/industry";
let indexObj = 0,
  arrayObj = []
let firealarm = {
  name: "fire_alarm",
  components: {
    'device-detail-dialog': deviceDetailDialog,
    'statisti-analysis': StatistiAnalysis
  },
  data() {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      listQuery: {
        page: 1,
        limit: 10,
        systemId: 1,
      },
      tableLoading: false,
      tableOption: tableOption,
      floorData: [],
      deviceDetailShow: false,
      search: {
        slot: ''
      },
      dialogVisible: false, //设备类型弹窗
      equipmentData: [], //设备类型树
      defaultProps: {
        children: "children",
        label: "label",
        id: "id"
      },
      // 树形过滤
      filterNode(value, data) {
        console.log(data);
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      filterText: '', //搜索字段
      treepanId: '',
      typeValue: '',
      setData: '',
      deviceDataList:[],
      type: {
        prop: 'tab1'
      },
      option: {
        column: [{
          // icon:'el-icon-info',
          label: '设备实时检测列表',
          prop: 'tab1',
        }, {
          // icon:'el-icon-warning',
          label: '统计分析',
          prop: 'tab2',
        }]
      },
      echartsdatax: [],
      echartsdatay: [],
      elshownum: {},
      timeout:false,
      warnState:''
    };
  },
  created() {
    this.getList(this.listQuery)
    this.getWaring();
    this.tableOption.column[3].click = ({ value }) => {
      this.getFloorTree(value)
    }
    
    this.getBuildingTree();
    // this.getSystemType()
    this.statusType()
  },
  watch: {
    filterText(val) {
      this.$refs.typeref.filter(val);
    },
    // deep:true
  },
  mounted: function () {
    setTimeout(() => {
      this.filter()
    })
    this.getEchartdata()

    this.tableOption.column[6].change = ({value}) => {
      console.log(value)
      this.warnState=value
    }
  },
  computed: {},
  methods: {
    //获取表单数据
    getList(params) {
      this.tableLoading = true
      searchTableList(params).then(response => {
        console.log(response)
        if (response && response.data && response.data.code == 0) {
          setTimeout(() => {
            this.tableLoading = false
          }, 1000) 
          this.tableData = response.data.data
          this.page.total = response.data.total
        }
      }).catch(error=>{
        this.tableLoading = false
        if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
          this.timeout=true
        }
      })
    },
    // 获取统计图数据
    getEchartdata() {
      analysisList(1).then(res => {
        // console.log(res)
        this.echartsdatay = res.data.data
      })
      // 获取最近一天数据
      analysisListone({systemType:1}).then(res => {
        // console.log(res)
        this.elshownum = res.data.data;
      })

      getDict("alarm_status").then(res => {
        // console.log(res)
        this.echartsdatax = res.data.data
      })
    },
    // 选择页签
    handleTabChange(column) {
      this.type = column
      this.getEchartdata()
    },
    currentChange(val) {
      this.page.currentPage = val
      this.listQuery.page = val
      this.getList(this.listQuery)
    },
    sizeChange(val) {
      this.page.pageSize = val
      this.listQuery.limit = val
      this.getList(this.listQuery)
    },
    /**
     * @title 查看弹窗
     * @detail 调用crud的handleShow方法即可
     *
     **/
    handleShow: function (row,index) {
      this.deviceDetailShow = true
      this.setData = row;
    },
    /**
     * 刷新回调
     */
    refreshChange() {
      this.getList(this.listQuery)
    },
    // 获取建筑树
    getBuildingTree() {
      fetchTree({
        limit: 100,
      }).then(res => {
        if (res && res.data && res.data.data) {
          let data = res.data.data
          this.$set(this.tableOption.column[3].dicData.splice(0, this.tableOption.column[3].dicData.length))
          if (data.building) {
            for (let i = 0, len = data.building.length; i < len; i++) {
              let dict = {
                value: data.building[i].id,
                label: data.building[i].buildingCode,
              }
              this.tableOption.column[3].dicData.push(dict)
            }
            arrayObj = this.tableOption.column[3].dicData.concat()
            this.callSelfFloor()
            this.tableOption.column[3].valueDefault = data.building[0].id
          }
        }
      })
    },
    // 递归遍历建筑
    callSelfFloor() {
      if (arrayObj[indexObj]) {
        this.getFloorAllTree(arrayObj[indexObj].value).then(() => {
          indexObj++
          if (indexObj > arrayObj.length) {
            arrayObj = []
            indexObj = 0
            return
          }
          this.callSelfFloor()
        })
      }
    },
    // 获取全部楼层
    getFloorAllTree(id) {
      return new Promise((resolve, reject) => {
        fetchFloorList({
          buildingId: id,
          limit: 200,
        }).then(res => {
          if (res && res.data && res.data.data) {
            let data = res.data.data
            for (let i = 0, len = data.length; i < len; i++) {
              let dict = {
                value: data[i].id,
                label: data[i].floorCode,
              }
              if (this.tableOption.column[4].dicData.indexOf(dict) == -1) {
                this.tableOption.column[4].dicData.push(dict)
              }
            }
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    // 获取楼层
    getFloorTree(id) {
      fetchFloorList({
        buildingId: id,
        limit: 200,
      }).then(res => {
        if (res && res.data && res.data.data) {
          let data = res.data.data
          this.$set(this.floorData.splice(0, this.floorData.length))
          for (let i = 0, len = data.length; i < len; i++) {
            let dict = {
              value: data[i].id,
              label: data[i].floorCode,
            }
            this.floorData.push(dict)
          }
        }
      })
    },
    // 获取警告类型
    getWaring() {
      getWaringTree({
        type: "device_type,system_type",
        level: "1"
      }).then(res => {
        if (res && res.data) {
          for (var ins in res.data.data.filter(s=>s.value==1)) {
            res.data.data.filter(s=>s.value==1)[ins].disabled = true;
          }
          this.equipmentData = res.data.data.filter(s=>s.value==1);
          this.getSystemType(this.equipmentData);
        }
      })
    },
    inputClick(val) {
      console.log(val);
      this.search.slot=''
      this.treepanId=''
      this.dialogVisible = true
      this.getWaring();
    },
    // 多选发生改变
    handleNodeClick(item, node, self) {
      // console.log(item);
      //console.log(data);
      //console.log(node);
      if(item.children.length){
          return
      }
      if (node == true) {
        this.treepanId = item.value;
        this.search.slot = item.label;
        this.$refs.typeref.setCheckedNodes([item]);
      }
    },
    // 多选点击已选
    nodeClick(item, node, self) {
      if(item.children.length){
          return
      }
      this.treepanId = item.value;
      this.search.slot = item.label;
      this.$refs.typeref.setCheckedNodes([item]);
    },
    // 获取系统类型
    getSystemType(data){
      this.tableOption.column[2].dicData = []
      for(let i=0; i < data.length; i++){
          for(let j=0; j< data[i].children.length;j++){
              let obj = {
                  label:data[i].children[j].label,
                  value:data[i].children[j].value
              }
              this.tableOption.column[2].dicData.push(obj)
          }
      }

      this.deviceDataList = this.tableOption.column[2].dicData;


    },
    // 搜索
    searchChange(params) {
      console.log(params)
      // params.page = this.listQuery.page;
      params.page = 1
      params.limit = this.listQuery.limit;
      params.systemId = this.listQuery.systemId;
      params.deviceType = this.treepanId;
      searchTableList(params).then(res=>{
        if(res && res.data && res.data.data){
            this.tableData = res.data.data;
            this.page.total = res.data.total;
        }
    })

      // this.$message.success(JSON.stringify(Object.assign(params)));
      // this.search.installTimeStart = this.search.install_time[0].format('yyyy-MM-dd')
      // this.search.installTimeEnd = this.search.install_time[1].format('yyyy-MM-dd')
      // let search = deepClone(this.search)
      // debugger;
      // delete search.install_time
      // console.log(search)
      // this.getList(Object.assign(this.listQuery, search))
    },
    // 重置搜索
    searchReset() {
      // this.search = {};
    },
    // 去除h5中 &nbsp;
    filter() {
      let tab0 = document.getElementById('tab-0')
      tab0.innerHTML = tab0.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
      let tab1 = document.getElementById('tab-1')
      tab1.innerHTML = tab1.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
    },
    // 关闭弹窗
    handleClose() {
      this.deviceDetailShow = false
      this.dialogVisible = false;
    },
    // 状态选择
    statusType() {
      getDict("warn_state").then(res => {
        if (res && res.data) {
          this.tableOption.column[6].dicData = res.data.data
        }
      });
    },
  }
};
export default firealarm