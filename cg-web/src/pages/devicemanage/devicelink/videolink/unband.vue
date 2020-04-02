<template>
    <div>
        <a-form style="margin-top:30px;" class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="25">
                <a-col :span="5">
                    <a-form-item label="设备ID">
                        <a-input
                        style="margin-left:10px;margin-top:-10px;"
                        v-decorator="['deviceId']"
                        maxLength="45"
                        placeholder="设备ID"/>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="设备类型">
                            <a-select 
                                style="margin-left:10px;margin-top:-10px;"
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                @select="typeChange"
                                v-decorator="['deviceType']">
                                <a-select-option v-for="(item,index) in deviceTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="设备型号">
                            <a-select 
                                style="margin-left:10px;margin-top:-10px;"
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="['deviceModel']">
                                <a-select-option v-for="(item,index) in deviceModelList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="所属建筑">
                        <a-select 
                            style="margin-left:10px;margin-top:-10px;"
                            placeholder="请选择"
                            showSearch
                            optionFilterProp="children"
                            v-decorator="['buildingId']">
                            <a-select-option v-for="(item,index) in buildingList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="楼层/区域">
                        <a-select 
                            style="margin-left:10px;margin-top:-10px;"
                            placeholder="请选择"
                            showSearch
                            optionFilterProp="children"
                            v-decorator="['floorId']">
                            <a-select-option v-for="(item,index) in floorList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="4" style="margin-top:-7px;">
                    <a-button type="primary" html-type="submit">
                        查询
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        清空
                    </a-button>
                </a-col>
                <a-col :span="8" style="margin-top:-7px;"></a-col>
            </a-row>
        </a-form>
        <a-table bordered size="small" 
            :dataSource="dataSource" 
            :pagination="pagination"
            :columns="columns">
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
                    <a-button @click="() => onUnLink(record)" type="primary" style="margin-right: 10px;">解绑</a-button>
                </div>
            </template>
        </a-table>
    </div>
</template>
<script>
import { deleteGroup, findLinkCamera } from '@/api/devicemanage/devicelink'
import { getDeviceFindList } from '@/api/public'
export default {
    data() {
        return {
            visible: false,
            title: '',
            form: this.$form.createForm(this),
            formEdit: false,
            dataSource:[],
            pagination: {
                onChange: this.onChange,
                pageSize: 7,
                current: 1
            },
            params:{
                page: 0,
                pageSize: 7,
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
                    width: 100,
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            deviceTypeList: [],
            deviceModelList: [],
        };
    },
    props:["deviceId","buildingList","floorList"],
    watch: {
        deviceId(){
            this.getLinkList()
        }
    },
    created(){
        this.getDictData()
        this.getLinkList()
    },
    methods: {
        onUnLink(record){
            deleteGroup({
                deviceId:this.deviceId,
                relationDeviceId:record.deviceId,
            }).then(res=>{
                if(res && res.data && res.data.success){
                    this.$message.success('解绑成功');
                    this.$emit('refreshUnBand','')
                    this.getLinkList()
                }else{
                    this.$message.error(res.data.errorMsg)
                }
            })
        },
        handleReset(){
            this.form.resetFields();
        },
        handleSearch(){
            this.form.validateFields((error, values) => {
                this.params.page = 0;
                this.pagination.current = 1;
                Object.assign(this.params, values)
                this.getLinkList()
            });
        },
        getLinkList(){
            this.params.primaryDeviceId=this.deviceId
            findLinkCamera(this.params).then(res=>{
                if(res && res.data && res.data.success){
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    this.pagination = pagination;
                    this.dataSource=res.data.value.content
                }else{
                    this.dataSource=[]
                }
            })
        },
        onChange(value) {
            this.params.page = value - 1;
            this.pagination.current = value;
            this.getLinkList()
        },
        getDictData(){
            getDeviceFindList({type:2,id:1574920051755879}).then(res=>{
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