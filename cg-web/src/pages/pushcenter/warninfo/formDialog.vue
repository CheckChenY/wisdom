<template>
    <div class="form_dialog">
        <a-drawer
            title="消息查看"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
            :width="720"
            >
            <a-form :form="form" layout="vertical" hideRequiredMark>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="报警时间">
                            {{formData.createTime}}
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="设备名称">
                            {{formData.deviceName}}
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="所属系统">
                            {{formData.system}}
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="具体内容">
                            {{formData.acceptNoticeContent}}
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="所在建筑">
                            {{formData.building}}
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="楼层/区域">
                            {{formData.floor}}
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="安装位置">
                            {{formData.location}}
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="设备状态">
                            {{formData.alarmType}}
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="报警类型">
                            {{formData.alarmDetails}}
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="警情程度">
                            {{formData.alarmLevel}}
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
                <a-button :style="{marginRight: '8px'}" @click="onClose">
                    取 消
                </a-button>
                <a-button :style="{marginRight: '8px'}" @click="onHandle" type="primary">
                    前往处理
                </a-button>
            </div>
        </a-drawer>
    </div>
</template>
<script>
import { findDetailById } from '@/api/pushcenter/pushcenter'
import { dict } from '@/const/dict'

export default {
    data() {
        return {
            visible: false,
            form: this.$form.createForm(this),
            formEdit: false,
            formData:{},
            record: {},
            warnTypeList:dict.USESTATE,
            warnLevelList:dict.ALARMLEVEL,
        };
    },
    watch: {
    },
    methods: {
        showDrawer(record, handle) {
            this.visible = true;
            this.record = record
            this.$store.dispatch("setRowLight", record.id)
            this.getDetail(record.acceptNoticeParam)
        },
        onClose() {
            this.visible = false;
            this.$store.dispatch("setRowLight", '')
        },
        onHandle () {
            this.$router.push({path:'/warnscan'})
        },
        getDetail (id) {
            findDetailById({param:id}).then(res => {
                if (res && res.data && res.data.success) {
                    if(res.data.value && res.data.value.alarmDetails && res.data.value.alarmDetails.length){
                        res.data.value.alarmDetails=res.data.value.alarmDetails.join('')
                    }
                    this.warnTypeList.forEach(t=>{
                        if(res.data.value.alarmType==t.value){
                            res.data.value.alarmType=t.label
                        }
                    })
                    this.warnLevelList.forEach(t=>{
                        if(res.data.value.alarmLevel==t.value){
                            res.data.value.alarmLevel=t.label
                        }
                    })
                    this.formData = res.data.value
                    this.formData.createTime = this.record.createTime
                    this.formData.acceptNoticeContent = this.record.acceptNoticeContent
                }
            })
        }
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