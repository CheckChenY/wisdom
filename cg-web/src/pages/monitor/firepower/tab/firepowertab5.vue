<template>
    <div>
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="8">
                    <a-form-item label="设备名称">
                        <a-input
                        v-decorator="['deviceName']"
                        maxLength="255"
                        placeholder="设备名称"/>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
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
                <a-col :span="8">
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
                <a-col :span="8">
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
                <a-col :span="8" >
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
                <a-col :span="8" >
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
                <a-col :span="5" style="margin-top: -7px;margin-bottom: 5px;">
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
            :columns="columns">
        </a-table>
    </div>
</template>

<script>
import { getDeviceFindList } from '@/api/public'
import { findList } from '@/api/building'
import { findPageList } from '@/api/floor'
import { getLinkDevice } from '@/api/monitor/monitor'
import { dict } from '@/const/dict'
export default {
    props: ["paramData","tabnum"],
    watch:{
        'paramData.deviceId':function(val, oval){
            this.params.deviceId = val
            this.getData()
        },
        tabnum(){
            if(this.tabnum==5){
                this.getData()
            }
        }
    },
    data () {
        return{
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize: 6,
                current:1
            },
            columns: [
                {
                    title: '设备ID/识别码',
                    dataIndex: 'deviceId',
                },
                {
                    title: '设备名称',
                    dataIndex: 'deviceName',
                },
                {
                    title: '设备类型',
                    dataIndex: 'type',
                },
                {
                    title: '设备型号',
                    dataIndex: 'model',
                },
                {
                    title: '所属建筑',
                    dataIndex: 'build',
                },
                {
                    title: '楼层/区域',
                    dataIndex: 'floor',
                },
                {
                    title: '安装位置',
                    dataIndex: 'location',
                },
                {
                    title: '设备状态',
                    dataIndex: 'warnState',
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                pageSize:6,
                deviceId: ''
            },
            systemList:[],
            deviceTypeList:[],
            deviceModelList:[],
            buildingList:[],
            floorList:[],
            tableLoading:false
        }
    },
    created(){
        this.getDictData()
        this.params.deviceId = this.paramData.deviceId
        this.getData()
    },
    mounted(){
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
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.params.page = 0
                this.pagination.current = 1
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
            // this.params.deviceId='WG0002'
            getLinkDevice(this.params).then(res=>{
                this.tableLoading=false
                if(res && res.data && res.data.success){
                    if(res.data.value.content && res.data.value.content.length){
                        const pagination = { ...this.pagination };
                        pagination.total = res.data.value.totalElements;
                        this.pagination = pagination;
                        res.data.value.content.forEach(s=>{
                            s.key = s.id
                            let warn = dict.USESTATE.filter(item => item.value == s.warnState)
                            s.warnState = warn.length>0?warn[0].label:''
                        })
                    }
                    this.dataSource=res.data.value.content
                }
            })
        },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        }
    }
}
</script>