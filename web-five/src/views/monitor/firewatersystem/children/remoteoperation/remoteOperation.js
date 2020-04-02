import { operationOption } from '@/const/monitor/remoteOperation'
// import DevicePosition from '@/components/public/device-position'
// import ImageView from '@/components/public/image-view'
import {
  getOperatRecord,
  update,//更新记录
  mute, //消声
} from '@/api/public'
let deviceDetail = {
  name: 'deviceDetailDialog',
  //   components: {
  //     'device-position': DevicePosition,
  //     'image-view': ImageView
  //   },
  props: ["setPropsId"],

  data() {
    return {
      dialogVisible: true,
      type: {
        prop: 'tab1'
      },
      radio: '设备报警，屏蔽并处理',
      textarea: '',
      data: {
        radioList: [{
          id: 1,
          label: '设备报警，屏蔽并处理',
          value: "设备报警，屏蔽并处理"
        },{
          id: 2,
          label: '其他，请填写说明',
          value: "其他，请填写说明"
        }]
      },
      option: {
        column: [{
          // icon:'el-icon-info',
          label: '远程操作',
          prop: 'tab1',
        },
        {
          // icon:'el-icon-warning',
          label: '操作记录',
          prop: 'tab2',
        },]
      },
      form: {
        smokeAlarmValue: '',
        interval: ''
      },
      smokeAlarmShow: true,
      intervalShow: true,
      buttonText: '修改',
      tableLoading: false,
      page: {
        total: 3, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      tableData: [],
      tableOption: operationOption,
      statusDateStart: '',
      statusDateEnd: '',
      chartOption: null,
      myChart: '',
      dialogImage: false,
      facilityPhoto: '',
      operationFeedback:'',
      operationType:'',
      OperationList:[],
      operationRes:'',
      timeout:false,
      search: {
        createTimeStart: '',
        createTimeEnd: '',
      },
    }
  },
  created() {

  },
  mounted() {
    setTimeout(() => {
      this.filter()
    })
    if(this.setPropsId.deviceType==26){
      this.OperationList=['屏蔽']
    }
  },
  methods: {
    //消声
    mute(data){
      //操作类型
      this.operationRes=data
    },
    // 弹窗关闭前
    handleClose() {
      this.$emit('handleClose')
    },
    // 选择页签
    handleTabChange(column) {
      this.type = column
      if (column.prop == 'tab1') {
        // this.getBaseInfo()
      }else{
        let obj = {
          deviceId:this.setPropsId.deviceId,
          page: this.page.currentPage,
          limit: this.page.pageSize
        }
        this.getData(obj)
      }
    },
    getData(params){
      this.tableLoading = true
      getOperatRecord(params).then(res=>{
        if (res && res.data && res.data.data) {
          this.tableData = res.data.data
          this.page.total = res.data.total
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
    },
    // 取消按钮
    cancel() {
      this.$emit('handleClose')
    },
    // 确定按钮
    submit() {
      if(this.radio=='其他，请填写说明'){
        this.radio=this.textarea
      }
      if(this.operationRes=='屏蔽'){
        console.log(this.setPropsId.deviceId)
        mute({
            cmd: "f5",
            nbiotId:this.setPropsId.nbiotId,
            deviceId:this.setPropsId.deviceId,
            statusDes:this.setPropsId.statusDes,
            deviceId2:this.setPropsId.deviceId2?this.setPropsId.deviceId2:'',
        }).then(res => {
          console.log(res)
          if(!res.code){
            this.operationFeedback='远程屏蔽成功'
            this.operationType=1
            //保存屏蔽操作记录
            update({
              "deviceId":this.setPropsId.deviceId,
              "operationFeedback":this.operationFeedback,
              "operationType":this.operationType,
              "operationDes":this.radio,
            }).then(res => {
              this.radio='设备报警，屏蔽并处理'
              console.log(res)
            })
          }
        })
      }
      console.log(this.radio)
      // this.$emit('handleClose')
    },
    currentChange(val){
      this.page.currentPage=val
      let obj = {
        deviceId:this.setPropsId.deviceId,
        page: this.page.currentPage,
        limit: this.page.pageSize
      }
      this.getData(obj)
    },
    // 搜索
    searchChange(params) {
      let obj = {
        deviceId:this.setPropsId.deviceId,
        page: this.page.currentPage,
        limit: this.page.pageSize
      }
      if (params.operationType >= 0) obj.operationType = params.operationType
      obj.createTimeStart = this.search.createTimeStart ? this.search.createTimeStart.format('yyyy-MM-dd'): ''
      obj.createTimeEnd = this.search.createTimeEnd ? this.search.createTimeEnd.format('yyyy-MM-dd'): ''
      this.getData(obj)
    },
    //相关记录弹窗数据情况
    searchReset () {
        this.search.createTimeStart = ''
        this.search.createTimeEnd = ''
    },
  },
}
export default deviceDetail