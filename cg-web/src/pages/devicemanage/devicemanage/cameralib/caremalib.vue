<template>
    <div class="menu_manage" style="display: flex;">
        <div style="width:280px;">
            <buildingtree @selectedKeys="select"/>
        </div>
        <div style="width:85%;padding-left:20px;">
            <a-form class="ant-advanced-search-form" style="margin-top:-10px;" :form="form" @submit="handleSearch">
                <a-row :gutter="25">
                    <a-col :span="5">
                        <a-form-item label="设备ID">
                            <a-input
                            v-decorator="['deviceId']"
                            maxLength="45"
                            placeholder="设备ID"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-item label="设备名称">
                            <a-input
                            v-decorator="['deviceName']"
                            maxLength="255"
                            placeholder="设备名称"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="5">
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
                    <a-col :span="5">
                        <a-form-item label="设备型号">
                            <a-select 
                                placeholder="请选择设备型号"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="['deviceModel']">
                                <a-select-option v-for="(item,index) in deviceModelList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="4" style="margin-top:3px;">
                        <a-button type="primary" html-type="submit">
                            查询
                        </a-button>
                        <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                            清空
                        </a-button>
                    </a-col>
                </a-row>
            </a-form>
            <div class="table-operations" style="margin-bottom:15px;">
                <a-button @click="add" icon="plus" type="primary">添加</a-button>
            </div>
            <div style="width:100%;">
                <a-table :loading="tableLoading" 
                    :pagination="pagination" 
                    :scroll="{x:1500,y:0}" size="small" 
                    bordered :dataSource="dataSource" 
                    :rowClassName="rowClassName"
                    :columns="columns">
                    <template slot="operation" slot-scope="text, record" style="display: flex;">
                        <div class="editable-row-operations">
                            <a-button @click="() => onEdit(record)" type="primary" style="margin-right: 10px;">编辑</a-button>
                            <a-button @click="() => onDelete(record)" type="danger">删除</a-button>
                        </div>
                    </template>
                </a-table>
            </div>
        </div>
        <a-modal
            title="续费设置"
            :visible="visible"
            @ok="handleOk"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
        >
            <div style="margin:20px 0;display: flex;justify-content: center;align-items: center;">
                到期时间：<a-date-picker placeholder="请选择到期时间" :disabledDate="disabledDate" v-model="dateValue" @change="onDateChange" />
            </div>
        </a-modal>
        <formDialog ref="formDialog" @refresh="refresh" :deviceTypeList="deviceTypeList"></formDialog>
    </div>
</template>
<script>
import formDialog from './formDialog.vue';
import buildingtree from "@/components/buildingtree"
import { findCameraPageList,deleteCamera, findById } from '@/api/devicemanage/devicemanage/caremalib'
import { getDeviceFindList } from '@/api/public'
import moment from 'moment';
import { mapGetters } from "vuex";
export default {
    components:{
        buildingtree,
        formDialog
    },
    data () {
        return{
            dataSource: [],
            count: 2,
            columns: [
                {
                    title: '设备名称',
                    dataIndex: 'deviceName',
                    fixed:'left',
                    width:150
                },
                {
                    title: '设备ID',
                    dataIndex: 'deviceId',
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
                    title: '区域/楼层',
                    dataIndex: 'floorName',
                },
                {
                    title: '安装位置',
                    dataIndex: 'location',
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
                size:10,
                deviceName:null,
                deviceType:null,
                deviceModel:null,
                deviceId:null
            },
            deviceTypeList:[],
            visible:false,
            confirmLoading:false,
            dateValue:null,
            dateValueString:'',
            record:null,
            manufactureDate:null,
            manufactureDateValue:[],
            pagination: {
                size:'middle',
                onChange: this.onChange,
                current: 1,
                pageSize: 10,
            },
            tableLoading:false,
            deviceModelList: [],
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
        refresh(){
            this.getData()
        },
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
        typeChange (value) {
            getDeviceFindList({type:3,id:value}).then(res=>{
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
        onRangeDateChange(date,dateString){
            this.manufactureDate=date
            this.manufactureDateValue=dateString
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
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
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
        onEdit(record){
            this.$refs.formDialog.showDrawer(record, 'edit')
        },
        onView(record) {
            console.log(record)
            this.$refs.formDialog.showDrawer(record, 'view')
        },
        onUnband(record){
            this.$confirm({
                title: '提示',
                content: `解绑后该单位将查询不到该设备信息`,
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    console.log(record);
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        },
        add(){
            this.$refs.formDialog.showDrawer('', 'add')
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.params.page = 0
                this.pagination.current = 1
                this.params.deviceName=values.deviceName?values.deviceName:null
                this.params.deviceId=values.deviceId?values.deviceId:null
                this.params.deviceModel=values.deviceModel?values.deviceModel:null
                this.params.deviceType=values.deviceType?values.deviceType:null
                this.getData()
            });
        },
        handleReset() {
            this.form.resetFields();
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
                    this.dataSource=res.data.value.content
                    this.pagination = pagination;
                }else{
                    this.dataSource=[]
                }
            })
        },
        select (value) {
            this.params.floorId = value[0]
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
.child_unit{
    .table-operations {
        text-align: left;
        margin-bottom: 16px;
    }

    .table-operations > button {
        margin-right: 8px;
    }
}
</style>