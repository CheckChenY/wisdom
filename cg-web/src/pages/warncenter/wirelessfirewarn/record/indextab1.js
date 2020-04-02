import formDialog from '../../a_record_dialog/formDialog.vue';
import { findDeviceDict } from '@/api/public'
import { getAlarmByOrg } from '@/api/warncenter/warnscan'
import { dict } from '@/const/dict'
import { mapGetters } from "vuex";

export default {
    components:{
        formDialog
    },
    data () {
        return{
            pagination:{
                size:'middle',
                current:1,
                pageSize:10,
                onChange: this.onChange,
            },
            dataSource: [],
            columns: [
                {
                    title: '序号',
                    dataIndex: 'id',
                    fixed:'left',
                    width:150
                },
                {
                    title: '报警时间',
                    dataIndex: 'createTime',
                    fixed:'left',
                    width:150
                },
                {
                    title: '警情确认',
                    dataIndex: 'warnConfirmType',
                },
                {
                    title: '处理人员',
                    dataIndex: 'warnHandler',
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
                    title: '所属建筑',
                    dataIndex: 'building',
                },
                {
                    title: '区域/楼层',
                    dataIndex: 'floor',
                },
                {
                    title: '安装位置',
                    dataIndex: 'location',
                },
                {
                    title: '设备状态',
                    dataIndex: 'alarmType',
                },
                {
                    title: '警情类型',
                    dataIndex: 'alarmDetails',
                },
                {
                    title: '警情程度',
                    dataIndex: 'alarmLevel',
                },{
                    title: '报警次数',
                    dataIndex: 'alarmTimes',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 80,
                    scopedSlots: { customRender: 'operation' },
                    fixed:'right'
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                size:9,
                alarmLevel:null,
                alarmType:null,
                deviceSystem:1574920051754848,
                deviceType:null,
                dealState:1,
            },
            deviceTypeList:[],
            warnTypeList:dict.USESTATE,
            warnLevelList:dict.ALARMLEVEL,
            warnConfirmList:[{
                label:'真实火警',
                value:'1'
            },{
                label:'异常',
                value:'2'
            },{
                label:'误报',
                value:'3'
            },{
                label:'测试',
                value:'4'
            },],
            warnDate:null,
            warnDateValue:[],
            tableLoading:false,
            ///
            dialogShow:false,
            record:null,
        }
    },
    props:["tabnum"],
    watch:{
        tabnum(){
            if(this.tabnum==2){
                this.getData()
            }
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
    mounted(){
        this.getData()
    },
    methods:{
        cancel(){
            this.dialogShow=false
        },
        onRangeDateChange(date,dateString){
            this.warnDate=date
            this.warnDateValue=dateString
        },
        getDictData(){
            findDeviceDict({type:2}).then(res=>{
                this.deviceTypeList=[]
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            var obj={}
                            obj.label=s.dataDicDesc
                            obj.value=s.id
                            this.deviceTypeList.push(obj)
                        })
                    }
                }
            })
        },
        onView(record) {
            this.record=record
            this.dialogShow=true
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.params.alarmType=values.alarmType?values.alarmType:null
                this.params.deviceType=values.deviceType?values.deviceType:null
                this.params.alarmLevel=values.alarmLevel?values.alarmLevel:null
                if (this.warnDateValue && this.warnDateValue.length == 2) {
                    this.params.startTime=this.warnDateValue[0]
                    this.params.endTime=this.warnDateValue[1]
                } else {
                    delete this.params.startTime
                    delete this.params.endTime
                }
                this.getData()
            });
        },
        handleReset() {
            this.form.resetFields();
            this.warnDate=null
            this.warnDateValue=''
        },
        getData(){
            this.tableLoading=true
            getAlarmByOrg(this.params).then(res=>{
                this.tableLoading=false
                if(res && res.data && res.data.success){
                    res.data.value.content.forEach((s,index)=>{
                        s.key=index
                        this.warnTypeList.forEach(t=>{
                            if(s.alarmType==t.value){
                                s.alarmType=t.label
                            }
                        })
                        this.warnLevelList.forEach(t=>{
                            if(s.alarmLevel==t.value){
                                s.alarmLevel=t.label
                            }
                        })
                        this.warnConfirmList.forEach(t=>{
                            if(s.warnConfirmType==t.value){
                                s.warnConfirmType=t.label
                            }
                        })
                    })
                    this.dataSource=res.data.value.content
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    pagination.pageSize=res.data.value.size
                    this.pagination = pagination;
                } else {
                    this.dataSource = []
                }
            })
        },
        onChange(value){
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