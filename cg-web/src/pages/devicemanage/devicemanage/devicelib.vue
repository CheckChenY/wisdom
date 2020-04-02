<template>
    <div class="child_unit">
        <a-row>
            <a-col :span="4">
                <buildingtree @selectedKeys="select"></buildingtree>
            </a-col>
            <a-col :span="20" style="padding-left: 20px;">
                <formSearch :columns="searchCol" @search="handleSearch"></formSearch>
                <div class="table-operations">
                    <a-button type="primary" @click="handleAdd">添加</a-button>
                </div>
                <a-table 
                    bordered 
                    :dataSource="dataSource" 
                    :pagination="pagination"
                    :rowClassName="rowClassName"
                    :scroll="{x:1600,y:0}"
                    :loading="loading"
                    :columns="columns">
                    <template slot="activate" slot-scope="text" >
                        {{text?'未过期':'已过期'}}
                    </template>
                    <template slot="surroundingPhoto" slot-scope="text, record" >
                    <div class="editable-row-operations">
                        <img style="height:30px;max-width:100px;" :src='record.surroundingPhoto'/>
                    </div>
                    </template>
                    <template slot="operation" slot-scope="text, record">
                        <div class="editable-row-operations">
                            <a-button @click="() => onEdit(record)" style="margin-right: 10px;">编辑</a-button>
                            <a-popconfirm title="确定删除?" okText="确定" cancelText="取消" @confirm="() => onDelete(record)">
                                <a-button type="danger">删除</a-button>
                            </a-popconfirm>
                        </div>
                    </template>
                </a-table>
            </a-col>
        </a-row>
        <deviceManDialog ref="deviceManDialog" @imgUrl="fetFloorPlan" @showPoint="showPoint" :pointSign="pointSign" @submit="submit"></deviceManDialog>
        <a-modal
            title="点位标注"
            :visible="dialogPointVisible"
            width="800px"
            @ok="dialogPointVisible = false"
            @cancel="dialogPointVisible = false">
            <DevicePosition
                v-if="dialogPointVisible"
                domTop="179"
                domWidth='800'
                :offsetY="offsetY"
                :offsetX="offsetX"
                :planFloor="planFloor"
                :pointSign="pointSign"
                :pointClick="pointClick"
                @getPoinValue="getPoinValue"
            ></DevicePosition>
        </a-modal>
    </div>
</template>
<script>
import deviceManDialog from './deviceManDialog.vue';
import formSearch from '@/components/base/formSearch.vue';
import buildingtree from "@/components/buildingtree"
import { columns, columnsForm } from '@/const/devicemanage/devicelib.js';
import { getDeviceFindList } from "@/api/public"
import { findDevicePageList, delDeviceUser } from "@/api/devicemanage/devicemanage/devicelib"
import { findByBuildCode } from "@/api/floor"
import { findList } from "@/api/building"
import { debuglog } from 'util';
import DevicePosition from "@/components/public/device-position";
import { mapGetters } from "vuex";

export default {
    components: {
        deviceManDialog,
        formSearch,
        buildingtree,
        DevicePosition
    },
    data() {
        return {
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize: 7,
                current: 1
            },
            loading: false,
            columns: columns,
            searchCol: [
                {
                    title: '所属系统',
                    dataIndex: 'systemId',
                    type: 'select',
                    change: this.systemChange,
                    disData: []
                },{
                    title: '设备类型',
                    dataIndex: 'deviceType',
                    change: this.typeChange,
                    type: 'select',
                    disData: []
                },{
                    title: '设备型号',
                    dataIndex: 'deviceModel',
                    type: 'select',
                    disData: []
                }
            ],
            form: this.$form.createForm(this),
            params: {
                page:0,
                pageSize:7,
                floorId: null,
            },
            columnsForm: columnsForm,
            dialogPointVisible:false,
            planFloor:'',
            pointSign:'',
            offsetY:0,
            offsetX:0,
            pointClick:true,
        };
    },
    props:["tabnum"],
    watch:{
        tabnum(){
            if(this.tabnum==1){
                this.findDevicePageList()
            }
        }
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    created(){
        this.findDevicePageList()
        this.findList()
    },
    mounted () {
        this.getDict()
    },
    methods: {
        fetFloorPlan(imgUrl){
            this.planFloor=this.$imgUrl+imgUrl
        },
        showPoint(pointSign){
            this.pointSign=pointSign
            this.dialogPointVisible=true
        },
        getPoinValue(point){
            this.pointSign=point.pointSign
        },
        handleSearch(values) {
            this.params.page = 0
            this.pagination.current = 1
            Object.assign(this.params, values)
            this.findDevicePageList()
        },
        handleAdd() {
            this.$refs.deviceManDialog.showDrawer('', 'add', this.columnsForm)
        },
        onEdit(record){
            this.$refs.deviceManDialog.showDrawer(record, 'edit', this.columnsForm)
        },
        onDelete(record) {
            delDeviceUser({id:record.id, deviceId:record.deviceId}).then(res => {
                if (res && res.data && res.data.success) {
                    this.$message.success('删除成功')
                    this.findDevicePageList()
                } else {
                    this.$message.error(res.data.errorMsg)
                }
            })
        },
        submit(val) {
            this.findDevicePageList()
        },
        getDict () {
            let _this = this
            getDeviceFindList({type:1}).then(res=>{
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                        this.searchCol[0].disData=res.data.value
                    }
                }
            })
            this.columnsForm[5].change = (value) => {
                let obj = _this.columnsForm[5].disData.filter(item => item.value === value)[0]
                _this.findByBuildCode(obj.label)
            }
        },
        systemChange (value) {
            getDeviceFindList({type:2,id:value}).then(res=>{
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                        this.searchCol[1].disData=res.data.value
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
                        this.searchCol[2].disData=res.data.value
                    }
                }
            })
        },
        findDevicePageList () {
            this.loading = true;
            findDevicePageList(this.params).then(res => {
                if (res && res.data && res.data.success) {
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    res.data.value.content = res.data.value.content?res.data.value.content:[]
                    res.data.value.content.forEach(item => {
                        item.key=item.id
                        item.surroundingPhoto = this.$imgUrl + item.surroundingPhoto
                    })
                    this.dataSource = res.data.value.content;
                    this.pagination = pagination;
                }
                this.loading = false;
            })
        },
        // 获取所有建筑
        findList () {
			this.columnsForm[5].disData = []
            findList().then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.forEach(item => {
                        let obj = { 
                            label: item.buildingCode, 
                            value: item.id, 
						}
						this.columnsForm[5].disData.push(obj)
                    })
                }
            })
        },
        findByBuildCode (code) {
			this.columnsForm[6].disData = []
            findByBuildCode({buildingCode:code}).then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.forEach(item => {
                        let obj = { 
                            label: item.floorCode,
                            value: item.id, 
                            img: item.plan
                        }
                        this.columnsForm[6].disData.push(obj);
                    })
                }
            })
        },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.findDevicePageList()
        },
        select (value) {
            this.params.floorId = value[0]
            this.findDevicePageList()
        },
        rowClassName (record) {
            let className = '';
            if (this.rowLight == record.id) {
                className = 'light-row';
            }
            return className;
        }
    },
};
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