<template>
    <div class="form_dialog">
        <a-drawer
            :title="title"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
            :destroyOnClose="true"
            :width="720"
            >
            <a-form :form="form" layout="vertical" @submit="handleSubmit">
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="设备识别码">
                            <a-input 
                            placeholder="请输入设备识别码"
                            v-decorator="[
                                'deviceCode',
                                {
                                    rules: [
                                        {
                                        required: true,
                                        message: '设备识别码!',
                                        },
                                    ],
                                },
                            ]"
                            maxLength="45"
                            @change="codeChange"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="设备ID">
                                <a-input 
                                placeholder="请输入设备ID"
                                maxLength="45"
                                v-decorator="[
                                    'deviceId',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '设备ID!',
                                            },
                                        ],
                                    },
                                ]"
                                :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="所属系统">
                            <a-select 
                                :disabled="formEdit"
                                @select="systemChange"
                                showSearch
                                optionFilterProp="children"
                                placeholder="请选择所属系统"
                                v-decorator="['systemCode']">
                                <a-select-option v-for="(item,index) in systemList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="设备类型">
                            <a-select 
                                @select="typeChange"
                                :disabled="formEdit"
                                showSearch
                                optionFilterProp="children"
                                placeholder="请选择设备类型"
                                v-decorator="['deviceType']">
                                <a-select-option v-for="(item,index) in deviceTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="设备型号">
                            <a-select 
                                :disabled="formEdit"
                                showSearch
                                optionFilterProp="children"
                                placeholder="请选择设备型号"
                                v-decorator="['deviceModel']">
                                <a-select-option v-for="(item,index) in deviceModelList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="设备名称">
                                <a-input 
                                placeholder="请输入设备名称"
                                maxLength="255"
                                v-decorator="['deviceName']"
                                :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="PSK码">
                            <a-input 
                            placeholder="请输入PSK码"
                            v-decorator="['pskCode']"
                            maxLength="45"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="固件版本">
                            <a-input 
                            placeholder="请输入固件版本"
                            v-decorator="['version']"
                            maxLength="45"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <div
                :style="{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right',
                }"
            >
                    <a-button :style="{marginRight: '8px'}"  
                    html-type="submit" type="primary" v-if="!formEdit">提 交</a-button>
                    <a-button :style="{marginRight: '8px'}" @click="onClose">
                        取 消
                    </a-button>
                </div>
            </a-form>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
import { insertByAdmin,deviceUpdate, findByPrefixAndSuffix } from '@/api/devicemanage/devicelib/devicelib'
import { debuglog } from 'util';
import { getDeviceFindList } from '@/api/public'
export default {
    data() {
        return {
            visible: false,
            title: '',
            form: this.$form.createForm(this),
            formEdit: false,
            systemId:'',
            systemList:[],
            deviceTypeList:[],
            deviceModelList:[],
            handle:'',
            id:'',
            subBtn: false,
            PASObj: {},
        };
    },
    watch: {
    },
    created(){
        this.getDictData()
    },
    methods: {
        disabledDate(current) {
            // Can not select days before today and today
            return current && current < moment().endOf('day');
        },
        handleSubmit(e){
            var that=this
            e.preventDefault();
            if (this.PASObj.deviceModel) {
                this.form.setFieldsValue({
                    'deviceModel': this.PASObj.deviceModel,
                    'systemCode': this.PASObj.systemCode,
                    'deviceType': this.PASObj.deviceType,
                });
            }
            this.form.validateFields((error, values) => {
                if(!error){
                    console.log(values)
                    this.subBtn = true
                    if(this.handle=='add'){
                        insertByAdmin(values).then(res=>{
                            if(res && res.data && res.data.success){
                                that.$message.success('添加成功')
                                that.visible=false
                                that.$emit('refresh','')
                            }else{
                                that.$message.error(res.data.errorMsg)
                            }
                            this.subBtn = false
                        })
                    }else{
                        values.id=this.id
                        deviceUpdate(values).then(res=>{
                            if(res && res.data && res.data.success){
                                that.$message.success('修改成功')
                                that.visible=false
                                that.$emit('refresh','')
                            }else{
                                that.$message.error(res.data.errorMsg)
                            }
                            this.subBtn = false
                        })
                    }
                }
            });
        },
        showDrawer(record, handle) {
            this.visible = true;
            this.subBtn = true
            this.handle=handle
            this.$store.dispatch("setRowLight",record.id)
            if(handle=='add'){
                this.$nextTick(()=>{
                    // this.formEdit = false
                    this.title = '添加'
                    this.deviceTypeList=[]
                    this.deviceModelList=[]
                    this.form.setFieldsValue({
                        'deviceId':'',
                        'deviceModel':'',
                        'deviceName':'',
                        'systemCode':'',
                        'deviceType':'',
                        // 'profileId':'',
                        'deviceCode':'',
                        'pskCode':'',
                        'version':'',
                    });
                })
            }else{
                this.$nextTick(()=>{
                    this.formEdit = false
                    this.title = '编辑'
                    this.id=record.id
                    console.log(this.deviceTypeList)
                    getDeviceFindList({type:2,id:record.systemCode}).then(res=>{
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
                    getDeviceFindList({type:3,id:record.deviceType}).then(res=>{
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
                    console.log(this.deviceTypeList)
                    console.log(this.deviceModelList)
                    this.form.setFieldsValue({
                        'deviceId':record.deviceId,
                        'deviceModel':record.deviceModel?parseInt(record.deviceModel):'',
                        'deviceName':record.deviceName,
                        'systemCode':record.systemCode?parseInt(record.systemCode):'',
                        'deviceType':record.deviceType?parseInt(record.deviceType):'',
                        // 'profileId':record.profileId,
                        'deviceCode':record.deviceCode,
                        'pskCode':record.pskCode,
                        'version':record.version,
                    });
                })
            }
        },
        onClose() {
            this.form.resetFields();
            this.$store.dispatch("setRowLight",'')
            this.visible = false;
        },
        getDictData(){
            getDeviceFindList({type:1}).then(res=>{
                this.systemList=[]
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        let index = ''
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                            if (s.dataDicDesc == "视频监控") {
                                index = res.data.value.indexOf(s)
                            }
                        })
                        res.data.value.splice(index, 1)
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
                this.form.setFieldsValue({
                    'deviceModel':'',
                    'deviceType':'',
                });
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
                this.form.setFieldsValue({
                    'deviceModel':'',
                });
            })
        },
        codeChange (value) {
            findByPrefixAndSuffix({deviceCode:value.target.value}).then(res => {
                if(res && res.data && res.data.success){
                    console.log(res.data.value)
                    this.PASObj = res.data.value
                    this.form.setFieldsValue({
                        'deviceModel': this.PASObj.deviceModelName,
                        'systemCode': this.PASObj.systemName,
                        'deviceType': this.PASObj.deviceTypeName,
                    });
                } else {
                    this.$message.error(res.data.errorMsg)
                }
            })
        }
    },
};
</script>
<style lang='scss'>
.form_dialog{
    .table-operations {
        text-align: left;
        margin-bottom: 16px;
    }

    .table-operations > button {
        margin-right: 8px;
    }
}
</style>