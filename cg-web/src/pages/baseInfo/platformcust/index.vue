<template>
    <a-form :form="form1" @submit="handleSubmit" class="register_index">
        <div style="height:40px;line-height:40px;font-size:20px;
            color:#000;font-weight:900;display:flex;margin-top:20px;
            padding-left:50px;">平台自定义设置</div>
        <div style="width:1200px;margin:0 auto;">
            <div style="display: flex;justify-content: space-between;padding-right:150px;">
                <a-form-item
                    style="display:flex;"
                    label="平台名称"
                >
                    <a-input
                        v-model="data.platformNames"
                        maxLength="50"
                    />
                </a-form-item>
            </div>
            <div style="display: flex;justify-content: space-between;padding-right:150px;">
                <a-form-item
                    style="display:flex;"
                    label="服务器地址"
                >
                    <a-input
                        v-model="data.fastdfsPath"
                        maxLength="150"
                    />
                </a-form-item>
            </div>
            <div style="display: flex;justify-content: space-between;padding-right:150px;">
                <a-form-item
                    style="display:flex;"
                    label="平台logo"
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
                        <img v-if="data.plantformLog" :src="data.plantformLog" alt="avatar" style="width:200px;height:200px;"/>
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
            </div>
            <div style="display: flex;justify-content: space-between;padding-right:150px;">
                <a-form-item
                    style="display:flex;"
                    label="登录页背景图"
                >
                    <a-upload
                        accept=".jpg,.png,.jpeg"
                        name="avatar"
                        ref="upload"
                        listType="picture-card"
                        class="avatar-uploader"
                        :showUploadList="false"
                        action
                        :beforeUpload="beforeUploadBG"
                        >
                        <img v-if="data.backgroundImg" :src="data.backgroundImg" alt="avatar" style="width:200px;height:200px;"/>
                        <div v-else style="padding-top:25px;">
                            <a-icon :type="loading ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">Upload</div>
                        </div>
                    </a-upload>
                    <div style="margin-top:20px;">
                        <p style="color:#ccc;font-size:14px;text-align:left;">格式要求：</p>
                        <p style="color:#ccc;font-size:14px;text-align:left;">1.要求JPG、JPEG或PNG格式。</p>
                        <p style="color:#ccc;font-size:14px;text-align:left;">2.最佳分辨率为1920*1080</p>
                        <p style="color:#ccc;font-size:14px;text-align:left;">3.图标不大于2M</p>
                    </div>
                </a-form-item>
            </div>
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
import { findByOrgId, update } from "@/api/platform/platform"
export default {
    name: "register",
    data () {
        return {
            data:{},
            loading: false,
            mapvisible:false,
        };
    },
    created () { 
        this.findByOrgId()
    },
    beforeCreate() {
        this.form1 = this.$form.createForm(this, { name: 'register' });
    },
    methods: {
        findByOrgId(){
            findByOrgId({orgId:'1000000000000001'}).then(res=>{
                console.log( res.data.value)
                if(res && res.data && res.data.success){
                    this.data = res.data.value
                    this.data.plantformLog = res.data.value.plantformLog?this.$imgUrl + res.data.value.plantformLog:null
                    this.data.backgroundImg = res.data.value.backgroundImg?this.$imgUrl + res.data.value.backgroundImg:null
                }
            })
        },
        handleSubmit(e){
            e.preventDefault();
            this.form1.validateFields((err, values) => {
                console.log(!err)
                if (!err) {
                    update(this.data).then(res=>{
                        console.log(res.data)
                        if(res && res.data && res.data.success){
                            this.findByOrgId()
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
                    this.data.plantformLog=this.$imgUrl+res.data.value.fileName
                }else{
                    this.data.plantformLog=''
                }
            })
        },
        beforeUploadBG(file) {
            var formData = new FormData();
            if (file.size > 1024 * 1024 * 2) {
                this.$message.error('上传文件大小不能超过2M!');
                return false
            }
            formData.append('file',file)
            addFile(formData).then(res=>{
                if(res && res.data && res.data.success){
                    this.$message.success('上传成功')
                    this.data.backgroundImg=this.$imgUrl+res.data.value.fileName
                }else{
                    this.data.backgroundImg=''
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
