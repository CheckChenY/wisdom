<template>
    <div>
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="设备ID" :labelCol="{offset: 1}">
                        <a-input
                        v-decorator="['deviceId']"
                        maxLength="45"
                        placeholder="设备ID"/>
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
                            <a-select-option v-for="(item,index) in systemList" :key="index" :value="item.value">{{item.label}}</a-select-option>
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
                            <a-select-option v-for="(item,index) in deviceTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
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
                            <a-select-option v-for="(item,index) in deviceModelList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6" style="margin-top:-10px;">
                    <a-form-item label="所属建筑">
                        <a-select 
                            placeholder="请选择"
                            showSearch
                            optionFilterProp="children"
                            v-decorator="['buildingName']">
                            <a-select-option v-for="(item,index) in buildingList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6" style="margin-top:-10px;">
                    <a-form-item label="区域/楼层">
                        <a-select 
                            placeholder="请选择"
                            showSearch
                            optionFilterProp="children"
                            v-decorator="['floorName']">
                            <a-select-option v-for="(item,index) in floorList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6" style="margin-top: -7px;">
                    <a-button type="primary" html-type="submit">
                        查询
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        清空
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
        <div class="table-operations" style="margin-bottom:20px;">
            联动动作模式：<a-switch v-model="mode" @change="switchChange" checkedChildren="手动" unCheckedChildren="自动"/>
        </div>
        <a-table :loading="tableLoading" bordered 
            :dataSource="dataSource" 
            :pagination="pagination"
            :rowClassName="rowClassName"
            :columns="columns">
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
                    <a-button @click="() => onLink(record)" type="danger">联动逻辑</a-button>
                </div>
            </template>
        </a-table>
        <linkDialog ref="linkDialog"></linkDialog>
    </div>
</template>

<script>
import linkDialog from './linkDialog.vue';
import { getDeviceFindList } from '@/api/public'
import { findLinkPage,getCompany,updateLinkage } from '@/api/devicemanage/devicelink'
import { findList } from '@/api/building'
import { findPageList } from '@/api/floor'
import { mapGetters } from "vuex";
export default {
    props:['tabnum'],
    watch:{
        tabnum(){
            if(this.tabnum==3){
                this.getData()
                this.getMode()
            }
        }
    },
    data () {
        return{
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize: 7,
                current:1
            },
            columns: [
                {
                    title: '设备ID/识别码',
                    dataIndex: 'deviceId',
                    width:150,
                    fixed:'left'
                },
                {
                    title: '设备名称',
                    width:200,
                    dataIndex: 'deviceName',
                    fixed:'left'
                },
                {
                    title: '所属系统',
                    dataIndex: 'systemType',
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
                    dataIndex: 'buildingName',
                },
                {
                    title: '楼层/区域',
                    dataIndex: 'floorName',
                },
                {
                    title: '安装位置',
                    dataIndex: 'location',
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
                pageSize: 7,
                systemType:null,
                deviceType:null,
                deviceModel:null,
                buildingName:null,
                floorName:null
            },
            systemList:[],
            deviceTypeList:[],
            deviceModelList:[],
            buildingList:[],
            floorList:[],
            mode:true,
            tableLoading:false
        }
    },
    components:{
        linkDialog
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    created(){
        this.getMode()
        this.getDictData()
    },
    mounted(){
        this.getData()
    },
    methods:{
        switchChange(val){
            console.log(val)
            updateLinkage({type:val?'1':'0'}).then(res=>{
                if(res && res.data && res.data.success){
                    this.$message.success('修改成功')
                }else{
                    this.$message.error(res.data.errorMsg)
                }
            })
        },
        getMode(){
            getCompany().then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    this.mode=res.data.value.deviceLinkage?true:false//1为手动，0 为自动
                }
            })
        },
        getDictData(){
            findList().then(res=>{
                console.log(res)
                if(res && res.data && res.data.success && res.data.value.length){
                    res.data.value.forEach(s=>{
                        s.label=s.buildingCode
                        s.value=s.buildingCode
                    })
                    this.buildingList=res.data.value
                }
            })
            findPageList({}).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success && res.data.value.content.length){
                    res.data.value.content.forEach(s=>{
                        s.label=s.floorCode
                        s.value=s.floorCode
                    })
                    this.floorList=res.data.value.content
                }
            })
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
        onRenew(record){
            this.visible=true
            this.record=record
            this.dateValue=null
            this.dateValueString=''
        },
        onLink(record){
            console.log(record)
            this.$refs.linkDialog.showDrawer(record, 'link')
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.params.page = 0
                this.pagination.current = 1
                this.pagination.total = 0
                console.log(values);
                this.params.deviceId=values.deviceId?values.deviceId:null
                this.params.buildingName=values.buildingName?values.buildingName:null
                this.params.floorName=values.floorName?values.floorName:null
                this.params.systemCode=values.systemCode?values.systemCode:null
                this.params.deviceType=values.deviceType?values.deviceType:null
                this.params.deviceModel=values.deviceModel?values.deviceModel:null
                this.params.deviceId=values.deviceId?values.deviceId:null
                this.getData()
            });
        },
        handleReset() {
            this.form.resetFields();
        },
        getData(){
            console.log('联动管理')
            this.tableLoading=true
            findLinkPage(this.params).then(res=>{
                this.tableLoading=false
                console.log(res)
                if(res && res.data && res.data.success){
                    if(res.data.value && res.data.value.content.length){
                        const pagination = { ...this.pagination };
                        pagination.total = res.data.value.totalElements;
                        this.pagination = pagination;
                        res.data.value.content.forEach(s=>{
                            s.key=s.deviceId
                        })
                        this.dataSource=res.data.value.content
                    }
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
            if (this.rowLight == record.deviceId) {
                className = 'light-row';
            }
            return className;
        }
    }
}
</script>