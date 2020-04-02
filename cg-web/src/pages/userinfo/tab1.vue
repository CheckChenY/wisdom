<template>
    <a-form :form="form1" @submit="handleSubmit" class="changepass_index">
        <a-form-item
            style="display:flex;"
            label="用户编号"
        >
            <a-input v-decorator="['id']" :disabled="true" />
        </a-form-item>
        <a-form-item
            style="display:flex;"
            label="用户名"
        >
            <a-input
            v-decorator="[
                'realName',
                {
                    rules: [{ required: true, message: '请输入用户名!', whitespace: true }],
                },
            ]"
            maxLength="6"
            placeholder="用户名"
            >
            </a-input>
        </a-form-item>
        <a-form-item
            style="display:flex;"
            label="账号"
        >
            <a-input v-decorator="['phone']" :disabled="true" />
        </a-form-item>
        <a-form-item
            style="display:flex;"
            label="头像"
        >
            <a-upload
                accept=".jpg,.png,.jpeg"
                name="avatar"
                ref="upload"
                listType="picture-card"
                class="avatar-uploader"
                :showUploadList="false"
                action
                :beforeUpload="beforeUpload"
                >
                <img v-if="data.avatar" :src="data.avatar" alt="avatar" style="width:200px;height:200px;"/>
                <div v-else style="padding-top:25px;">
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">Upload</div>
                </div>
            </a-upload>
            <div style="margin-top:20px;">
                <p style="color:#ccc;font-size:14px;text-align:left;">格式要求：</p>
                <p style="color:#ccc;font-size:14px;text-align:left;">1.要求JPG、JPEG或PNG格式。</p>
                <p style="color:#ccc;font-size:14px;text-align:left;">3.大小不超过2M</p>
            </div>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit" :disabled="disabled">提交</a-button>
        </a-form-item>
    </a-form>
</template>
<script>
import { addFile,myUser } from "@/api/public"
import { save } from "@/api/user"
export default {
    name: "register",
    components: {
    },
    data () {
        return {
            data: {
                avatar: ''
            },
            disabled: false,
            loading: false,
        };
    },
    watch: {
    },
    created () { 
        this.getData()
    },
    beforeCreate() {
        this.form1 = this.$form.createForm(this, { name: 'register' });
    },
    methods: {
        handleSubmit(e){
            e.preventDefault();
            this.form1.validateFields((err, values) => {
                console.log(!err)
                if (!err) {
                    values.avatar = this.data.avatar
                    this.disabled = true
                    save(values).then(res=>{
                        this.disabled = false
                        if(res && res.data && res.data.success){
                            this.getData()
                            this.$message.success('修改成功')
                        }else{
                            this.$message.error(res.data.errorMsg)
                        }
                    })
                }
            });
        },
        beforeUpload(file) {
            var formData = new FormData();
            if (file.size > 1024 * 1024 * 2) {
                this.$message.error('上传文件大小不能超过2M!');
                return false
            }
            formData.append('file',file)
            addFile(formData).then(res=>{
                if(res && res.data && res.data.success){
                    this.$message.success('上传成功')
                    this.data.avatar=this.$imgUrl+res.data.value.fileName
                }else{
                    this.data.avatar=''
                }
            })
        },
        getData () {
            myUser().then(res=>{
                if(res && res.data && res.data.success){
                    this.data.avatar = res.data.value.avatar?this.$imgUrl + res.data.value.avatar:null
                    this.form1.setFieldsValue(res.data.value);
                }
            })
        }
    }
}
</script>
<style lang="scss">
.changepass_index{
    display: flex;
    flex-direction: column;
    align-items: center;
    .ant-form-item-label{
        width:220px!important;
    }
    .ant-input{
        width:250px;
    }
    .code_input{
        width:250px;
        input{
            width: inherit;
        }
    }
}
</style>
