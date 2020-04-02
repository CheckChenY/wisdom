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
            <a-form :form="form" layout="vertical" hideRequiredMark>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="上传时间">
                            <a-input
                                :disabled="true"
                                v-model="formData.createTime"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="上传人员">
                            <a-input
                                :disabled="true"
                                v-model="formData.uploadName"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="隐患来源">
                            <a-input
                                :disabled="true"
                                v-model="formData.source"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="所在建筑">
                            <a-input
                                :disabled="true"
                                v-model="formData.buildingName"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="楼层/区域">
                            <a-input
                                :disabled="true"
                                v-model="formData.floorName"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="具体位置">
                            <a-input
                                :disabled="true"
                                v-model="formData.position"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="隐患现场图">
                            <img :src="formData.scenePhoto" style="height:100px;">
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" style="height:165px;">
                        <a-form-item label="隐患描述">
                            <a-textarea :disabled="true" v-model="formData.hiddenDesc" placeholder="隐患描述" :rows="4" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" style="position:relative;">
                        <span style="position: absolute;left:-3px;top:3px;color: red;">*</span>
                        <a-form-item label="审核确认">
                            <a-radio-group 
                            v-model="auditStatus"
                            :options="plainOptions" 
                            @change="onChange"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" style="height: 82px;"></a-col>
                    <a-col :span="12" v-if="resShow" style="position:relative;">
                        <span style="position: absolute;left:-3px;top:3px;color: red;">*</span>
                        <a-form-item label="处理结果图">
                            <a-upload
                                listType="picture-card"
                                class="avatar-uploader"
                                :showUploadList="false"
                                :beforeUpload="beforeUpload"
                              >
                                <img style="height:94px;" v-if="handPhoto" :src="handPhoto" alt="avatar" />
                                <div v-else>
                                  <a-icon style="margin-top:30px;" type="plus" />
                                  <div style="padding-bottom:30px;" class="ant-upload-text">Upload</div>
                                </div>
                            </a-upload>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" style="padding-bottom:5px;position:relative;" v-if="resShow">
                        <span style="position: absolute;left:-3px;top:3px;color: red;">*</span>
                        <a-form-item label="处理描述">
                            <a-textarea v-model="handDesc" placeholder="处理描述" :rows="4" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
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
                <a-button type="text" :style="{marginRight: '8px'}" @click="onClose">
                    取 消
                </a-button>
                <a-button type="primary" :style="{marginRight: '8px'}" @click="onSubmit">
                    提 交
                </a-button>
            </div>
        </a-drawer>
    </div>
</template>
<script>
import { update } from '@/api/patrol/hidden'
import { addFile } from "@/api/public"

export default {
    data() {
        return {
            visible: false,
            title: '',
            form: this.$form.createForm(this),
            formEdit: false,
            formData:{},
            plainOptions:[{
                label:'通过',
                value:'1'
            },{
                label:'未通过',
                value:'0'
            }],
            imageUrl:'',
            auditStatus:'',
            handPhoto:'',
            handDesc:'',
            resShow:false
        };
    },
    watch: {
        auditStatus(){
            console.log(this.auditStatus)
            if(this.auditStatus == 1){
                this.resShow=true
            }else{
                this.resShow=false
            }
        }
    },
    methods: {
        beforeUpload(file){
            var formData = new FormData();
            if (file.size > 1024 * 1024 * 2) {
                this.$message.error('上传文件大小不能超过2M!');
                return false
            }
            formData.append('file',file)
            addFile(formData).then(res=>{
                if(res && res.data && res.data.success){
                    this.$message.success('上传成功')
                    this.handPhoto=this.$imgUrl+res.data.value.fileName
                }else{
                    this.handPhoto=''
                }
            })
        },
        onChange(e){
            this.auditStatus=e.target.value
            console.log(e.target.value)
        },
        showDrawer(record, handle) {
            this.$store.dispatch("setRowLight", record.id)
            this.visible = true;
            this.formEdit = false
            this.title = '隐患详情'
            this.formData=record
            this.auditStatus = null
            this.handPhoto = null
            this.handDesc = null
            
        },
        onClose() {
            this.visible = false;
            this.$store.dispatch("setRowLight", '')
        },
        onSubmit() {
            if(this.auditStatus==null){
                this.$message.error('请选择处理结果')
                return
            }
            if(this.auditStatus == '1'){
                if(!this.handPhoto){
                    this.$message.error('请选择处理结果图')
                    return
                }
                if(!this.handDesc){
                    this.$message.error('请输入处理描述')
                    return
                }
            }
            let obj = {
                auditStatus: this.auditStatus,
                handPhoto: this.handPhoto,
                handDesc: this.handDesc,
                id: this.formData.id
            }
            update(obj).then(res => {
                if (res && res.data && res.data.success) {
                    this.$message.success('处理成功')
                    this.$emit('dialogColse')
                    this.visible = false;
                } else {
                    this.$message.error(res.data.errorMsg)
                }
            })
        },
    },
};
</script>