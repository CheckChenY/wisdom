<template>
    <div class="child_unit">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="5">
                    <a-form-item label="设备名称">
                        <a-input
                        v-decorator="[
                            'deviceName',
                        ]"
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
                                v-decorator="['systemId']">
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
                <a-col :span="3" :style="{marginTop:'3px'}">
                    <a-button type="primary" html-type="submit">
                        查询
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        清空
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
        <div class="table-operations">
            <a-button type="primary" @click="handleAdd">上传升级文件</a-button>
        </div>
        <a-table :loading="tableLoading" :scroll="{ x: 1800, y: 0 }" 
            bordered 
            :pagination="pagination"
            :dataSource="dataSource" :columns="columns"></a-table>
        <formDialog ref="formDialog" :systemList="systemList" @refresh="refresh"></formDialog>
    </div>
</template>
<script>
import formDialog from './formDialog.vue';
import { page } from '@/api/devicemanage/deviceupgrade'
import { getDeviceFindList } from '@/api/public'
export default {
    components: {
        formDialog
    },
    props:['tabnum'],
    data() {
        return {
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize:9,
                current: 1
            },
            columns: [
                {
                    title: '序号',
                    dataIndex: 'id',
                    fixed:'left',
                    width:150,
                },
                {
                    title: '设备ID',
                    dataIndex: 'deviceId',
                    fixed:'left',
                    width:150,
                },
                {
                    title: '设备名称',
                    dataIndex: 'deviceName',
                    fixed:'left',
                    width:150,
                },
                {
                    title: '所属系统',
                    dataIndex: 'system',
                },
                {
                    title: '设备类型',
                    dataIndex: 'type',
                },
                {
                    title: '设备型号',
                    dataIndex: 'model',
                },{
                    title: '升级前版本',
                    dataIndex: 'version',
                },{
                    title: '包数',
                    dataIndex: 'dataPkgCount',
                },{
                    title: '已发送',
                    dataIndex: 'sended',
                },{
                    title: '未发送',
                    dataIndex: 'noSend',
                },{
                    title: '升级状态',
                    dataIndex: 'state',
                    fixed:'right',
                    width:150,
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                limit:9,
            },
            systemList:[],
            deviceTypeList:[],
            deviceModelList:[],
            tableLoading:false
        };
    },
    watch:{
        tabnum(){
            if(this.tabnum==1){
                this.getDict()
            }
        }
    },
    created(){
        this.getDict()
    },
    mounted(){

    },
    methods: {
        getDict(){
            getDeviceFindList({type:1}).then(res=>{
                console.log(res)
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
            this.getData()
        },
        systemChange (value) {
            this.form.setFieldsValue({
                deviceType:'',
                deviceModel:''
            })
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
            this.form.setFieldsValue({
                deviceModel:''
            })
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
        refresh(){
            this.getDict()
        },
        getData(){
            this.tableLoading=true
            page(this.params).then(res=>{
                this.tableLoading=false
                if(res && res.data && res.data.success){
                    if(res.data.value.content && res.data.value.content.length){
                        res.data.value.content.forEach(s=>{
                            this.systemList.forEach(t=>{
                                if(s.systemCode && t.value==s.systemCode){
                                    s.systemCode=t.label
                                }
                            })
                            this.deviceTypeList.forEach(t=>{
                                if(s.deviceType && t.value==s.deviceType){
                                    s.deviceType=t.label
                                }
                            })
                            this.deviceModelList.forEach(t=>{
                                if(s.deviceModel && t.value==s.deviceModel){
                                    s.deviceModel=t.label
                                }
                            })
                            s.state=s.state==3?'发生异常':s.state==2?'已完成':s.state==1?'传输中':'未开始'
                        })
                    }
                    this.dataSource=res.data.value.content
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    this.pagination = pagination;
                }
            })
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
        handleAdd() {
            this.$refs.formDialog.showDrawer('', 'add')
        },
        handleReset() {
            this.form.resetFields();
        },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
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
.ant-advanced-search-form {
    padding: 24px;
    background: #fff;
    /* border: 1px solid #d9d9d9; */
    border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
    display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
    flex: 1;
}

#components-form-demo-advanced-search .ant-form {
    max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}
</style>