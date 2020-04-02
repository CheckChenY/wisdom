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
                        <a-form-item label="审核确认">
                            <a-radio-group 
                            disabled
                            v-model="formData.auditStatus"
                            :options="plainOptions"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" style="height: 82px;"></a-col>
                    <a-col :span="12" v-if="resShow" style="position:relative;">
                        <a-form-item label="处理结果图">
                            <img :src="formData.handPhoto" style="height:100px;">
                        </a-form-item>
                    </a-col>
                    <a-col :span="12" style="padding-bottom:5px;position:relative;" v-if="resShow">
                        <a-form-item label="处理描述">
                            <a-textarea disabled v-model="formData.handDesc" placeholder="处理描述" :rows="4" />
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
            </div>
        </a-drawer>
    </div>
</template>
<script>

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
            auditStatus:'',
            resShow:false
        };
    },
    watch: {
        auditStatus(){
            if(this.auditStatus == '1'){
                this.resShow=true
            }else{
                this.resShow=false
            }
        }
    },
    methods: {
        showDrawer(record, handle) {
            console.log(handle)
            this.$store.dispatch("setRowLight", record.id)
            this.visible = true;
            this.formEdit = false
            this.title = '隐患详情'
            this.formData=record
            this.auditStatus=record.auditStatus
        },
        onClose() {
            this.visible = false;
            this.$store.dispatch("setRowLight", '')
        },
    },
};
</script>