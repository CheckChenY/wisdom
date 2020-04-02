<template>
    <div>
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="5">
                    <a-form-item label="设备名称">
                        <a-input
                        v-decorator="['deviceName']"
                        maxLength="255"
                        placeholder="设备名称"/>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
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
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="['deviceModel']">
                                <a-select-option v-for="(item,index) in deviceModelList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5" style="margin-top:-10px;">
                    <a-form-item label="所属建筑">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="['buildingId']">
                                <a-select-option v-for="(item,index) in buildingList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5" style="margin-top:-10px;">
                    <a-form-item label="区域/楼层">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="['floorId']">
                                <a-select-option v-for="(item,index) in floorList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5" style="margin-top: -7px;">
                    <a-button type="primary" html-type="submit">
                        查询
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        清空
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
        <a-table :loading="tableLoading" bordered 
            :dataSource="dataSource" 
            :pagination="pagination"
            :rowClassName="rowClassName"
            :columns="columns">
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
                    <a-button @click="() => onAdd(record)" type="text" style="margin-right: 10px;">添加</a-button>
                    <a-button @click="() => onEdit(record)" type="primary" style="margin-right: 10px;">编辑</a-button>
                </div>
            </template>
        </a-table>
        <formDialog ref="formDialog" :buildingList="buildingList" :floorList="floorList" :systemList="systemList" :deviceTypeList="deviceTypeList" :deviceModelList="deviceModelList"></formDialog>
    </div>
</template>

<script>
import formDialog from './formDialog.vue';
import { getDeviceFindList } from '@/api/public'
import { findList } from '@/api/building'
import { findPageList } from '@/api/floor'
import { findGroupPage } from '@/api/devicemanage/devicelink'
import { mapGetters } from "vuex";
export default {
    props:['tabnum'],
    watch:{
        tabnum(){
            if(this.tabnum==1){
                this.getData()
            }
        }
    },
    data () {
        return{
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize: 8,
                current:1,
                total: 0
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
                    width: 200,
                    scopedSlots: { customRender: 'operation' },
                    fixed:'right'
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                pageSize:8,
            },
            systemList:[],
            deviceTypeList:[],
            deviceModelList:[],
            buildingList:[],
            floorList:[],
            tableLoading:false
        }
    },
    components:{
        formDialog
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
    methods:{
        getDictData(){
            findList().then(res=>{
                console.log(res)
                if(res && res.data && res.data.success && res.data.value.length){
                    res.data.value.forEach(s=>{
                        s.label=s.buildingCode
                        s.value=s.id
                    })
                    this.buildingList=res.data.value
                }
            })
            findPageList({}).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success && res.data.value.content.length){
                    res.data.value.content.forEach(s=>{
                        s.label=s.floorCode
                        s.value=s.id
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
        onAdd(record){
            this.$refs.formDialog.showDrawer(record, 'add')
        },
        onEdit(record) {
            this.$refs.formDialog.showDrawer(record, 'edit')
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.params.page = 0
                this.pagination.current = 1
                this.pagination.total = 0
                for (let key in values) {
                    if (!values[key]) {
                        values[key] = ""
                    }
                }
                Object.assign(this.params,values)
                this.getData()
            });
        },
        handleReset() {
            this.form.resetFields();
        },
        // refresh(){
        //     this.getData()
        // },
        // refreshUnBand(){
        //     this.getData()
        // },
        getData(){
            this.tableLoading=true
            findGroupPage(this.params).then(res=>{
                this.tableLoading=false
                if(res && res.data && res.data.success){
                    if(res.data.value.content.length){
                        const pagination = { ...this.pagination };
                        pagination.total = res.data.value.totalElements;
                        this.pagination = pagination;
                    }
                    this.dataSource=res.data.value.content
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