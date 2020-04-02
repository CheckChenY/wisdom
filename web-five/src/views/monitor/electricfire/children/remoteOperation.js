import { operationOption } from '@/const/monitor/remoteOperation'

// import DevicePosition from '@/components/public/device-position'
// import ImageView from '@/components/public/image-view'
import {
  getOperatRecord,
  update,//更新记录
  mute, //消声
  findAllUser,
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
      timeout:false,
      search: {
        createTimeStart: '',
        createTimeEnd: '',
      },
      percentage:0,
      isProgressing:false
    }
  },
  created () {
    this.getAllUser()
  },
  mounted() {
    setTimeout(() => {
      this.filter()
    })
    this.OperationList=['自检','消音','复位']
  },
  methods: {
    sizeChange(val){
      this.page.pageSize=val
      let obj = {
        deviceId:this.setPropsId.deviceId,
        page: this.page.currentPage,
        limit: this.page.pageSize
      }
      this.getData(obj)
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
    selectoperation(data){
      this.Operationres=data
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
      }else{
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
    // 0xf1 远程上电 0xf2 远程断电 0xf3 远程自检 0xf4 远程复位 0xf5 远程消音 0xfd 远程升级
    //  operationType 自检: 0  消音: 1  复位: 2  动作: 3  屏蔽: 4
    submit () {
      // this.$emit('handleClose') 
      if(!this.Operationres){
        this.$message({
          type:'error',
          message:'请选择远程操作类型'
        })
        return
      }
      //进度条
      if(!this.isProgressing){
        this.isProgressing=true
        var timer=setInterval(()=>{
          this.percentage=this.percentage+1
          if(this.percentage==95){
            clearInterval(timer)
          }
        },300)

        let cmd, operationFeedback, operationType;
        if(this.radio==1){
          this.operationdesc='日常巡查，设备自检'
        }else if(this.radio==2){
          this.operationdesc='收到警情，报警消音'
        }else if(this.radio==3){
          this.operationdesc='隐患排除，远程复位'
        }else{
          this.operationdesc=this.textarea
        }
        if(this.Operationres=='消音'){
          cmd = "f5";
          operationFeedback = '远程消音成功';
          operationType = 1;
        }
        if(this.Operationres == '自检'){
          cmd = "f3";
          operationFeedback = '远程自检成功';
          operationType = 0;
        }
        if(this.Operationres == '复位'){
          cmd = "f4";
          operationFeedback = '远程复位成功';
          operationType = 2;
        }
        mute({
          cmd: cmd,
          nbiotId: this.setPropsId.nbiotId,
          deviceId: this.setPropsId.deviceId,
          statusDes:this.setPropsId.statusDes,
          deviceId2:this.setPropsId.deviceId2?this.setPropsId.deviceId2:'',
        }).then(res => {
          console.log(res)
          if (res && res.data && res.data.code == 0) {
            this.$message({
              type:'success',
              message:res.data.data
            })
            clearInterval(timer)
            this.percentage=100
            this.isProgressing=false

            setTimeout(()=>{
              this.dialogVisible=false
              this.$emit('handleClose')
            },1500)
          } else {
            this.$message({
              type:'error',
              message:res.data.data,
            })
            clearInterval(timer)
            this.percentage=0
            this.isProgressing=false
            this.dialogVisible=false
            this.$emit('handleClose')
          }
          if(!res.code){
            //保存消音操作记录
            update({
              "deviceId":this.setPropsId.deviceId,
              "operationFeedback": operationFeedback,
              "operationType": operationType,
              "operationDes":this.operationdesc,
            }).then(res => {
              
            })
          }
        })
      }
    },
    // 获取用户列表
    getAllUser () {
      findAllUser().then(res => {
        if (res && res.data && res.data.code == '0') {
          for (let i = 0, len = res.data.data.length; i < len; i++) {
            let item = {
              label: res.data.data[i].realName,
              value: res.data.data[i].id
            }
            this.tableOption.column[1].dicData.push(item)
          }
        }
      })
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