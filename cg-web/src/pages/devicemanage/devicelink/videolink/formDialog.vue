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
            <a-form class="ant-advanced-search-form" :form="form" layout="vertical">
                <a-row :gutter="18" style="display:flex;justify-content: space-around;height: 50px;">
                    <a-col :span="6">
                        <a-form-item label="设备ID/识别码">
                                <a-input 
                                style="margin-left:10px;margin-top:-10px;margin-top:-10px;"
                                placeholder="请输入设备ID/识别码"
                                v-decorator="['deviceCode']"
                                maxLength="45"
                                :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="设备名称">
                                <a-input 
                                style="margin-left:10px;margin-top:-10px;"
                                placeholder="请输入设备名称"
                                v-decorator="['deviceName']"
                                maxLength="255"
                                :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="所属系统">
                            <a-input 
                            style="margin-left:10px;margin-top:-10px;"
                            placeholder="请输入所属系统"
                            v-decorator="['systemCode']"
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
                            v-decorator="['deviceType']"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="设备型号">
                            <a-input 
                            style="margin-left:10px;margin-top:-10px;"
                            placeholder="请输入设备型号"
                            v-decorator="['deviceModel']"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="所属建筑">
                            <a-input 
                            style="margin-left:10px;margin-top:-10px;"
                            placeholder="请输入所属建筑"
                            v-decorator="['buildingName']"
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
                            v-decorator="['floorName']"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="安装位置">
                            <a-input 
                            style="margin-left:10px;margin-top:-10px;"
                            placeholder="请输入安装位置"
                            v-decorator="['location']"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="摄像头数量">
                            <a-input 
                            style="margin-left:10px;margin-top:-10px;"
                            placeholder="请输入摄像头数量"
                            v-decorator="['deviceCount']"
                            :disabled="formEdit"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-divider style="margin-top:0;"/>
                <band :buildingList="buildingList" :floorList="floorList" :deviceId="deviceId" v-if="handle=='add'"/>
                <unband :buildingList="buildingList" :floorList="floorList" :deviceId="deviceId" @refreshUnBand="refreshUnBand" v-if="handle=='edit'"/>
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
import Vue from 'vue'
import { findLinkCamera } from '@/api/devicemanage/devicelink'
export default {
    components:{
        band,
        unband
    },
    props:["systemList","deviceTypeList","deviceModelList","floorList","buildingList"],
    data() {
        return {
            visible: false,
            title: '',
            form: this.$form.createForm(this),
            formEdit: true,
            dataSource:[],
            handle:'',
            params:{
                page:0,
                pageSize:10,
                deviceModel:null,
                buildingId:null,
                primaryDeviceId:null
            },
            deviceId:''
        };
    },
    watch: {
        visible(){
            if(this.visible){
                if(this.handle=='add'){
                }else{
                }
            }
        }
    },
    created(){
        
    },
    mounted(){
        
    },
    methods: {
        refresh(){
            this.$emit('refresh','')
        },
        refreshUnBand(){
            this.$emit('refreshUnBand','')
        },
        showDrawer(record, handle) {
            for(let key of Object.keys(this.params)){
                Vue.delete(this.params,key);
            }
            this.params.page = 0;
            this.params.pageSize = 10;
            this.handle = handle;
            this.title = '关联摄像头';
            this.visible = true;
            this.$store.dispatch("setRowLight",record.deviceId)
            this.deviceId = record.deviceId;
            this.$nextTick(()=>{
                this.form.setFieldsValue({
                    'deviceCode':record.deviceCode,
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
            this.$store.dispatch("setRowLight", '')
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