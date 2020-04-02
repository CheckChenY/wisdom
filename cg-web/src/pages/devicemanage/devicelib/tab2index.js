import UnitSelect from "@/components/selectUnit"
import formSearch from '@/components/base/formSearch.vue';
import formDialog from './tab2formDialog.vue';
// import { findCameraPageList,initstatue,init,deleteDevice } from '@/api/devicemanage/devicelib/cameralib'
import { findCameraPageList,deleteCamera } from '@/api/devicemanage/devicelib/cameralib'
import { getDeviceFindList } from '@/api/public'
// import { findById } from '@/api/devicemanage/devicemanage/caremalib'
import moment from 'moment';
import { mapGetters } from "vuex";
export default {
    components:{
        UnitSelect,
        formDialog,
        formSearch
    },
    data () {
        return{
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                current: 1,
                pageSize: 10,
            },
            columns: [
                {
                    title: '设备ID',
                    dataIndex: 'deviceId',
                    width:150
                },
                {
                    title: '设备名称',
                    dataIndex: 'deviceName',
                    width:150
                },
                // {
                //     title: '所属系统',
                //     dataIndex: 'systemCode',
                // },
                {
                    title: '设备类型',
                    dataIndex: 'deviceType',
                },
                {
                    title: '设备型号',
                    dataIndex: 'deviceModel',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 180,
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                size:10,
                deviceType:null,
                deviceName:null,
                useStatus:null,
            },
            systemList:[],
            deviceTypeList:[],
            visible:false,
            confirmLoading:false,
            dateValue:null,
            dateValueString:'',
            record:null,
            expireDate:null,
            useStateList:[{
                label:'启用',
                value:'1'
            },{
                label:'未启用',
                value:'2'
            },],
            tableLoading:false
        }
    },
    props:["tabnum"],
    watch:{
        tabnum(){
            if(this.tabnum==2){
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
        this.getData()
    },
    methods:{
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
        // getDictData(){
        //     getDeviceFindList({type:2}).then(res=>{
        //         this.deviceTypeList=[]
        //         if(res && res.data && res.data.value){
        //             if(res.data.value.length){
        //                 let monitorList=res.data.value.filter(s=>s.parentId==)
        //                 monitorList.forEach(s=>{
        //                     s.label=s.dataDicDesc
        //                     s.value=s.id
        //                 })
        //                 this.deviceTypeList=monitorList
        //             }
        //         }
        //     })
        // },
        getDictData(){
            getDeviceFindList({type:2,id:1574920051755879}).then(res=>{
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
        disabledDate(current) {
            // Can not select days before today and today
            return current && current < moment().endOf('day');
        },
        handleCancel(){
            this.visible=false
        },
        handleOk(){
            var that=this
            console.log(that.dateValueString)
            console.log(that.record)
            that.confirmLoading=true
            setTimeout(()=>{
                that.confirmLoading=false
            },1000)
        },
        onEdit(record){
            this.$refs.formDialog.showDrawer(record, 'edit')
        },
        onDelete(record){
            var that=this
            this.$confirm({
                title: '提示',
                content: `删除后将查询不到该设备信息`,
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    deleteCamera({param:record.id}).then(res=>{
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
        getOrgId(orgId){
            console.log(orgId)
            
        },
        handleSearch(e) {
            e.preventDefault();
            this.params.page = 0
            this.pagination.current = 1
            this.form.validateFields((error, values) => {
                console.log(values);
                this.params.deviceName=values.deviceName?values.deviceName:null
                this.params.useStatus=values.useStatus?values.useStatus:null
                this.params.deviceType=values.deviceType?values.deviceType:null
                this.getData()
            });
        },
        handleReset() {
            this.form.resetFields();
            this.expireDate=null
        },
        getData(){
            this.tableLoading=true
            findCameraPageList(this.params).then(res=>{
                this.tableLoading=false
                if(res && res.data && res.data.success && res.data.value.content){
                    if(res.data.value.content.length){
                        res.data.value.content.forEach(s=>{
                            s.key=s.id
                            this.deviceTypeList.forEach(t=>{
                                if(s.deviceType && t.value==s.deviceType){
                                    s.deviceType=t.label
                                }
                            })
                        })
                    }
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    pagination.size = 'middle';
                    this.dataSource=res.data.value.content
                    this.pagination = pagination;
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