x<template>
    <div>
        <a-form style="margin-top:30px;" class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="设备ID/识别码">
                        <a-input
                        v-decorator="['deviceId']"
                        maxLength="45"
                        placeholder="设备ID/识别码:"/>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="所属系统:">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                @select="systemChange"
                                v-decorator="['systemCode']">
                                <a-select-option v-for="(item,index) in systemList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="设备类型:">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                @select="typeChange"
                                v-decorator="['deviceType']">
                                <a-select-option v-for="(item,index) in deviceTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="设备型号:">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="['deviceModel']">
                                <a-select-option v-for="(item,index) in deviceModelList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="所属建筑:">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="['buildingName']">
                                <a-select-option v-for="(item,index) in buildingList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="楼层/区域:">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="['floorName']">
                                <a-select-option v-for="(item,index) in floorList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6"></a-col>
                <a-col :span="6">
                    <a-button type="primary" html-type="submit">
                        查询
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        清空
                    </a-button>
                </a-col>

            </a-row>

            <a-col :span="8" style="margin-top:-7px;"></a-col>
        </a-form>
        <a-table bordered size="small" 
            :dataSource="dataSource" 
            :pagination="pagination"
            :loading="loading"
            :columns="columns">
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
                    <a-button @click="() => onLink(record)" type="primary" style="margin-right: 10px;">关联</a-button>
                </div>
            </template>
        </a-table>
    </div>
</template>
<script>
import { insertGroup, findNoLinkGroupPage } from '@/api/devicemanage/devicelink'
import { getDeviceFindList } from '@/api/public'
export default {
    data() {
        return {
            visible: false,
            title: '',
            form: this.$form.createForm(this),
            formEdit: false,
            loading: false,
            dataSource:[],
            pagination: {
                onChange: this.onChange,
                current:1,
                pageSize: 8,
            },
            params:{
                page:0,
                pageSize:8,
                deviceId: '',
                deviceModel:'',
                buildingId:'',
                floorId:'',
                systemCode: '',
                deviceType: ''
            },
            columns:[{
                    title: '设备ID/识别码',
                    dataIndex: 'deviceId',
                },
                {
                    title: '设备名称',
                    dataIndex: 'deviceName',
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
                    dataIndex: 'buildingByName',
                },
                {
                    title: '楼层/区域',
                    dataIndex: 'floorByName',
                },
                {
                    title: '安装位置',
                    dataIndex: 'location',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 100,
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            systemList:[],
            deviceTypeList:[],
            deviceModelList:[],
            id:''
        };
    },
    props:["deviceId","buildingList","floorList"],
    created(){
        this.getData();
        this.getDictData();
    },
    methods: {
        onLink(record){
            console.log(record);
            insertGroup({
                deviceId:record.deviceId,//子设备deviceId
                relationDeviceId:this.deviceId,//主设备deviceId
            }).then(res=>{
                console.log(res);
                if(res && res.data && res.data.success){
                    this.$message.success('关联成功');
                    this.$emit('refresh','');
                    this.getData();
                }else{
                    this.$message.error(res.data.errorMsg)
                }
            })
        },
        handleReset(){
            this.form.resetFields();
        },
        handleSearch(e) {
            this.systemList = [];
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.params.buildingId = values.buildingName ? values.buildingName : null;
                this.params.floorId = values.floorName ? values.floorName : null;
                this.params.systemType = values.systemType ? values.systemType : null;
                this.params.deviceType = values.deviceType ? values.deviceType : null;
                this.params.deviceModel = values.deviceModel ? values.deviceModel : null;
                this.params.deviceId = values.deviceId ? values.deviceId : null;
                this.params.page = 0;
                this.pagination.current = 1;
                Object.assign(this.params,values);
                this.getData();
            });
        },
        getData(){
            this.loading = true;
            findNoLinkGroupPage(this.params).then(res=>{
                console.log(res);
                if (res && res.data && res.data.success) {
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    this.dataSource = res.data.value.content;
                    this.pagination = pagination;
                } else {
                    this.dataSource = [];
                    this.pagination.page = 0
                }
                this.loading = false;
            })
        },
        onChange (value) {
            this.params.page = value - 1;
            this.pagination.current = value;
            this.getData();
        },
        getDictData(){
            getDeviceFindList({type:1}).then(res=>{
                this.systemList=[];
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc;
                            s.value=s.id
                        });
                        this.systemList=res.data.value
                    }
                }
            })
        },
        systemChange (value) {
            getDeviceFindList({type:2,id:value}).then(res=>{
                this.deviceTypeList=[];
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc;
                            s.value=s.id
                        });
                        this.deviceTypeList=res.data.value
                    }
                }
            })
        },
        typeChange (value) {
            getDeviceFindList({type:3,id:value}).then(res=>{
                this.deviceModelList=[];
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc;
                            s.value=s.id;
                        });
                        this.deviceModelList=res.data.value
                    }
                }
            })
        },
    },
};
</script>
<style lang='scss'>
.form_dialog{
    .table-operations {
        text-align: left;
    }

    .table-operations > button {
        margin-right: 8px;
    }
}
</style>