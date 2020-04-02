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
            <a-form :form="form" layout="vertical" @submit="onSubmit" hideRequiredMark>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="数据值">
                            <a-input
                                :disabled="formEdit"
                                v-decorator="[
                                    'value',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '请输入数据值!',
                                            },
                                        ],
                                    },
                                ]"
                                maxLength="100"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="标签名">
                            <a-input
                                :disabled="formEdit"
                                v-decorator="[
                                    'label',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '请输入标签名!',
                                            },
                                        ],
                                    },
                                ]"
                                maxLength="100"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="父级">
                            <a-input
                                :disabled="formEdit"
                                v-decorator="[
                                    'parentId',
                                    {
                                        rules: [
                                            {
                                            required: false,
                                            message: '请输入父级!',
                                            },
                                        ],
                                    },
                                ]"
                                maxLength="7"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="级别">
                            <a-input
                                :disabled="formEdit"
                                v-decorator="[
                                    'level',
                                    {
                                        rules: [
                                            {
                                            required: false,
                                            message: '请输入级别!',
                                            },
                                        ],
                                    },
                                ]"
                                maxLength="3"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="字典类型">
                            <a-input
                                :disabled="formEdit"
                                v-decorator="[
                                    'type',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '请选择字典类型!',
                                            },
                                        ],
                                    },
                                ]"
                                maxLength="100"
                            />
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
import { dictUpdate,dictInsert, } from '@/api/dict'
export default {
    data() {
        return {
            visible: false,
            title: '添加',
            form: this.$form.createForm(this),
            formEdit: false,
            handle:'',
            id:''
        };
    },
    watch: {
    },
    methods: {
        showDrawer(record, handle) {
            console.log(record)
            this.handle=handle
            this.$store.dispatch("setRowLight",record.id)
            this.visible = true;
            if (handle === 'add') {
                this.formEdit = false
                this.title = '添加'
                this.form.resetFields();
            } else if (handle === 'view') {
                this.formEdit = true
                this.title = '查看'
                console.log(record)
                this.$nextTick(()=>{
                    this.form.setFieldsValue({
                        'value':record.value,
                        'label':record.label,
                        'parentId':record.parentId,
                        'level':record.level,
                        'type':record.type,
                    });
                })
            } else if (handle === 'edit') {
                this.formEdit = false
                this.title = '编辑'
                this.id=record.id
                this.$nextTick(()=>{
                    this.form.setFieldsValue({
                        'value':record.value,
                        'label':record.label,
                        'parentId':record.parentId,
                        'level':record.level,
                        'type':record.type,
                    });
                })
            }
            
        },
        onClose() {
            this.visible = false;
            this.$store.dispatch("setRowLight",'')
        },
        onSubmit(e){
            e.preventDefault();
            this.form.validateFields((error, values) => {
                if(!error){
                    console.log(values)
                    if(this.handle=='add'){
                        dictInsert(values).then(res=>{
                            if(res && res.data && res.data.success){
                                this.$message.success('添加成功')
                                this.visible = false;
                                this.$emit('result','')
                            }else{
                                this.$message.error(res.data.errorMsg)
                            }
                        })
                    }
                    if(this.handle=='edit'){
                        values.id=this.id
                        dictUpdate(values).then(res=>{
                            if(res && res.data && res.data.success){
                                this.$message.success('修改成功')
                                this.visible = false;
                                this.$emit('result','')
                            }else{
                                this.$message.error(res.data.errorMsg)
                            }
                        })
                    }
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