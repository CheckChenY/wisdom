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
                        <a-form-item label="设备验证码">
                                <a-input 
                                placeholder="请输入设备验证码"
                                v-decorator="[
                                    'deviceCaptch',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '设备验证码!',
                                            },
                                        ],
                                    },
                                ]"
                                maxLength="45"
                                :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="应用名">
                            <a-input 
                            placeholder="请输入应用名"
                            maxLength="45"
                            v-decorator="['deviceCusername']"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="应用密码">
                            <a-input 
                            placeholder="请输入应用密码"
                            v-decorator="['deviceCpassword']"
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
                    <a-col :span="12">
                        <a-form-item label="设备类型">
                            <a-select 
                                :disabled="formEdit"
                                @select="typeChange"
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
                                ]">
                                <a-select-option v-for="(item,index) in deviceTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="设备型号">
                            <a-select 
                                :disabled="formEdit"
                                showSearch
                                optionFilterProp="children"
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
                                ]">
                                <a-select-option v-for="(item,index) in deviceModelList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="所在建筑">
                            <a-select 
                            @select="buildingChange"
                            :disabled="formEdit"
                            showSearch
                            optionFilterProp="children"
                            v-decorator="[
                                'buildingId',
                                {
                                    rules: [
                                        {
                                        required: true,
                                        message: '所在建筑!',
                                        },
                                    ],
                                },
                            ]">
                                <a-select-option v-for="(item,index) in buildingList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="楼层/区域">
                            <a-select 
                            @select="floorChange"
                            :disabled="formEdit"
                            showSearch
                            optionFilterProp="children"
                            v-decorator="[
                                'floorId',
                                {
                                    rules: [
                                        {
                                        required: true,
                                        message: '楼层/区域!',
                                        },
                                    ],
                                },
                            ]">
                                <a-select-option v-for="(item,index) in floorList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="安装位置">
                                <a-input 
                                placeholder="请输入安装位置"
                                v-decorator="[
                                    'location',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '安装位置!',
                                            },
                                        ],
                                    },
                                ]"
                                maxLength="45"
                                :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" @click="alertDialog">
                        <a-form-item label="点位标注">
                                <a-input 
                                placeholder="请输入点位标注"
                                v-decorator="[
                                    'pointSign',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '点位标注!',
                                            },
                                        ],
                                    },
                                ]"
                                :disabled="true"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="15">
                        <a-form-item label="设备现场图">
                            <a-upload
                                name="avatar"
                                listType="picture-card"
                                class="avatar-uploader"
                                :showUploadList="false"
                                :beforeUpload="beforeUpload"
                              >
                                <img v-if="surroundingPhoto" style="width:100px;height:100px;" :src="surroundingPhoto" alt="avatar" />
                                <div v-else>
                                  <a-icon type="plus" />
                                  <div class="ant-upload-text">Upload</div>
                                </div>
                            </a-upload>
                        </a-form-item>
                    </a-col>
                    <a-col :span="15">
                        <a-form-item label="摄像头功能">
                            <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
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
        <a-modal
            :title="pointTitle"
            :visible="dialogPointVisible"
            width="800px"
            @ok="dialogPointVisible = false"
            @cancel="dialogPointVisible = false">
            <device-position
                v-if="dialogPointVisible"
                domTop="179"
                domWidth='800'
                :offsetY="offsetY"
                :offsetX="offsetX"
                :planFloor="planFloor"
                :pointSign="pointSign"
                :pointClick="pointClick"
                @getPoinValue="getPoinValue"
            ></device-position>
        </a-modal>
    </div>
