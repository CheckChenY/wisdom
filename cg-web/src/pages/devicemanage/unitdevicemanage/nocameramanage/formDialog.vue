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
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="所属系统">
                            <a-input 
                            placeholder="请输入所属系统"
                            v-decorator="[
                                'systemCode',
                                {
                                    rules: [
                                        {
                                        required: true,
                                        message: '所属系统!',
                                        },
                                    ],
                                },
                            ]"
                            maxLength="45"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="设备类型">
                            <a-input 
                            placeholder="请输入设备类型"
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
                            maxLength="20"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
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
                        <a-form-item label="所属单位">
                            <a-input 
                            placeholder="请输入所属单位"
                            v-decorator="[
                                'orgName',
                                {
                                    rules: [
                                        {
                                        required: true,
                                        message: '所属单位!',
                                        },
                                    ],
                                },
                            ]"
                            maxLength="50"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="安装时间">
                            <a-input 
                            placeholder="请输入安装时间"
                            v-decorator="[
                                'manufactureDate',
                                {
                                    rules: [
                                        {
                                        required: true,
                                        message: '安装时间!',
                                        },
                                    ],
                                },
                            ]"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="到期时间">
                            <a-input 
                            placeholder="请输入到期时间"
                            v-decorator="[
                                'expirationDate',
                                {
                                    rules: [
                                        {
                                        required: true,
                                        message: '到期时间!',
                                        },
                                    ],
                                },
                            ]"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="通信状态">
                            <a-switch 
                            placeholder="请输入通信状态"
                            v-decorator="[
                                'commStatus',
                                {
                                    rules: [
                                        {
                                        required: true,
                                        message: '通信状态!',
                                        },
                                    ],
                                },
                            ]"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="设备状态">
                            <a-input 
                            placeholder="请输入设备状态"
                            v-decorator="[
                                'f',
                                {
                                    rules: [
                                        {
                                        required: true,
                                        message: '设备状态!',
                                        },
                                    ],
                                },
                            ]"
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
import { insert,findOrgByType,update } from '@/api/company/companyassociation'
export default {
    data() {
        return {
            visible: false,
            title: '',
            form: this.$form.createForm(this),
            formEdit: false,
        };
    },
    watch: {
    },
    created(){
        
    },
    methods: {
        handleSubmit(e){
            e.preventDefault();
            this.form.validateFields((error, values) => {
                if(!error){
                    console.log(values)
                }
            });
        },
        showDrawer(record, handle) {
            console.log('rowLight',record)
            this.$store.dispatch("setRowLight", record.id)
            this.visible = true;
            this.$nextTick(()=>{
                this.formEdit = true
                this.title = '设备详情'
                this.form.setFieldsValue({
                    'commStatus':record.commStatus,
                    'deviceId':record.deviceId,
                    'deviceModel':record.model,
                    'deviceName':record.deviceName,
                    'deviceType':record.type,
                    'expirationDate':record.expirationDate,
                    'manufactureDate':record.manufactureDate,
                    'orgName':record.orgName,
                    'systemCode':record.system,
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