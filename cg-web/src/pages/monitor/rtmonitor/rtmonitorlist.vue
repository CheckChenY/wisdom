<template>
    <div class="menu_manage">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="设备名称">
                        <a-input
                        v-decorator="['deviceName']"
                        maxLength="255"
                        placeholder="设备名称"/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="所属系统">
                        <a-select 
                            placeholder="请选择"
                            @select="systemChange"
                            showSearch
                            optionFilterProp="children"
                            v-decorator="['systemCode']">
                            <a-select-option v-for="(item,index) in systemList" :value="item.value" :key="index">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="设备类型">
                        <a-select 
                            placeholder="请选择"
                            @select="typeChange"
                            showSearch
                            optionFilterProp="children"
                            v-decorator="['deviceType']">
                            <a-select-option v-for="item in deviceTypeList" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="设备型号">
                        <a-select 
                            placeholder="请选择"
                            showSearch
                            optionFilterProp="children"
                            v-decorator="['deviceModel']">
                            <a-select-option v-for="item in deviceModelList" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="设备状态">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="['warnState']">
                                <a-select-option v-for="(item,index) in warnStateList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="4" style="margin-top: 3px;">
                    <a-button type="primary" html-type="submit">
                        查询
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        清空
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
        <div style="width:100%;">
            <a-table bordered 
                :dataSource="dataSource" 
                :pagination="pagination"
                :rowClassName="rowClassName"
                :columns="columns">
                <template slot="status" slot-scope="text, record" style="display: flex;">
                    <a-switch defaultChecked @change="onChange" v-model="record.commStatus"/>
                </template>
                <template slot="operation" slot-scope="text, record" style="display: flex;">
                    <div class="editable-row-operations">
                        <a-button @click="() => onView(record)" type="text" style="margin-right: 10px;">查看</a-button>
                        <a-button @click="() => onRemote(record)" type="primary" style="margin-right: 10px;">远程操作</a-button>
                        <a-button @click="() => onThresold(record)" type="primary" style="margin-right: 10px;">修改阈值</a-button>
                    </div>
                </template>
            </a-table>
        </div>
        <rtmonitorlistDialog ref="rtmonitorlistDialog" @refresh="refresh"></rtmonitorlistDialog>
        <rtmonitorlistRemote ref="rtmonitorlistRemote" @refresh="refresh"></rtmonitorlistRemote>
        <rtmonitorlistThresold ref="rtmonitorlistThresold" @refresh="refresh"></rtmonitorlistThresold>
        <ImageView ref="ImageView"></ImageView>
        <checkmodal ref="checkmodal" @closeModal="closeModal"></checkmodal>
    </div>
</template>
<script>
import UnitSelect from "@/components/selectUnit"
import formSearch from '@/components/base/formSearch.vue';
import checkmodal from '@/components/public/checkmodal.vue';
import rtmonitorlistDialog from './rtmonitorlistDialog.vue';
import rtmonitorlistRemote from './rtmonitorlistRemote.vue';
import rtmonitorlistThresold from './rtmonitorlistThresold.vue';
import { findDevicePage } from '@/api/monitor/monitor'
import { getDeviceFindList } from '@/api/public'
import moment from 'moment';
import ImageView from '@/components/public/image-view'
import { dict } from '@/const/dict'
import { mapGetters } from "vuex";
export default {
    props: ["orgId"],
    components:{
        UnitSelect,
        rtmonitorlistDialog,
        rtmonitorlistRemote,
        rtmonitorlistThresold,
        formSearch,
        ImageView,
        checkmodal
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
                    width: 310,
                    scopedSlots: { customRender: 'operation' },
                    fixed:'right'
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                size:4,
                companyId: '',
                systemCode: '',
                deviceType: '',
                buildingId: '',
                floorId: '',
            },
            systemList:[],
            deviceTypeList:[],
            deviceModelList:[],
            warnStateList:dict.USESTATE,
            visible:false,
            confirmLoading:false,
            dateValue:null,
            dateValueString:'',
            record:null,
            expireDate:null
        }
    },
    created(){
        this.getDictData()
    },
    mounted(){
        this.getData()
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    watch: {
        'orgId':function(val, oval){
            this.params.companyId = this.orgId
            this.getData()
        },
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
        batchExport(){

        },
        download(){

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
        onRemote(record){
            this.$refs.checkmodal.showModal(record, 'Remote')
        },
        onView(record) {
            this.$refs.rtmonitorlistDialog.showDrawer(record)
        },
        onThresold(record){
            this.$refs.checkmodal.showModal(record, 'Thresold')
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
        closeModal(record, value) {
            if (value == 'Thresold') {
                this.$refs.rtmonitorlistThresold.showDrawer(record)
            } else if (value == 'Remote'){
                this.$refs.rtmonitorlistRemote.showDrawer(record)
            }
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
</script>
<style lang="scss" scoped>
.echarts_class {
    height: 300px;
}
.alert_body{
    width:100%;
    height:320px
}
</style>
    