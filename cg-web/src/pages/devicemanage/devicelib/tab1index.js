import UnitSelect from "@/components/selectUnit"
import formSearch from '@/components/base/formSearch.vue';
import formDialog from './tab1formDialog.vue';
import loadPop from './pop/load-pop.vue';
import { findDeviceList,initstatue,init,deleteDevice,initializeThreshold,mute } from '@/api/devicemanage/devicelib/devicelib'
import { getDeviceFindList, moreAddObj, getUploadData } from '@/api/public'
import moment from 'moment';
import { mapGetters } from "vuex";
export default {
    components:{
        UnitSelect,
        formDialog,
        formSearch,
        loadPop
    },
    data () {
        return{
            dataSource: [],
            pagination: {
                size:'middle',
                onChange: this.onChange,
                pageSize:8,
                current: 1
            },
            columns: [
                {
                    title: '设备ID',
                    dataIndex: 'deviceId',
                    fixed:'left',
                    width:150
                },
                {
                    title: '设备名称',
                    dataIndex: 'deviceName',
                    fixed:'left',
                    width:150
                },
                {
                    title: '设备识别码',
                    dataIndex: 'deviceCode',
                },
                {
                    title: '所属系统',
                    dataIndex: 'system',
                },
                {
                    title: '设备类型',
                    dataIndex: 'type',
                },
                {
                    title: '设备型号',
                    dataIndex: 'model',
                },
                {
                    title: '启用状态',
                    dataIndex: 'useState',
                    scopedSlots: { customRender: 'useState' },
                },
                {
                    title: '通信状态',
                    dataIndex: 'commStatus',
                    scopedSlots: { customRender: 'status' },
                    width:80,
                    fixed:'right'
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 460,
                    scopedSlots: { customRender: 'operation' },
                    fixed:'right'
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                size:8,
                deviceType:null,
                systemCode:null,
                deviceName:null,
                useState:null
            },
            systemList:[],
            deviceTypeList:[],
            deviceModelList:[],
            useStateList:[{
                label:'启用',
                value:'1'
            },{
                label:'未启用',
                value:'2'
            }],
            useStateObj: {
                '1': '启用',
                '2': '未启用',
            },
            record:null,
            expireDate:null,
            tableLoading:false,
        }
    },
    props:["tabnum"],
    watch:{
        tabnum(){
            if(this.tabnum==1){
                this.getData()
            }
        },
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    created(){
        this.getDictData()
        // this.$uploadmsg({
        //     msgObj: {a:'aaaaaaaaaa'},
        // })
    },
    mounted(){
        this.getData()
    },
    methods:{
        onReset(record){
            console.log(record)
            initializeThreshold({
                deviceModel:record.deviceModel,
                deviceId:record.deviceId
            }).then(res=>{
                if(res && res.data && res.data.success){
                    this.$message.success('恢复成功')
                }else{
                    this.$message.error(res.data.errorMsg)
                }
            })
        },
        refresh(){
            this.getData()
        },
        onDateChange(date, dateString){
            console.log(date)
            this.expireDate=date
            console.log(dateString)
        },
        disabledDate(current) {
            // Can not select days before today and today
            return current && current < moment().endOf('day');
        },
        getDictData(){
            getDeviceFindList({type:1}).then(res=>{
                this.systemList=[]
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        let index = ''
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                            if (s.dataDicDesc == "视频监控") {
                                index = res.data.value.indexOf(s)
                            }
                        })
                        res.data.value.splice(index, 1)
                        this.systemList=res.data.value
                    }
                }
            })
        },
        systemChange (value) {
            getDeviceFindList({type:2,id:value}).then(res=>{
                this.deviceTypeList=[]
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                        this.deviceTypeList=res.data.value
                    }
                }
            })
        },
        typeChange (value) {
            getDeviceFindList({type:3,id:value}).then(res=>{
                this.deviceModelList=[]
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                        this.deviceModelList=res.data.value
                    }
                }
            })
        },
        beforeExcelUpload(file) {
            let obj = new FormData()
            if (file.size > 1024 * 1024) {
              this.$message.error('上传文件大小不能超过1M!');
              return false
            }
            obj.append('file', file)
            this.$refs.loadPop.showModel()
            moreAddObj(obj).then(res => {
              if (res && res.data && res.data.success) {
                this.getUploadData()
              } else {
                this.$refs.loadPop.handleCancel()
                this.$message.error('上传失败');
              }
            })
            return false
        },
        getUploadData () {
            getUploadData().then(res => {
                this.$refs.loadPop.handleCancel()
                if (res && res.data && res.data.success) {
                    this.$uploadmsg({
                        msgObj: res.data.value[0],
                    })
                    this.getData()
                } else {
                    this.$message.error('上传失败');
                }
            })
        },
        uploadSuccess(){
            this.$message({
              type:'success',
              message:'上传成功'
            })
        },
        uploadError(){
            this.$message({
              type:'error',
              message:'上传失败'
            })
        },
        disabledDate(current) {
            // Can not select days before today and today
            return current && current < moment().endOf('day');
        },
        onRegister(record){
            if (!record.isIot || record.isIot == 2) {
                this.$message.info('设备不需要注册')
                return
            }
            init({
                id:record.id,
            }).then(res=>{
                if(res && res.data && res.data.success){
                    this.$message.success('注册成功')
                }else{
                    this.$message.error(res.data.errorMsg)
                }
            })
        },
        onView(record) {
            if (!record.isIot || record.isIot == 2) {
                this.$message.info('设备不需要注册')
                return
            }
            if (!record.nbiotId) {
                this.$message.info('设备未注册')
                return
            }
            initstatue({
                id:record.id
            }).then(res=>{
                if(res && res.data && res.data.success){
                    this.$message.info('注册成功')
                }else{
                    this.$message.info('查询失败')
                }
            })
        },
        onEdit(record){
            this.$refs.formDialog.showDrawer(record, 'edit')
        },
        onDelete(record){
            var that=this
            this.$confirm({
                title: '提示',
                content: `解绑后该单位将查询不到该设备信息`,
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    deleteDevice({param:record.id}).then(res=>{
                        if(res && res.data && res.data.success){
                            that.getData()
                        }else{
                            that.$message.error(res.data.errorMsg)
                        }
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        },
        add(){
            this.$refs.formDialog.showDrawer('', 'add')
        },
        handleSearch(e) {
            e.preventDefault();
            this.params.page = 0
            this.pagination.current = 1
            this.form.validateFields((error, values) => {
                this.params.deviceName=values.deviceName?values.deviceName:null
                this.params.deviceType=values.deviceType?values.deviceType:null
                this.params.systemCode=values.systemCode?values.systemCode:null
                this.params.useState=values.useState?values.useState:null
                this.getData()
            });
        },
        handleReset() {
            this.form.resetFields();
            this.expireDate=null
        },
        getData(){
            this.tableLoading=true
            findDeviceList(this.params).then(res=>{
                this.tableLoading=false
                if(res && res.data && res.data.success){
                    if(res.data.value.content && res.data.value.content.length){
                        res.data.value.content.forEach(s=>{
                            s.key=s.id
                            s.commStatus=s.commStatus!='0'?false:true
                        })
                    }
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    pagination.pageSize = res.data.value.size
                    this.dataSource=res.data.value.content
                    this.pagination = pagination;
                }
            })
        },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        },
        stateChange(record){
            mute({
                mute:record.commStatus?'FALSE':'TRUE',
                id:record.id
            }).then(res=>{
                if(res && res.data && res.data.success){
                    this.$message.success('操作成功')
                }else{
                    this.$message.error(res.data.errorMsg)
                }
            })
        },
        rowClassName (record) {
            let className = '';
            if (this.rowLight == record.id) {
                className = 'light-row';
            }
            return className;
        },
    }
}