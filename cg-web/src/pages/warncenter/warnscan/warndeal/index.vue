<template>
    <div class="containered">
        <div class="echartsbox">
            <div style="width:70%;">
                <bar ref="bar" :barData="barData"/>
            </div>
            <div style="width:30%;min-width:450px;">
                <cir ref="cir" :cirData="cirData"/>
            </div>
        </div>
        <div class="child_unit" style="margin-top:50px;">
            <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
                <a-row :gutter="24">
                    <a-col :span="5">
                        <a-form-item label="所属系统">
                                <a-select 
                                    @select="sysChange"
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
                                    <a-select-option v-for="(item,index) in alarmTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
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
                size="small"
                :pagination="pagination"
                :rowClassName="rowClassName" 
                :dataSource="dataSource" :columns="columns">
                <template slot="operation" slot-scope="text, record" style="display: flex;">
                    <div class="editable-row-operations">
                        <a-button type="primary" @click="onDeal(record)" style="margin-right: 10px;">处理</a-button>
                        <a-button type="danger" @click="onRela(record)" v-if="record.linkState==1">联动动作</a-button>
                    </div>
                </template>
            </a-table>
            <formDialog @cancel="cancel" :dialogShow="dialogShow" :record="record"></formDialog>
        </div>
    </div>
</template>
<script> 
import formDialog from '../../a_deal_dialog/formDialog';
import { getAlarmByOrg,findCountByOrgSystem,weekAlarmCountBySupervise,startLinkDeviceByHand } from '@/api/warncenter/warnscan'
import { findDeviceDict,getDeviceFindList } from '@/api/public'
import { findList } from '@/api/building'
import bar from './bar'
import cir from './cir'
import { dict } from '@/const/dict'
import { mapGetters } from "vuex";
export default {
    props:["tabnum"],
    watch:{
        tabnum(){
            if(this.tabnum==1){
                this.getData()
            }
        }
    },
    data () {
        return {
            barData:[],
            cirData:[],
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize:5,
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
                    width: 180,
                    scopedSlots: { customRender: 'operation' },
                    fixed:'right'
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                size:5,
                alarmLevel:null,
                alarmType:null,
                deviceSystem:null,
                deviceType:null,
                dealState:0,
                buildingId:null,
                floorId:null
            },
            systemList:[],
            deviceTypeList:[],
            alarmTypeList:dict.USESTATE,
            warnLevelList:dict.ALARMLEVEL,
            buildingList:[],
            tableLoading:false,
            warnDate:null,
            warnDateValue:'',
            dialogShow:false,
            record:{},
        }
    },
    components:{
        bar,
        cir,
        formDialog
    },
    created(){
        this.getDict()
    },
    mounted(){
        this.getData()
        this.getChartData()
        var that=this
        window.onresize = function () {
            if (that.$refs.bar) that.$refs.bar.resize()
            if (that.$refs.cir) that.$refs.cir.resize()
        }
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    methods:{
        sysChange(sys){
            getDeviceFindList({type:2,id:sys}).then(res=>{
                if(res && res.data && res.data.success){
                    res.data.value.forEach(s=>{
                        s.label=s.dataDicDesc
                        s.value=s.id
                    })
                    this.deviceTypeList=res.data.value
                }
            })
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
        onDeal(record){
            this.record=record
            this.dialogShow=true
        },
        cancel(refresh){
            if(refresh){
                this.getData()
            }
            this.dialogShow=false
        },
        onRangeDateChange(a,b){
            this.warnDate=a
            this.warnDateValue=b
            
        },
        getChartData(){
            this.barData=[]
            findCountByOrgSystem().then(res=>{
                if(res && res.data && res.data.success){
                    res.data.value=res.data.value.filter(s=>s.systemId!='3425')
                    res.data.value.forEach(s=>{
                        var obj={}
                        obj.name=s.systemName
                        obj.num=s.alarmCount
                        this.barData.push(obj)
                    })
                }
            })
            weekAlarmCountBySupervise().then(res=>{
                if(res && res.data && res.data.success){
                    this.cirData=res.data.value
                }
            })
        },
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
        },
        getData(){
            this.tableLoading=true
            getAlarmByOrg(this.params).then(res=>{
                this.tableLoading=false
                if(res && res.data && res.data.success){
                    res.data.value.content.forEach((s,index)=>{
                        s.key=index
                        this.alarmTypeList.forEach(t=>{
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
<style>
.echartsbox{
    width:100%;
    height: 250px;
    display: flex;
}
</style>