<template>
    <div>
        <a-drawer
            :title="title"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
            :width="1200"
            >
            <a-form class="ant-advanced-search-form" :form="form" layout="vertical" @submit="handleSubmit">
                <a-row :gutter="18" style="display:flex;justify-content: space-around;height: 50px;">
                    <a-col :span="6">
                        <a-form-item label="设备ID/识别码">
                                <a-input 
                                style="margin-left:10px;margin-top:-10px;margin-top:-10px;"
                                placeholder="请输入设备ID/识别码"
                                maxLength="45"
                                v-decorator="[
                                    'deviceId',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '设备ID/识别码!',
                                            },
                                        ],
                                    },
                                ]"
                                :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="设备名称">
                                <a-input 
                                style="margin-left:10px;margin-top:-10px;"
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
                    <a-col :span="6">
                        <a-form-item label="所属系统">
                            <a-input 
                            style="margin-left:10px;margin-top:-10px;"
                            placeholder="请输入所属系统"
                            v-decorator="[
                                'systemType',
                                {
                                    rules: [
                                        {
                                        required: true,
                                        message: '所属系统!',
                                        },
                                    ],
                                },
                            ]"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="18" style="display:flex;justify-content: space-around;height: 50px;">
                    <a-col :span="6">
                        <a-form-item label="设备类型">
                            <a-input 
                            style="margin-left:10px;margin-top:-10px;"
                            placeholder="请输入设备类型"
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
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="设备型号">
                            <a-input 
                            style="margin-left:10px;margin-top:-10px;"
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
                            ]"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="所属建筑">
                            <a-input 
                            style="margin-left:10px;margin-top:-10px;"
                            placeholder="请输入所属建筑"
                            v-decorator="[
                                'buildingName',
                                {
                                    rules: [
                                        {
                                        required: true,
                                        message: '所属建筑!',
                                        },
                                    ],
                                },
                            ]"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="18" style="display:flex;justify-content: space-around;height: 50px;">
                    <a-col :span="6">
                        <a-form-item label="楼层/区域">
                            <a-input 
                            style="margin-left:10px;margin-top:-10px;"
                            placeholder="请输入楼层/区域"
                            v-decorator="[
                                'floorName',
                                {
                                    rules: [
                                        {
                                        required: true,
                                        message: '楼层/区域!',
                                        },
                                    ],
                                },
                            ]"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="安装位置">
                            <a-input 
                            style="margin-left:10px;margin-top:-10px;"
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
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-divider style="margin-top:0;"/>
                <band :buildingList="buildingList" :floorList="floorList" :deviceId="deviceId" @refresh="refresh" v-if="handle=='add'"/>
                <unband :buildingList="buildingList" :floorList="floorList" :deviceModelList="deviceModelList" :linkList="linkList" :deviceId="deviceId" @refreshUnBand="refreshUnBand" v-if="handle=='edit'"/>
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
import band from './band'
import unband from './unband'
import { findNoLinkGroupPage,findLinkGroupPage } from '@/api/devicemanage/devicelink'

export default {
    components:{
        band,
        unband
    },
    data() {
        return {
            visible: false,
            title: '',
            form: this.$form.createForm(this),
            formEdit: false,
            dataSource:[{
                id:1
            }],
            handle:'',
            deviceId:'',
            params:{
                page:0,
                pageSize:10,
                deviceModel:'',
                buildingId:'',
                floorId:''
            },
            paramsDoneLink:{
                page:0,
                pageSize:10,
                deviceModel:'',
                buildingId:'',
                floorId:'',
                primaryDeviceId:'',
            },
            noLinkList:[],
            linkList:[]
        };
    },
    props:["systemList","deviceTypeList","deviceModelList","floorList","buildingList"],
    watch: {
        visible(){
            if(this.visible){
                console.log(this.handle)
                if(this.handle=='add'){
                    // this.getNoLinkList()
                }else{
                    // this.getLinkList()
                }
            }
        }
    },
    created(){
        
    },
    methods: {
        refresh(){
            this.$emit('refresh','')
            // this.getNoLinkList()
        },
        refreshUnBand(){
            this.$emit('refreshUnBand','')
            // this.getLinkList()
        },
        // getNoLinkList(){
        //     // this.params.primaryDeviceId=this.deviceId
        //     findNoLinkGroupPage(this.params).then(res=>{
        //         console.log(res)
        //         if(res && res.data && res.data.success){
        //             if(res.data.value.content.length){
        //                 res.data.value.content.forEach(s=>{
        //                     this.systemList.forEach(t=>{
        //                         if(s.systemType && t.value==s.systemType){
        //                             s.systemType=t.label
        //                         }
        //                     })
        //                     this.deviceTypeList.forEach(t=>{
        //                         if(s.deviceType && t.value==s.deviceType){
        //                             s.deviceType=t.label
        //                         }
        //                     })
        //                     this.deviceModelList.forEach(t=>{
        //                         if(s.deviceModel && t.value==s.deviceModel){
        //                             s.deviceModel=t.label
        //                         }
        //                     })
        //                 })
        //             }
        //             this.noLinkList=res.data.value.content
        //         }else{
        //             this.noLinkList=[]
        //         }
        //     })
        // },
        // getLinkList(){
        //     this.paramsDoneLink.primaryDeviceId=this.deviceId
        //     findLinkGroupPage(this.paramsDoneLink).then(res=>{
        //         console.log(res)
        //         if(res && res.data && res.data.success && res.data.value.content.length){
        //             res.data.value.content.forEach(s=>{
        //                 this.systemList.forEach(t=>{
        //                     if(s.systemType && t.value==s.systemType){
        //                         s.systemType=t.label
        //                     }
        //                 })
        //                 this.deviceTypeList.forEach(t=>{
        //                     if(s.deviceType && t.value==s.deviceType){
        //                         s.deviceType=t.label
        //                     }
        //                 })
        //                 this.deviceModelList.forEach(t=>{
        //                     if(s.deviceModel && t.value==s.deviceModel){
        //                         s.deviceModel=t.label
        //                     }
        //                 })
        //             })
        //             this.linkList=res.data.value.content
        //         }else{
        //             this.linkList=[]
        //         }
        //     })
        // },
        handleSubmit(e){
            e.preventDefault();
            this.form.validateFields((error, values) => {
                if(!error){
                    console.log(values)
                }
            });
        },
        showDrawer(record, handle) {
            console.log(record)
            this.deviceId=record.deviceId
            this.$store.dispatch("setRowLight",record.deviceId)
            this.handle=handle
            this.title = '关联子设备'
            this.visible = true;
            this.$nextTick(()=>{
                this.formEdit = true
                this.form.setFieldsValue({
                    'deviceId':record.deviceId,
                    'deviceName':record.deviceName,
                    'deviceType':record.deviceType,
                    'systemCode':record.systemCode,
                    'deviceModel':record.deviceModel,
                    'buildingName':record.buildingName,
                    'floorName':record.floorName,
                    'location':record.location,
                    'deviceCount':record.deviceCount,
                });
            })
        },
        onClose() {
            this.visible = false;
            this.$store.dispatch("setRowLight",'')
            this.handle = ''
        },
    },
};
</script>
<style lang='scss'>
.form_dialog{
    .table-operations {
        text-align: left;
    }

    .table-operations > button {
        margin-right: 8px;
    }
}
</style>