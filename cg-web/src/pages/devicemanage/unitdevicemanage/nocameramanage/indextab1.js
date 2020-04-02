import UnitSelect from "@/components/selectUnit"
import formDialog from './formDialog.vue';
import { findDevicePageList,unbundleDevice,unbundleDeviceBatch } from '@/api/devicemanage/unitdevicemanage'
import { getDeviceFindList } from '@/api/public'
import moment from 'moment';
import { mapGetters } from "vuex";
export default {
    components:{
        UnitSelect,
        formDialog
    },
    data () {
        return{
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                current:1,
                pageSize: 6,
            },
            columns: [
                {
                    title: '设备名称',
                    dataIndex: 'deviceName',
                    fixed:'left',
                    width:150
                },
                {
                    title: '设备ID',
                    dataIndex: 'deviceId',
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
                    title: '所属单位',
                    dataIndex: 'orgName',
                },
                {
                    title: '安装时间',
                    dataIndex: 'manufactureDate',
                },
                {
                    title: '到期时间',
                    dataIndex: 'expirationDate',
                },
                {
                    title: '通信状态',
                    dataIndex: 'commStatus',
                    scopedSlots: { customRender: 'status' },
                    width:100,
                    fixed:'right'
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 200,
                    scopedSlots: { customRender: 'operation' },
                    fixed:'right'
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                deviceType:'',
                systemCode:'',
                deviceName:'',
                startTime:'',
                endTime:'',
                orgId:'',
                page:0,
                pageSize:6,
            },
            systemList:[],
            deviceTypeList:[],
            deviceModelList:[],
            visible:false,
            confirmLoading:false,
            dateValue:null,
            dateValueString:'',
            record:null,
            expireDate:null,
            expireDateValue:[],
            orgId:'',
            selectedRowKeys:[],
            tableLoading:false
        }
    },
    created(){
        this.getDictData()
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
        rowSelection() {
            const { selectedRowKeys } = this;
            return {
                onChange: (selectedRowKeys, selectedRows) => {
                    this.selectedRowKeys=selectedRowKeys
                },
                getCheckboxProps: record => ({
                    props: {
                        disabled: record.name === 'Disabled User', // Column configuration not to be checked
                        name: record.name,
                    },
                }),
            };
        },
    },
    methods:{
        onRangeDateChange(date,dateString){
            this.expireDate=date
            this.expireDateValue=dateString
        },
        getDictData(){
            getDeviceFindList({type:1}).then(res=>{
                this.systemList=[]
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                        this.systemList=res.data.value
                    }
                }
            })
        },
        systemChange (value) {
            this.form.setFieldsValue({
                deviceType:'',
                deviceModel:''
            })
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
            this.form.setFieldsValue({
                deviceModel:''
            })
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
        disabledDate(current) {
            // Can not select days before today and today
            return current && current < moment().endOf('day');
        },
        onDateChange(date, dateString){
            this.dateValue=date
            this.dateValueString=dateString
        },
        handleCancel(){
            this.visible=false
        },
        handleOk(){
            var that=this
            if(that.dateValue){
                console.log(that.dateValueString)
                console.log(that.record)
                that.confirmLoading=true
                setTimeout(()=>{
                    that.confirmLoading=false
                },1000)
            }else{
                that.$message.error('请选择到期时间')
            }
        },
        onStatusChange(a){
            console.log(a)
        },
        onRenew(record){
            this.visible=true
            this.record=record
            this.dateValue=null
            this.dateValueString=''
        },
        onView(record) {
            console.log(record)
            this.$refs.formDialog.showDrawer(record, 'view')
        },
        onUnband(record){
            var that=this
            this.$confirm({
                title: '提示',
                content: `解绑后该单位将查询不到该设备信息`,
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    console.log(record);
                    unbundleDevice({
                        id:record.id
                    }).then(res=>{
                        console.log(res)
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
        batchUnBand(){
            var ids=this.selectedRowKeys.join(',')
            if(!ids){
                this.$message.error('请选择解绑设备')
                return
            }
            unbundleDeviceBatch({ids:ids}).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    this.$message.success('解绑成功')
                    this.getData()
                }else{
                    this.$message.error('解绑失败')
                }
            })
        },
        getOrgId(orgId){
            this.orgId=orgId
            this.params.orgId = orgId
            this.getData()
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.params.page = 0
                this.pagination.current = 1
                Object.assign(this.params,values)
                this.getData()
            });
        },
        handleReset() {
            this.form.resetFields();
        },
        getData(){
            this.tableLoading=true
            findDevicePageList(this.params).then(res=>{
                this.tableLoading=false
                console.log(res)
                if(res && res.data && res.data.success && res.data.value.content){
                    if(res.data.value.content.length){
                        res.data.value.content.forEach(s=>{
                            s.key=s.id
                            s.commStatus=s.commStatus=='0'?false:true
                        })
                    }
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    this.pagination = pagination;
                    this.dataSource=res.data.value.content
                }else{
                    this.dataSource=[]
                }
            })
        },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        },
        rowClassName (record) {
            let className = '';
            if (this.rowLight == record.id) {
                className = 'light-row';
            }
            return className;
        }
    }
}