import UnitSelect from "@/components/selectUnit"
import formDialogUnitCamera from './formDialogUnitCamera.vue';
import { findCameraPageList,update } from '@/api/devicemanage/devicelib/cameralib'
import { findDeviceDict } from '@/api/public'
import moment from 'moment';
import { mapGetters } from "vuex";
export default {
    components:{
        UnitSelect,
        formDialogUnitCamera
    },
    data () {
        return{
            dataSource: [],
            columns: [
                {
                    title: '设备ID',
                    dataIndex: 'deviceId',
                },
                {
                    title: '设备名称',
                    dataIndex: 'deviceName',
                },
                {
                    title: '设备类型',
                    dataIndex: 'deviceType',
                },
                {
                    title: '设备型号',
                    dataIndex: 'deviceModel',
                },
                {
                    title: '所属单位',
                    dataIndex: 'companyName',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 160,
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                parentCompanyName:null,
                childCompanyName:null,
                relationType:null,
                page:0,
                size:8,
            },
            deviceTypeList:[],
            record:null,
            companyId: null,
        }
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    created(){
        this.getDictData()
    },
    methods:{
        getDictData(){
            findDeviceDict({type:2}).then(res=>{
                this.deviceTypeList=[]
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        let monitorList=res.data.value.filter(s=>s.parentId==1574920051750940)
                        monitorList.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                        this.deviceTypeList=monitorList
                    }
                }
            })
        },
        disabledDate(current) {
            // Can not select days before today and today
            return current && current < moment().endOf('day');
        },
        onEdit(record){
            this.record=record
            let obj = {
                deviceTypeList:this.deviceTypeList,
            }
            this.$refs.formDialog.showDrawer(record, 'edit', obj)
        },
        onView(record) {
            let obj = {
                deviceTypeList:this.deviceTypeList,
            }
            this.$refs.formDialog.showDrawer(record, 'view', obj)
        },
        getOrgId(companyId,params){
            this.companyId = companyId
            var obj={
                page:0,
                size:8,
                companyId:companyId?companyId:null,
                deviceType:null,
                deviceName:null,
            }
            Object.assign(obj, params)
            findCameraPageList(obj).then(res=>{
                if(res && res.data && res.data.success && res.data.value.content){
                    if(res.data.value.content.length){
                        res.data.value.content.forEach(s=>{
                            s.key=s.id
                            s.commStatus=s.commStatus=='0'?false:true
                        })
                    }
                    this.dataSource=res.data.value.content
                }else{
                    this.dataSource=[]
                }
            })
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.getOrgId(this.companyId, values)
            });
        },
        handleReset() {
            this.form.resetFields();
        },
        submit (params) {
            Object.assign(this.record, params)
            update(this.record).then(res => {
                if(res && res.data && res.data.success){
                    this.$message.success('编辑成功')
                }else{
                    this.$message.error('编辑失败')
                }
            })
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