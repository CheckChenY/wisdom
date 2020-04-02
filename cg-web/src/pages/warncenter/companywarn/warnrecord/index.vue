<template>
    <div class="containered">
        <div class="child_unit">
            <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item label="所属系统">
                                <a-select 
                                    placeholder="请选择"
                                    @select="systemChange"
                                    showSearch
                                    optionFilterProp="children"
                                    v-decorator="[
                                        'deviceSystem',
                                    ]">
                                    <a-select-option v-for="(item,index) in systemList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
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
                    <a-col :span="6">
                        <a-form-item label="警情类型">
                                <a-select 
                                    placeholder="请选择"
                                    showSearch
                                    optionFilterProp="children"
                                    v-decorator="[
                                        'alarmType',
                                    ]">
                                    <a-select-option v-for="(item,index) in alarmTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="警情程度">
                                <a-select 
                                    placeholder="请选择"
                                    showSearch
                                    optionFilterProp="children"
                                    v-decorator="[
                                        'alarmLevel',
                                    ]">
                                    <a-select-option v-for="(item,index) in alarmLevelList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8" style="margin-top:-15px;">
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
                size="small"
                :rowClassName="rowClassName" 
                :pagination="pagination"
                :dataSource="dataSource" :columns="columns">
                <template slot="operation" slot-scope="text, record" style="display: flex;">
                    <div class="editable-row-operations">
                        <a-button type="primary" @click="onView(record)">查看</a-button>
                    </div>
                </template>
            </a-table>
            <formDialog @cancel="cancel" :dialogShow="dialogShow" :record="record"></formDialog>
        </div>
    </div>
</template>
<script> 
import formDialog from '../../a_record_dialog/formDialog';
import { getDeviceFindList } from '@/api/public'
import { getAlarmByOrg } from '@/api/warncenter/warnscan'
import { dict } from '@/const/dict'
import { mapGetters } from "vuex";
export default {
    props: ['tabnum', 'orgId'],
    data () {
        return {
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize:4,
                current: 1,
                total: 0,
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
                    title: '设备名称',
                    dataIndex: 'deviceName',
                },
                {
                    title: '所属系统',
                    dataIndex: 'system',
                },
                {
                    title: '设备类型',
                    dataIndex: 'deviceType',
                },
                {
                    title: '设备型号',
                    dataIndex: 'deviceModel',
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
                size:4,
                companyId: this.orgId,
                dealState:1,
            },
            systemList:[],
            deviceTypeList:[],
            alarmTypeList:dict.USESTATE,
            alarmLevelList:dict.ALARMLEVEL,
            tableLoading:false,
            warnDate:null,
            warnDateValue:'',
            dialogShow:false,
            record:{}
        }
    },
    components:{
        formDialog,
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    watch:{
        tabnum(){
            if(this.tabnum==2){
                this.getData()
            }
        },
        orgId(){
            this.params.companyId=this.orgId
            this.getData()
        },
    },
    created(){
        this.getDict()
    },
    mounted(){
        this.getData()
        var that=this
    },
    methods:{
        onView(record){
            this.record=record
            
            this.dialogShow=true
        },
        cancel(refresh){
            if(refresh){
                console.log('刷新')
            }
            this.dialogShow=false
        },
        onRangeDateChange(a,b){
            this.warnDate=a
            this.warnDateValue=b
        },
        getDict(){
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
        getData(){
            this.loading = true;
            getAlarmByOrg(this.params).then(res => {
                if (res && res.data && res.data.success) {
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    this.pagination = pagination;
                    res.data.value.content = res.data.value.content?res.data.value.content:[]
                    res.data.value.content.forEach(item => {
                        item.key = item.id
                        item.alarmDetails = item.alarmDetails.join()
                        let warn = dict.USESTATE.filter(s => s.value == item.alarmType)
                        item.alarmType = warn.length>0?warn[0].label:''
                        let level = dict.ALARMLEVEL.filter(s => s.value == item.alarmLevel)
                        item.alarmLevel = level.length>0?level[0].label:''
                    })
                    this.dataSource = res.data.value.content;
                } else {
                    this.dataSource = []
                }
                this.loading = false;
            })
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                if(!error){
                    this.params.page = 0
                    this.pagination.current = 1
                    this.pagination.total = 0
                    Object.assign(this.params, values)
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
            this.warnDateValue=[]
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
<style>
.echartsbox{
    width:100%;
    height: 250px;
    display: flex;
}
</style>