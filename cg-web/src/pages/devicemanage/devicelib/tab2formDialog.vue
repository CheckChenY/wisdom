<template>
    <div class="form_dialog">
        <a-drawer
            :title="title"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
            :width="720"
            >
            <a-form :form="form" layout="vertical" @submit="handleSubmit">
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="设备类型">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                @select="typeChange"
                                v-decorator="[
                                    'deviceType',
                                    {
                                        rules: [
                                        {
                                            required: true,
                                            message: '设备类型!',
                                            },
                                        ],
                                    },
                                ]">
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
                                v-decorator="[
                                    'deviceModel',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '设备型号!',
                                            },
                                        ],
                                    },
                                ]">
                                <a-select-option v-for="(item,index) in deviceModelList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="设备名称">
                                <a-input 
                                placeholder="请输入设备名称"
                                maxLength="255"
                                v-decorator="[
                                    'deviceName',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '设备名称!',
                                            },
                                        ],
                                    },
                                ]"
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
                        <a-form-item label="设备验证码">
                                <a-input 
                                placeholder="请输入设备验证码"
                                v-decorator="[
                                    'deviceCaptch',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '设备验证码!',
                                            },
                                        ],
                                    },
                                ]"
                                maxLength="45"
                                :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="应用名">
                                <a-input 
                                placeholder="请输入应用名"
                                v-decorator="['deviceCusername']"
                                maxLength="45"
                                :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="应用密码">
                                <a-input 
                                placeholder="请输入应用密码"
                                v-decorator="['deviceCpassword']"
                                maxLength="45"
                                :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="15">
                        <a-form-item label="摄像头功能">
                            <a-checkbox-group :options="plainOptions" v-model="checkedList" :disabled="formEdit" @change="onChange" />
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
                    <a-button :style="{marginRight: '8px'}" html-type="submit" type="primary" v-if="!formEdit">提 交</a-button>
                    <a-button :style="{marginRight: '8px'}" @click="onClose">
                        取 消
                    </a-button>
                </div>
            </a-form>
        </a-drawer>
    </div>
</template>
<script>
import { getDeviceFindList } from '@/api/public'
import { update, findDicIdByDesc} from '@/api/devicemanage/devicelib/cameralib'
export default {
    data() {
        return {
            visible: false,
            title: '',
            form: this.$form.createForm(this),
            formEdit: false,
            checkedList:[],
            plainOptionsList:[
                {value:1,label:'实时视频'},  
                {value:2,label:'报警截图'},  
                {value:3,label:'录像回放'},  
                {value:4,label:'设备状态获取'},  
            ],
            plainOptions:[],
            deviceTypeList:[],
            checkedList:[],
            cameraFunction:[],
            id:'',
            deviceModelList: []
        };
    },
    watch: {
    },
    created(){
        this.getDictData()
        this.plainOptionsList.forEach(s=>{
            this.plainOptions.push(s.label)
        })
    },
    methods: {
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
        onChange(checkedList) {
            this.checkedList=checkedList
        },
        getFun(){
            this.cameraFunction=[]
            this.plainOptionsList.forEach(s=>{
                this.checkedList.forEach(t=>{
                    if(s.label==t){
                        this.cameraFunction.push(s.value)
                    }
                })
            })
        },
        handleSubmit(e){
            e.preventDefault();
            this.form.validateFields((error, values) => {
                if(!error){
                    values.id=this.id
                    this.getFun()
                    values.cameraFunction=this.cameraFunction.join(',')
                    values.deviceType=this.deviceTypeList.filter(s=>s.label==values.deviceType)[0].value
                    findDicIdByDesc({desc:values.deviceModel}).then(res => {
                        if(res && res.data && res.data.value){
                            values.deviceModel = res.data.value.id
                        }
                        update(values).then(res=>{
                            if(res && res.data && res.data.success){
                                this.$message.success('修改成功')
                                this.visible=false
                                this.$emit('refresh','')
                            }
                            console.log(res)
                        })
                    })
                }
            });
        },
        showDrawer(record, handle) {
            console.log(record)
            // this.edit
            this.id=record.id
            this.$store.dispatch("setRowLight",record.id)
            this.visible = true;
            this.$nextTick(()=>{
                this.formEdit = false
                this.title = '设备详情'
                this.form.setFieldsValue({
                    'deviceId':record.deviceId,
                    'deviceModel':record.deviceModel,
                    'deviceName':record.deviceName,
                    'deviceType':record.deviceType,
                    'expirationDate':record.expirationDate,
                    'manufactureDate':record.manufactureDate,
                    'systemCode':record.systemCode,
                    'deviceCaptch':record.deviceCaptch,
                    'deviceCpassword':record.deviceCpassword,
                    'deviceCusername':record.deviceCusername,
                });
                this.showFun(record.cameraFunction)
            })
        },
        showFun(cameraFunction){
            this.checkedList=[]
            if(cameraFunction){
                cameraFunction.split(',').forEach(num=>{
                    this.plainOptionsList.forEach(t=>{
                        if(num==t.value){
                            this.checkedList.push(t.label)
                        }
                    })
                })
            }
        },
        onClose() {
            this.visible = false;
            this.$store.dispatch("setRowLight",'')
        },
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