<template>
    <div style="display:flex">
        <div style="width:50%;">
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">上报时间：</span>
                    <span>{{warndata.createTime}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">设备ID/标识码：</span>
                    <span>{{warndata.deviceId}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">设备名称：</span>
                    <span>{{warndata.deviceName}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">所属系统：</span>
                    <span>{{warndata.system}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">设备类型：</span>
                    <span>{{warndata.deviceType}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">设备型号：</span>
                    <span>{{warndata.deviceModel}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">所在建筑：</span>
                    <span>{{warndata.building}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">楼层/区域：</span>
                    <span>{{warndata.floor}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">安装位置：</span>
                    <span>{{warndata.location}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">设备状态：</span>
                    <span>{{warndata.alarmType}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">报警类型：</span>
                    <span>{{warndata.alarmDetails}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label">警情程度：</span>
                    <span>{{warndata.alarmLevel}}</span>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24" style="display: flex;align-items: flex-start;">
                    <span class="label">现场视频截图：</span>
                    <img :src="warndata.alarmPhoto" style="height:100px;"/>
                </a-col>
            </a-row>
        </div>
        <div style="width:50%;">
            <a-row :gutter="12" style="position: relative;">
                <span style="position: absolute;left:45px;top:8px;color: red;">*</span>
                <a-col :span="24" style="margin-bottom:10px;">
                    <span class="label">警情处理：</span>
                    <a-select v-model="warnConfirmType" style="width: 300px" 
                        showSearch
                        optionFilterProp="children" 
                        placeholder="请选择">
                        <a-select-option v-for="item in warnConfirmList" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
                    </a-select>
                </a-col>
            </a-row>
            <a-row :gutter="12" style="position: relative;">
                <span style="position: absolute;left:45px;top:3px;color: red;">*</span>
                <a-col :span="24" style="display: flex;align-items:flex-start;margin-bottom:15px;">
                    <span class="label">处理描述：</span>
                    <a-textarea
                        v-model="warnConfirmDes"
                        style="width:300px;"
                        placeholder="请输入"
                        :autosize="{ minRows: 3, maxRows: 6 }"
                    />
                </a-col>
            </a-row>
            <a-row :gutter="12" style="position: relative;">
                <span style="position: absolute;left:32px;top:3px;color: red;">*</span>
                <a-col :span="24" style="display: flex;align-items:flex-start;margin-bottom:10px;">
                    <span class="label">处理结果图：</span>
                    <a-upload
                        accept=".jpg,.png,.jpeg"
                        name="avatar"
                        listType="picture-card"
                        class="avatar-uploader"
                        :showUploadList="false"
                        :beforeUpload="beforeUpload"
                        >
                        <img v-if="imgUrl" style="max-width:150px;max-height:150px;" :src="imgUrl" alt="avatar" />
                        <div v-else>
                            <a-icon type="plus" style="margin-top:30px;cursor:pointer;"/>
                            <div class="ant-upload-text" style="padding-bottom:26px;cursor:pointer;">Upload</div>
                        </div>
                    </a-upload>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="24">
                    <span class="label"></span>
                    <span>格式要求：</span>
                </a-col>
                <a-col :span="24">
                    <span class="label"></span>
                    <span>1.要求现场拍摄处理结果图片。</span>
                </a-col>
                <a-col :span="24">
                    <span class="label"></span>
                    <span>2. 要求JPG、JPEG或PNG格式。</span>
                </a-col>
            </a-row>
        </div>
        <div style="position: fixed;bottom: 40px;right: 60px;">
            <a-button type="primary" @click="handleSubmit" :loading="loading">
                提 交
            </a-button>
        </div>
    </div>
</template>
<script>
import { addFile } from '@/api/public'
import { findDetailById, insert } from '@/api/warncenter/warnpublic'
import { dict } from '@/const/dict'
export default {
    props:['warnnum','visible','record',],
    watch:{
        warnnum(){
            if(this.warnnum==1){
                this.getData()
            }
        },
        visible(){
            if(this.visible){
                this.imgUrl=''
                this.warnConfirmType=''
                this.warnConfirmDes=''
                this.getData()
            }
        },
        // imgUrl(){
        //     this.$emit('url',this.imgUrl)
        // },
        // warnConfirmType(){
        //     this.$emit('type',this.warnConfirmType)
        // },
        // warnConfirmDes(warnConfirmDes){
        //     this.$emit('desc',warnConfirmDes)
        // }
    },
    mounted(){
        this.getData()
    },
    data(){
        return{
            imageUrl:'',
            warnConfirmList:[{
                label:'真实火警',
                value:'1'
            },{
                label:'异常',
                value:'2'
            },{
                label:'误报',
                value:'3'
            },{
                label:'测试',
                value:'4'
            },],
            warndata:{},
            imgUrl:'',
            warnConfirmType:'',
            warnConfirmDes:'',
            warnTypeList:{
                '0':'测试',
                '1':'报警',
                '2':'故障',
                '3':'报警&故障',
                '4':'离线',
            },
            loading: false
        }
    },
    methods:{
        getData(){
            findDetailById({param:this.record.id}).then(res=>{
                if(res && res.data && res.data.success){
                    let data = res.data.value
                    if(data.alarmDetails && data.alarmDetails.length){
                        data.alarmDetails=data.alarmDetails.join('')
                    }
                    let warnType = dict.USESTATE.filter(item => item.value == data.alarmType)
                    if (warnType.length > 0) {
                        data.alarmType = warnType[0].label
                    }
                    let warnLevel = dict.ALARMLEVEL.filter(item => item.value == data.alarmLevel)
                    if (warnLevel.length > 0) {
                        data.alarmLevel = warnLevel[0].label
                    }
                    this.warndata=data
                }
            })
        },
        beforeUpload(file){
            var formData = new FormData();
            if (file.size > 1024 * 1024 * 2) {
                this.$message.error('上传文件大小不能超过2M!');
                return false
            }
            formData.append('file',file)
            this.imgUrl=''
            addFile(formData).then(res=>{
                if(res && res.data && res.data.success){
                    this.$message.success('上传成功')
                    this.imgUrl=this.$imgUrl+res.data.value.fileName
                    // this.$emit('warnDealResultPhoto',this.imgUrl)
                }else{
                    this.$message.error('上传失败')
                }
            })
        },
        handleChange(val){
            
        },
        descChange(e){
            
        },
        handleSubmit () {
            if(!this.warnConfirmType){
                this.$message.error('请选择警情处理类型')
                return
            }
            if(!this.warnConfirmDes){
                this.$message.error('请输入处理描述')
                return
            }
            if(!this.imgUrl){
                this.$message.error('请上传处理结果图')
                return
            }
            this.loading = true
            insert({
                recordId:this.record.id,
                warnConfirmType:this.warnConfirmType,
                warnDealDes:this.warnConfirmDes,
                warnDealResultPhoto:this.imgUrl,
            }).then(res=>{
                this.loading = false
                if(res && res.data && res.data.success){
                    this.$message.success('处理成功')
                    this.$emit('handleOk')
                }else{
                    this.$message.error(res.data.errorMsg)
                }
            })
        }
    }
}
</script>
<style>
.label{
    display: inline-block;
    width:120px;
    text-align: right;
    margin-bottom:10px;
}
</style>