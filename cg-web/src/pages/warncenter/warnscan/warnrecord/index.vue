<template>
    <div class="child_unit">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="5">
                    <a-form-item label="所属系统">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="[
                                    'deviceSystem',
                                ]">
                                <a-select-option v-for="(item,index) in systemList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="设备类型">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="[
                                    'deviceType',
                                ]">
                                <a-select-option v-for="(item,index) in deviceTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="所属建筑">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="[
                                    'buildingId',
                                ]">
                                <a-select-option v-for="(item,index) in buildingList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="设备状态">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="[
                                    'alarmType',
                                ]">
                                <a-select-option v-for="(item,index) in warnTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5" style="margin-top:-15px;">
                    <a-form-item label="警情程度">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="[
                                    'alarmLevel',
                                ]">
                                <a-select-option v-for="(item,index) in warnLevelList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5" style="margin-top:-15px;">
                    <a-form-item label="报警时间">
                        <a-range-picker @change="onRangeDateChange" v-model="warnDate"/>
                    </a-form-item>
                </a-col>
                <a-col :span="5" :style="{marginTop:'-12px'}">
                    <a-button type="primary" html-type="submit">
                        查询
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        清空
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
        <a-table :loading="tableLoading"
            bordered 
            size="middle"
            :pagination="pagination"
            :rowClassName="rowClassName" 
            :dataSource="dataSource" :columns="columns">
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
                    <a-button type="primary" @click="onView(record)" style="margin-right: 10px;">查看</a-button>
                </div>
            </template>
        </a-table>
        <formDialog @cancel="cancel" :dialogShow="dialogShow" :record="record"></formDialog>
    </div>
</template>

<script>
import formDialog from '../../a_record_dialog/formDialog';
// import { page } from '@/api/devicemanage/deviceupgrade'
import { findDeviceDict } from '@/api/public'
import { findList } from '@/api/building'
import { getAlarmByOrg } from '@/api/warncenter/warnscan'
import { dict } from '@/const/dict'
import { mapGetters } from "vuex";
export default {
    props:["tabnum"],
    watch:{
        tabnum(){
            if(this.tabnum==2){
                this.getData()
            }
        }
    },
    data () {
        return {
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize:10,
                current: 1,
                size:'middle'
            },
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
                    title: '所属系统',
                    dataIndex: 'system',
                },{
                    title: '所属建筑',
                    dataIndex: 'building',
                },{
                    title: '楼层/区域',
                    dataIndex: 'floor',
                },{
                    title: '安装位置',
                    dataIndex: 'location',
                },{
                    title: '设备状态',
                    dataIndex: 'alarmType',
                },{
                    title: '警情类型',
                    dataIndex: 'alarmDetails',
                },{
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
                deviceSystem:null,
                deviceType:null,
                dealState:1,
                buildingId:null,
                floorId:null
            },
            systemList:[],
            deviceTypeList:[],
            buildingList:[],
            tableLoading:false,
            warnDate:null,
            warnDateValue:'',
            dialogShow:false,
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
            record:{}
        }
    },
    components:{
        formDialog,
    },
    created(){
        this.getDict()
    },
    mounted(){
        this.getData()
        var that=this
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    methods:{
        getDict(){
            findList().then(res=>{
                if(res && res.data && res.data.success){
                    if(res.data.value){
                        res.data.value.forEach(s=>{
                            s.label=s.buildingCode
                            s.value=s.id
                        })
                        this.buildingList=res.data.value
                    }
                }
            })
            findDeviceDict({type:1}).then(res=>{
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
            findDeviceDict({type:2}).then(res=>{
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
        cancel(){
            this.dialogShow=false
        },
        onView(record){
            this.record=record
            this.dialogShow=true
        },
        onRangeDateChange(a,b){
            this.warnDate=a
            this.warnDateValue=b
        },
        refresh(){
            
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
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                if(!error){
                    this.params.deviceSystem=values.deviceSystem?values.deviceSystem:null
                    this.params.alarmType=values.alarmType?values.alarmType:null
                    this.params.buildingId=values.buildingId?values.buildingId:null
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
                }
            });
        },
        handleReset() {
            this.warnDate=null
            this.warnDateValue=''
            this.form.resetFields();
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
</script>
<style lang='scss'>

</style>