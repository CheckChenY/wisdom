import buildingtree from "@/components/buildingtree"
import firealarmDialog from './firealarmDialog.vue';
import { findDevicePage } from '@/api/monitor/monitor'
import { getDeviceFindList } from '@/api/public'
import { dict } from '@/const/dict'
import { mapGetters } from "vuex";
export default {
    components:{
        firealarmDialog,
        buildingtree,
    },
    data () {
        return{
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize: 4,
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
                    title: '设备型号',
                    dataIndex: 'deviceModel',
                },
                {
                    title: '设备类型',
                    dataIndex: 'deviceType',
                },
                {
                    title: '所属系统',
                    dataIndex: 'systemCode',
                },
                {
                    title: '所在建筑',
                    dataIndex: 'buildingName',
                },
                {
                    title: '楼层/区域',
                    dataIndex: 'floorName',
                },
                {
                    title: '具体位置',
                    dataIndex: 'location',
                },
                {
                    title: '设备状态',
                    dataIndex: 'warnState',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 100,
                    scopedSlots: { customRender: 'operation' },
                    fixed:'right'
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                size:4,
                systemId: '1574920051742919',
                deviceType: '',
                buildingId: '',
                floorId: '',
            },
            systemList:[],
            deviceTypeList:[],
            deviceModelList:[],
            warnStateList:dict.USESTATE,
            record:null,
            expireDate:null
        }
    },
    created(){
        this.getDictData()
    },
    computed: {
        ...mapGetters([
            "orgInfo",
            "rowLight",
        ]),
    },
    mounted(){
        this.params.companyId = this.orgInfo.id
        this.getData()
    },
    methods:{
        getDictData(){
            getDeviceFindList({type:2,id:'1574920051742919'}).then(res=>{
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
        onView(record) {
            this.$refs.firealarmDialog.showDrawer(record)
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.params.page = 0
                this.pagination.current = 1
                Object.assign(this.params, values)
                this.getData()
            });
        },
        handleReset() {
            this.form.resetFields();
            this.expireDate=null
        },
        getData(){
            findDevicePage(this.params).then(res=>{
                if(res && res.data && res.data.success){
                    if(res.data.value.content && res.data.value.content.length){
                        res.data.value.content.forEach(s=>{
                            s.key=s.id
                            let warn = dict.USESTATE.filter(item => item.value == s.warnState)
                            s.warnState = warn.length>0?warn[0].label:''
                        })
                    }
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
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
        select (value) {
            this.params.floorId = value[0]
            this.getData()
        },
        rowClassName (record) {
            let className = '';
            if (this.rowLight == record.deviceId) {
                className = 'light-row';
            }
            return className;
        }
    }
}