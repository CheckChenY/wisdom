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
                        <a-form-item label="版本号">
                            <a-input
                                v-decorator="[
                                    'value',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '请输入版本号!',
                                            },
                                        ],
                                    },
                                ]"
                                maxLength="100"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="更新内容">
                            <a-input
                                v-decorator="[
                                    'label',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '请输入更新内容!',
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
                        <a-form-item label="软件上传">
                            <!-- :showUploadList="false" -->
                            <a-upload
                                name="avatar"
                                ref="upload"
                                action
                                :beforeUpload="beforeUpload"
                                :fileList="fileList"
                                @change="handleChange"
                                >
                                <a-button> <a-icon :type="loading ? 'loading' : 'plus'" />选择文件</a-button>
                            </a-upload>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="更新说明">
                            <a-input
                                v-decorator="[
                                    'parentId',
                                    {
                                        rules: [
                                            {
                                            required: false,
                                            message: '请输入更新说明!',
                                            },
                                        ],
                                    },
                                ]"
                                type="textarea"
                                maxLength="1000"
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
                    <a-button :style="{marginRight: '8px'}" html-type="submit" type="primary">提 交</a-button>
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
import { addFile } from "@/api/public"
export default {
    data() {
        return {
            visible: false,
            title: '添加',
            form: this.$form.createForm(this),
            handle:'',
            id:'',
            fileName: '',
            loading: false,
            fileList: [],
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
            this.title = '添加'
            this.form.resetFields();
            
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
            })
        },
        beforeUpload(file) {
            var formData = new FormData();
            if (file.size > 1024 * 1024 * 100) {
                this.$message.error('上传文件大小不能超过100M!');
                return false
            }
            formData.append('file',file)
            addFile(formData).then(res=>{
                if(res && res.data && res.data.success){
                    this.$message.success('上传成功')
                    this.fileName=this.$imgUrl+res.data.value.fileName
                }else{
                    this.fileName=''
                }
            })
        },
        handleChange(info) {
            let fileList = [...info.fileList];
            fileList = fileList.slice(-1);
            fileList = fileList.map(file => {
                if (file.response) {
                    file.url = file.response.url;
                }
                return file;
            });
            this.fileList = fileList;
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