<template>
    <a-form :form="form1" @submit="handleSubmit" class="register_index">
        <div style="height:40px;line-height:40px;font-size:20px;
            color:#000;font-weight:900;display:flex;
            margin-top:20px;padding-left:50px;">其他信息</div>
        <div style="width:1200px;margin:0 auto;">
            <a-form-item
                style="display:flex;"
                label="单位logo"
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
                    <img v-if="data.logo" :src="data.logo" alt="avatar" style="width:200px;height:200px;"/>
                    <div v-else style="padding-top:25px;">
                        <a-icon :type="loading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
                <div style="margin-top:20px;">
                    <p style="color:#ccc;font-size:14px;text-align:left;">格式要求：</p>
                    <p style="color:#ccc;font-size:14px;text-align:left;">1.要求JPG、JPEG或PNG格式。</p>
                    <p style="color:#ccc;font-size:14px;text-align:left;">2.最佳分辨率为300*600</p>
                    <p style="color:#ccc;font-size:14px;text-align:left;">3.图标不大于2M</p>
                </div>
            </a-form-item>
            <div style="width:400px;margin:0 auto;margin-top:40px;display: flex;justify-content: space-between;">
                <a-form-item>
                    <a-button type="primary" html-type="submit">修 改</a-button>
                </a-form-item>
            </div>
        </div>
    </a-form>
</template>
<script>
import { addFile } from "@/api/public"
import { findById, logoUpdate } from "@/api/platform/platform"
import { mapGetters } from "vuex";
export default {
    name: "register",
    data () {
        return {
            data: {},
            loading: false,
        };
    },
    watch: {
    },
    created () { 
        this.findById()
    },
    mounted () {},
    computed: {
        ...mapGetters([
            "orgInfo",
        ]),
    },
    props: [],
    beforeCreate() {
        this.form1 = this.$form.createForm(this, { name: 'register' });
    },
    destoryed(){
    },
    methods: {
        findById(){
            findById({orgId:this.orgInfo.id}).then(res=>{
                console.log( res.data.value)
                if(res && res.data && res.data.success){
                    this.data = res.data.value
                    this.data.logo = res.data.value.logo?this.$imgUrl + res.data.value.logo:null
                }
            })
        },
        orgTypeSelectChange(a){
            console.log(a)
        },
        handleSubmit(e){
            e.preventDefault();
            this.form1.validateFields((err, values) => {
                if (!err) {
                    if(!this.data.logo){
                        this.$message.error('请上传单位logo');
                        return
                    }
                    logoUpdate(this.data).then(res=>{
                        console.log(res.data)
                        if(res && res.data && res.data.success){
                            this.findById()
                            this.$message.success('修改成功')
                        }else{
                            this.$message.success(res.data.errorMsg)
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
                    this.data.logo=this.$imgUrl+res.data.value.fileName
                }else{
                    this.data.logo=''
                }
            })
        }
    }
}
</script>
<style lang="scss">
.register_index{
    .ant-steps-item{
        width:400px;
        flex: none;
    }
    .ant-form-item-label{
        width:220px;
    }
    .ant-input,
    .ant-select-selection{
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
