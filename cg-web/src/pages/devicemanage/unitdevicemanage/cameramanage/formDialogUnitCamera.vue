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
                                :disabled="formEdit"
                                showSearch
                                optionFilterProp="children"
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
                                ]"
                                placeholder="请输入设备类型"
                                >
                                <a-select-option :value="s.label" v-for="(s, i) in deviceTypeList" :key="i">
                                    {{s.label}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="设备型号">
                            <a-input 
                                placeholder="请输入设备型号"
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
                                ]"
                                maxLength="45"
                                :disabled="formEdit"/>
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
                                maxLength="45"
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
                            <a-checkbox-group :disabled="formEdit" :options="plainOptions" v-model="checkedList" @change="onChange" />
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
import { insert,findOrgByType } from '@/api/company/companyassociation'
export default {
    data() {
        return {
            visible: false,
            title: '',
            form: this.$form.createForm(this),
            formEdit: false,
            checkedList:[],
            plainOptions:['实时视频','报警截图','录像回放','设备状态获取'],
            deviceTypeList:[],
        };
    },
    watch: {
    },
    created(){
        
    },
    methods: {
        onChange(checkedList) {
            this.indeterminate = !!checkedList.length && checkedList.length < this.plainOptions.length;
            this.checkAll = checkedList.length === this.plainOptions.length;
        },
        handleSubmit(e){
            e.preventDefault();
            this.form.validateFields((error, values) => {
                if(!error){
                    values.cameraFunction = ''
                    this.checkedList.forEach(item => {
                        switch(item) {
                            case "实时视频":
                                values.cameraFunction += '1,'
                                break
                            case "报警截图":
                                values.cameraFunction += '2,'
                                break
                            case "录像回放":
                                values.cameraFunction += '3,'
                                break
                            case "设备状态获取":
                                values.cameraFunction += '4,'
                                break
                        }
                    })
                    values.cameraFunction = values.cameraFunction.slice(0, values.cameraFunction.lastIndexOf())
                    this.$emit('submit', values)
                    this.visible = false;
                }
            });
        },
        showDrawer(record, handle, params) {
            this.visible = true;
            this.deviceTypeList = params.deviceTypeList
            this.$store.dispatch("setRowLight", record.id)
            this.checkedList = []
            for (let i = 1; i < 5; i++) {
                if (record.cameraFunction && record.cameraFunction.indexOf(1) != -1) {
                    this.checkedList.push(this.plainOptions[i])
                }
            }
            
            this.$nextTick(()=>{
                if (handle === 'edit') {
                    this.formEdit = false
                    this.title = '设备编辑'
                } else {
                    this.formEdit = true
                    this.title = '设备详情'
                }
                this.form.setFieldsValue({
                    'commStatus':record.commStatus,
                    'deviceId':record.deviceId,
                    'deviceCaptch':record.deviceCaptch,
                    'deviceCusername':record.deviceCusername,
                    'deviceCpassword':record.deviceCpassword,
                    'deviceModel':record.deviceModel,
                    'deviceName':record.deviceName,
                    'deviceType':record.deviceType,
                });
            })
        },
        onClose() {
            this.visible = false;
            this.$store.dispatch("setRowLight", '')
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