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
  //   components: {
  //     'device-position': DevicePosition,
  //     'image-view': ImageView
  //   },
  props:{
    setPropsId:Object
  },

  data() {
    return {
      dialogVisibleRemote: true,
      type: {
        prop: 'tab1'
      },
      radio:1,
      textarea: '',
      data: {
        radioList:[{
          id:1,
          label:1,
          value:"收到警情，报警消音"
        },{
          id:2,
          label:2,
          value:"隐患排除，远程复位"
        },{
          id:3,
          label:3,
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
      operationFeedback:'',
      operationType:'',
      OperationList:[],
      Operationres:'',
      timeout:false,
      operationdesc:'',
      search: {
        createTimeStart: '',
        createTimeEnd: '',
      },
      percentage:0,
      isProgressing:false
    }
  },
  created() {
    this.getAllUser()
  },
  mounted() {
    setTimeout(() => {
      this.filter()
    })
    this.OperationList=['消音','复位']
    // if(this.setPropsId.deviceType==26){
    //   this.OperationList=['屏蔽']
    // }
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
      console.log(params)
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
    //消声
    mute(data){
      //操作类型
      this.Operationres=data
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
    // 确定按钮
    submit() {
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
          this.operationdesc='收到警情，报警消音'
        }else if(this.radio==2){
          this.operationdesc='隐患排除，远程复位'
        }else{
          this.operationdesc=this.textarea
        }
        if(this.Operationres=='消音'){
          cmd = "f5";
          operationFeedback = '远程消音成功';
          operationType = 1;
        }
        if(this.Operationres == '复位'){
          cmd = "f4";
          operationFeedback = '远程复位成功';
          operationType = 2;
        }
        mute({
          cmd: cmd,
          nbiotId:this.setPropsId.nbiotId,
          deviceId:this.setPropsId.deviceId,
          statusDes:this.setPropsId.statusDes,
          deviceId2:this.setPropsId.deviceId2?this.setPropsId.deviceId2:'',
        }).then(res => {
          if (res && res.data && res.data.code == 0) {
            this.$message({
              type:'success',
              message:res.data.data
            })
            clearInterval(timer)
            this.percentage=100
            this.isProgressing=false

            setTimeout(()=>{
              this.dialogVisibleRemote=false
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
            this.dialogVisibleRemote=false
            this.$emit('handleClose')
          }
          console.log(res)
          if(!res.code){
            this.operationFeedback=operationFeedback
            this.operationType=operationType
            //保存屏蔽操作记录
            update({
              "deviceId":this.setPropsId.deviceId,
              "operationFeedback":this.operationFeedback,
              "operationType":this.operationType,
              "operationDes":this.operationdesc,
            }).then(res => {
              console.log(res)
            })
          }
        })
      }
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