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
                        <a-form-item label="所属系统">
                                <a-select 
                                @select="systemChange"
                                showSearch
                                optionFilterProp="children"
                                placeholder="请选择"
                                v-decorator="[
                                    'systemId',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '所属系统!',
                                            },
                                        ],
                                    },
                                ]"
                                :disabled="formEdit">
                                    <a-select-option v-for="(item,index) in systemList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="设备类型">
                                <a-select 
                                @select="typeChange"
                                placeholder="请选择"
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
                                :disabled="formEdit">
                                    <a-select-option v-for="(item,index) in deviceTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="设备型号">
                            <a-select 
                            placeholder="请选择"
                            showSearch
                            optionFilterProp="children"
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
                            :disabled="formEdit">
                                <a-select-option v-for="(item,index) in deviceModelList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="上传文件">
                            <a-upload :openFileDialogOnClick="faileDialog" accept=".bin" :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
                                <a-button @click="openClick"> <a-icon type="upload" /> 选择文件 </a-button>
                            </a-upload>
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
// import { addFile } from "@/api/public"
import { uploadDeviceFile,addFile } from '@/api/devicemanage/deviceupgrade'
import { getDeviceFindList } from '@/api/public'
export default {
    props:['systemList',],
    data() {
        return {
            visible: false,
            title: '',
            form: this.$form.createForm(this),
            formEdit: false,
            fileList:[],
            faileDialog:false,
            deviceModelList:[],
            deviceTypeList:[],
            filePath:'',
            fileName:'',
            fileSize:''
        };
    },
    watch: {
    },
    created(){
        
    },
    methods: {
        systemChange (value) {
            this.form.setFieldsValue({
                deviceType:'',
                deviceModel:''
            })
            getDeviceFindList({type:2,id:value}).then(res=>{
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
            this.form.setFieldsValue({
                deviceModel:''
            })
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
        openClick(){
            console.log(this.fileList)
            if(!this.fileList.length){
                this.faileDialog=true
            }else{
                this.$message.error('仅能上传一个文件')
                this.faileDialog=false
            }
        },
        beforeUpload(file) {
            // console.log(this.fileList)
            var that=this
            var formData = new FormData();
            if (file.size > 1024 * 1024 * 2) {
                this.$message.error('上传文件大小不能超过2M!');
                return false
            }
            formData.append('file',file)
            addFile(formData).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    that.fileList = [...that.fileList, file];
                    this.$message.success('上传成功')
                    this.fileSize=res.data.value.fileSize
                    this.filePath=res.data.value.fileName
                    this.fileName=res.data.value.fileName.replace('/upload/','')
                }else{
                    // this.fileName=''
                }
            })
            return false;
        },
        handleRemove(file) {
            const index = this.fileList.indexOf(file);
            const newFileList = this.fileList.slice();
            newFileList.splice(index, 1);
            this.fileList = newFileList;
        },
        handleSubmit(e){
            e.preventDefault();
            this.form.validateFields((error, values) => {
                if(!error){
                    if(!this.fileName){
                        this.$message.error('请上传文件')
                    }else{
                        values.fileName=this.fileName
                        values.fileSize=this.fileSize
                        values.filePath=this.filePath
                        console.log(values)
                        uploadDeviceFile(values).then(res=>{
                            console.log(res)
                            if(res && res.data && res.data.success){
                                this.visible = false;
                                this.$message.success('上传成功')
                            }else{
                                this.$message.error('上传失败')
                            }
                        })
                    }
                }
            });
        },
        showDrawer(record, handle) {
            console.log(record)
            this.visible = true;
            this.formEdit = false
            this.title = '升级文件'
            this.form.resetFields();
            this.filePath=''
            this.fileName=''
            this.fileSize=''
            this.fileList=[]
        },
        onClose() {
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