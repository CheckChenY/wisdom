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
                        <a-form-item label="巡查卡编号">
                            <a-input 
                            v-decorator="[
                                'cardCode',
                                {
                                    rules: [
                                        {
                                        required: true,
                                        message: '巡查卡编号!',
                                        },
                                    ],
                                },
                            ]"
                            maxLength="45"
                            :disabled="formEdit">
                            </a-input>
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
    import { saveCardLibrary,findOrgByType } from "@/api/devicemanage/patrollib"
import { debuglog } from 'util';
    export default {
        data() {
            return {
                visible: false,
                title: '添加',
                form: this.$form.createForm(this),
                formEdit: false,
                record: {}
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
                        if (this.record) {
                            values.id = this.record.id
                        }
                        saveCardLibrary(values).then(res=>{
                            if(res && res.data && res.data.success){
                                this.visible = false
                                this.$emit('refresh','')
                                this.$message.success('成功')
                            }else{
                                this.$message.error(res.data.errorMsg)
                            }
                        })
                    }
                });
            },
            showDrawer(record, handle) {
                this.record=record
                this.$store.dispatch("setRowLight", record.id)
                this.visible = true;
                this.$nextTick(()=>{
                    if (handle === 'add') {
                        this.formEdit = false
                        this.title = '添加'
                        this.form.resetFields();
                    }else if (handle === 'edit') {
                        this.formEdit = false
                        this.title = '编辑'
                        this.form.setFieldsValue(record);
                    }
                })
            },
            onClose() {
                this.$store.dispatch("setRowLight", '')
                this.visible = false;
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