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
  props: ["setPropsId"],
//   components: {
//     'device-position': DevicePosition,
//     'image-view': ImageView
//   },
  data () {
    return {
      dialogVisible: true,
      type: {
        prop: 'tab1'
      },
      radio: 1,
      textarea: '',
      data:{
        radioList:[{
          id:1,
          label:1,
          value:"日常巡查，设备自检"
        },{
          id:2,
          label:2,
          value:"收到警情，报警消音"
        },{
          id:3,
          label:3,
          value:"隐患排除，远程复位"
        },{
          id:4,
          label:4,
          value:"短路过载，紧急断电"
        },{
          id:5,
          label:5,
          value:"其他，请填写说明"
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
      OperationList:[],
      Operationres:'',
      operationdesc:'',
      operationFeedback:'',
      operationType:'',
      timeout:false,
      search: {
        createTimeStart: '',
        createTimeEnd: '',
      },
    }
  },
  created () {

  },
  mounted() {
    setTimeout(() => {
      this.filter()
    })
  },
  methods: {
    // 弹窗关闭前
    handleClose () {
      this.$emit('handleClose')
    },
    // 选择页签
    handleTabChange(column) {
      this.type = column
      if (column.prop == 'tab1') {
        // this.getBaseInfo()
      } else {
        let obj = {
          deviceId:this.setPropsId.deviceId,
          page: this.page.currentPage,
          limit: this.page.pageSize
        }
        this.getData(obj)
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
    },
    // 取消按钮
    cancel () {
      this.$emit('handleClose')
    },
    // 确定按钮
    submit () {
      this.$emit('handleClose')
      if(this.radio==1){
        this.operationdesc='检查设备情况，设备自检'
      }else if(this.radio==2){
        this.operationdesc='隐患排除，远程复位'
      }else{
        this.operationdesc=this.textarea
      }
      
      if(this.Operationres=='消音'){
        mute({
            cmd: "f5",
            nbiotId:this.setPropsId.nbiotId,
            deviceId:this.setPropsId.deviceId,
            statusDes:this.setPropsId.statusDes,
            deviceId2:this.setPropsId.deviceId2?this.setPropsId.deviceId2:'',
        }).then(res => {
          console.log(res)
          if(!res.code){
            this.operationFeedback='远程消音成功'
            this.operationType=1
            //保存消音操作记录
            update({
              "deviceId":this.setPropsId.deviceId,
              "operationFeedback":this.operationFeedback,
              "operationType":this.operationType,
              "operationDes":this.operationdesc,
            }).then(res => {
              this.radio=1
              console.log(res)
            })
          }
        })
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