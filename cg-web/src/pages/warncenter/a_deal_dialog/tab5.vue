<template>
    <div>
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="8">
                    <a-form-item label="设备名称">
                            <a-input 
                                placeholder="设备名称"
                                maxLength="255"
                                v-decorator="[
                                    'deviceName',
                                    {
                                        rules: [
                                            {
                                            required: false,
                                            },
                                        ],
                                    },
                                ]">
                            </a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="设备类型">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="[
                                    'deviceType',
                                    {
                                        rules: [
                                            {
                                            required: false,
                                            },
                                        ],
                                    },
                                ]">
                                <a-select-option v-for="(item,index) in deviceTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="所在建筑">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="[
                                    'buildingId',
                                    {
                                        rules: [
                                            {
                                            required: false,
                                            },
                                        ],
                                    },
                                ]">
                                <a-select-option v-for="(item,index) in buildingList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="8" style="margin-top: -20px;">
                    <a-form-item label="楼层/区域">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="[
                                    'floorId',
                                    {
                                        rules: [
                                            {
                                            required: false,
                                            },
                                        ],
                                    },
                                ]">
                                <a-select-option v-for="(item,index) in floorList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="8" style="margin-top: -17px;">
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
            style="margin-top:0;"
            bordered 
            size="small"
            :pagination="pagination"
            :dataSource="dataSource" :columns="columns">
        </a-table>
    </div>
</template>
<script>
import { findList } from "@/api/building"
import { findPageList } from "@/api/floor"
import { getDeviceFindList } from '@/api/public'
import { getLinkDevice } from '@/api/warncenter/warnpublic'
import { dict } from '@/const/dict'

export default {
    props:['warnnum','record'],
    watch:{
        warnnum(){
            if(this.warnnum==5){
                this.getDictData()
                this.$nextTick(()=>{
                    this.getData()
                })
            }
        }
    },
    data(){
        return{
            tableLoading:false,
            pagination: {
                onChange: this.onChange,
                pageSize:9,
                current: 1,
                size:'middle'
            },
            dataSource:[],
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
            deviceTypeList:[],
            buildingList:[],
            floorList:[],
            params:{
                deviceName:null,
                systemCode:null,
                deviceType:null,
                deviceModel:null,
                floorId:null,
                page:0,
                pageSize:10,
                deviceId:null,
                buildingId:null
            },
            warnTypeList:dict.USESTATE,
        }
    },
    created(){
        this.getDictData()
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            this.params.deviceId=this.record.deviceId
            // this.params.deviceId='WG0002'
            getLinkDevice(this.params).then(res=>{
                if(res && res.data && res.data.success){
                    if(res.data.value.content.length){
                        res.data.value.content.forEach((s,ind)=>{
                            s.key=s.ind
                            let warnState = this.warnTypeList.filter(item => item.value == s.warnState)
                            if (warnState.length > 0) {
                                s.warnState=warnState[0].label
                            }
                        })
                    }
                    this.dataSource=res.data.value.content
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    pagination.pageSize=res.data.value.size
                    this.pagination = pagination;
                }
            })
        },
        getDictData(){
            this.deviceTypeList=[]
            getDeviceFindList({type:2,id:this.record.systemId}).then(res=>{
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
            findList().then(res => {
                if(res && res.data && res.data.success && res.data.value && res.data.value.length){
                    res.data.value.forEach(s=>{
                        s.label=s.buildingCode
                        s.value=s.id
                    })
                    this.buildingList=res.data.value
                }
            })
            findPageList({}).then(r=>{
                if(r && r.data && r.data.success && r.data.value.content.length){
                    r.data.value.content.forEach(s=>{
                        s.label=s.floorCode
                        s.value=s.id
                    })
                    this.floorList=r.data.value.content
                }
            })
        },
        handleReset(){
            this.form.setFieldsValue({
                deviceName:'',
                buildingId:'',
                deviceType:'',
                floorId:'',
            })
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.params.buildingId=values.buildingId?values.buildingId:null
                this.params.deviceName=values.deviceName?values.deviceName:null
                this.params.deviceType=values.deviceType?values.deviceType:null
                this.params.floorId=values.floorId?values.floorId:null
                this.getData()
            });
        },
        onChange(value){
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        },
    }
}
</script>