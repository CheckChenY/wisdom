import buildingtree from "@/components/buildingtree"
import formDialog from '../../a_deal_dialog/formDialog.vue'
import { findDeviceDict } from '@/api/public'
import { getAlarmByOrg,startLinkDeviceByHand } from '@/api/warncenter/warnscan'
import { dict } from '@/const/dict'
import { mapGetters } from "vuex";

export default {
    components:{
        buildingtree,
        formDialog
    },
    props:["tabnum"],
    watch:{
        tabnum(){
            if(this.tabnum==1){
                this.params={
                    page:0,
                    size:9,
                    alarmLevel:null,
                    alarmType:null,
                    deviceSystem:1574920051744145,
                    deviceType:null,
                    dealState:0,
                    floorId:null
                }
                this.getData()
            }
        }
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
                },
                {
                    title: '报警时间',
                    dataIndex: 'createTime',
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
                    width: 200,
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                size:9,
                alarmLevel:null,
                alarmType:null,
                deviceSystem:1574920051744145,
                deviceType:null,
                dealState:0,
            },
            deviceTypeList:[],
            warnDate:null,
            warnDateValue:[],
            tableLoading:false,
            ///
            dialogShow:false,
            warnTypeList:dict.USESTATE,
            warnLevelList:dict.ALARMLEVEL,
            record:{},
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
        selectedKeys(selectedKeys){
            this.params.floorId=selectedKeys.join('')
            this.getData()
        },
        onRela(record){
            var that=this
            startLinkDeviceByHand({
                deviceId:record.deviceId,
                alarmId:record.id
            }).then(res=>{
                if(res && res.data && res.data.success){
                    var h = this.$createElement;
                    that.$info({
                        title: '操作成功',
                        content: h('div', {}, [
                            h('p', '下发命令成功的个数'+res.data.value.sendSucceedCout),
                            h('p', '下发命令失败的个数'+res.data.value.sendFailedCount),
                            h('p', '不符合逻辑的个数'+res.data.value.inconformityLogicCount),
                        ]),
                        onOk() {},
                    });
                }else{
                    that.$message.error(res.data.errorMsg)
                }
            })
        },
        cancel(refresh){
            if(refresh){
                this.getData()
            }
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
        onDeal(record) {
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
            this.warnDate=null
            this.warnDateValue=''
            this.form.resetFields();
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
                    })
                    this.dataSource=res.data.value.content
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    pagination.pageSize=res.data.value.size
                    this.pagination = pagination;
                }else{
                    this.dataSource=[]
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