</template>
<script>
import { findList, } from '@/api/building'
import { findByBuildCode, } from '@/api/floor'
import { addFile,insert,updateCamera } from '@/api/devicemanage/devicemanage/caremalib'
import { findDicIdByDesc } from '@/api/devicemanage/devicelib/cameralib'
import DevicePosition from "@/components/public/device-position";
import { getDeviceFindList } from '@/api/public'
export default {
    data() {
        return {
            visible: false,
            title: '',
            form: this.$form.createForm(this),
            formEdit: false,
            checkedList:[],
            plainOptions:['实时视频','报警截图','录像回放','设备状态获取',],
            buildingList:[],
            floorList:[],
            pointClick:'',
            pointSign:'',
            planFloor:'',
            offsetY:0,
            offsetX:0,
            pointTitle:'点位标注',
            dialogPointVisible:false,
            surroundingPhoto:'',
            checkedList:[],
            cameraFunction:[],
            plainOptionsList:[
                {value:1,label:'实时视频'},  
                {value:2,label:'报警截图'},  
                {value:3,label:'录像回放'},  
                {value:4,label:'设备状态获取'},  
            ],
            plainOptions:[],
            handle:'',
            deviceModelList: [],
            recorData: {},
        };
    },
    components:{
        "device-position": DevicePosition,
    },
    props:["deviceTypeList"],
    created(){
        this.getDictData()
        this.plainOptionsList.forEach(s=>{
            this.plainOptions.push(s.label)
        })
    },
    methods: {
        beforeUpload(file){
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
                    console.log(res)
                    if(res && res.data && res.data.success){
                        this.$message.success('上传成功')
                        this.surroundingPhoto=this.$imgUrl+res.data.value.fileName
                    }else{
                        this.$message.error('上传失败')
                    }
                }
            })
            return false;
        },
        floorChange(val){
            console.log(val)
            console.log(this.floorList)
            if(this.floorList.filter(s=>s.id==val).length){
                this.planFloor=this.$imgUrl+this.floorList.filter(s=>s.id==val)[0].plan
                // this.planFloor='https://www.baidu.com/img/bd_logo1.png'
            }
        },
        getPoinValue(param){
            this.form.setFieldsValue({
                pointSign:param.pointSign
            })
        },
        alertDialog(){
            console.log(this.form.getFieldValue('floorId'))
            if(this.form.getFieldValue('floorId')){
                this.pointSign=this.form.getFieldValue('pointSign')
                this.dialogPointVisible=true
            }else{
                this.$message.error('请选择楼层')
                return
            }
        },
        buildingChange(val){
            if(this.buildingList.filter(s=>s.value==val).length){
                var buildingCode=this.buildingList.filter(s=>s.value==val)[0].label
            }else{
                return
            }
            this.form.setFieldsValue({
                floorId:''
            })
            findByBuildCode({buildingCode:buildingCode}).then(res=>{
                console.log(res)
                if(res && res.data && res.data.value && res.data.value.length){
                    res.data.value.forEach(s=>{
                        s.label=s.floorCode
                        s.value=s.id
                    })
                    this.floorList=res.data.value
                }else{
                    this.floorList=[]
                    this.form.setFieldsValue({
                        floorId:''
                    })
                }
            })
        },
        getDictData(){
            findList().then(res=>{
                console.log(res)
                if(res && res.data && res.data.value && res.data.value.length){
                    res.data.value.forEach(s=>{
                        s.value=s.id
                        s.label=s.buildingCode
                    })
                    this.buildingList=res.data.value
                }
            })
        },
        onChange(checkedList) {
            this.checkedList=checkedList
        },
        getFun(){
            this.cameraFunction=[]
            this.plainOptionsList.forEach(s=>{
                this.checkedList.forEach(t=>{
                    if(s.label==t){
                        this.cameraFunction.push(s.value)
                    }
                })
            })
        },
        handleSubmit(e){
            e.preventDefault();
            this.form.validateFields((error, values) => {
                if(!error){
                    this.getFun()
                    values.cameraFunction=this.cameraFunction.join(',')
                    values.surroundingPhoto=this.surroundingPhoto
                    if(this.handle=='add'){
                        insert(values).then(res=>{
                            console.log(res)
                            if(res && res.data && res.data.success){
                                this.$message.success('添加成功')
                                this.visible=false
                                this.$emit('refresh','')
                            }else{
                                this.$message.error('添加失败')
                            }
                        })
                    }else{
                        values.id=this.recorData.id
                        console.log(values)
                        findDicIdByDesc({desc:values.deviceModel}).then(res => {
                            if(res && res.data && res.data.value){
                                values.deviceModel = res.data.value.id
                            }
                            updateCamera(values).then(res=>{
                                if(res && res.data && res.data.success){
                                    this.$message.success('修改成功')
                                    this.visible=false
                                    this.$emit('refresh','')
                                }else{
                                    this.$message.error('修改失败')
                                }
                            })
                        })
                            
                    }
                }
            });
        },
        showDrawer(record, handle) {
            this.handle=handle
            this.$store.dispatch("setRowLight", record.id)
            this.visible = true;
            if(handle=='add'){
                this.$nextTick(()=>{
                    this.formEdit = false
                    this.title = '添加'
                    this.surroundingPhoto=''
                    this.cameraFunction=[]
                    this.checkedList=[]
                    this.form.setFieldsValue({
                        'deviceId':'',
                        'deviceModel':'',
                        'deviceName':'',
                        'deviceType':'',
                        'deviceCaptch':'',
                        'deviceCpassword':'',
                        'deviceCusername':'',
                        'buildingId':'',
                        'floorId':'',
                        'location':'',
                        'pointSign':'',
                    });
                })
            }else{
                this.$nextTick(()=>{
                    this.formEdit = false
                    this.title = '编辑'
                    this.surroundingPhoto=this.$imgUrl+record.surroundingPhoto
                    // this.id=record.id
                    this.recorData = record
                    findByBuildCode({buildingCode:record.buildingName}).then(res=>{
                        console.log(res)
                        if(res && res.data && res.data.value && res.data.value.length){
                            res.data.value.forEach(s=>{
                                s.label=s.floorCode
                                s.value=s.id
                                if(s.id==record.floorId){
                                    this.planFloor=this.$imgUrl+s.plan
                                }
                            })
                            this.floorList=res.data.value
                        }else{
                            this.floorList=[]
                        }
                        let floorList=this.floorList.filter(s=>s.label==record.floorName)
                        console.log(this.deviceTypeList.filter(s=>s.label==record.deviceType))
                        console.log(this.buildingList.filter(s=>s.label==record.buildingName))
                        this.form.setFieldsValue({
                            'deviceId':record.deviceId,
                            'deviceModel':record.deviceModel,
                            'deviceName':record.deviceName,
                            'deviceType':this.deviceTypeList.filter(s=>s.label==record.deviceType).length?this.deviceTypeList.filter(s=>s.label==record.deviceType)[0].value:'',
                            'deviceCaptch':record.deviceCaptch,
                            'deviceCpassword':record.deviceCpassword,
                            'deviceCusername':record.deviceCusername,
                            'buildingId':this.buildingList.filter(s=>s.label==record.buildingName).length?this.buildingList.filter(s=>s.label==record.buildingName)[0].value:'',
                            'floorId':floorList.length?floorList[0].value:null,
                            'location':record.location,
                            'pointSign':record.pointSign,
                        });
                        this.showFun(record.cameraFunction)
                    })
                })
            }
        },
        showFun(cameraFunction){
            this.checkedList=[]
            if(cameraFunction){
                cameraFunction.split(',').forEach(num=>{
                    this.plainOptionsList.forEach(t=>{
                        if(num==t.value){
                            this.checkedList.push(t.label)
                        }
                    })
                })
            }
        },
        onClose() {
            this.visible = false;
            this.$store.dispatch("setRowLight", '')
        },
        typeChange (value) {
            getDeviceFindList({type:3,id:value}).then(res=>{
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