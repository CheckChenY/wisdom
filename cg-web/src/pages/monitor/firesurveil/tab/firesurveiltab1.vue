<template>
    <a-form class="monitor_tab_index">
        <a-row :gutter="24">
            <a-col :span="12">
                <a-form-item 
                    label="设备ID/标识码"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                    {{data.deviceId}}
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="设备名称"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                    {{data.deviceName}}
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="所属系统"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                    {{data.systemName}}
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="设备类型"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                    {{data.deviceType}}
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="设备型号"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                    {{data.deviceModel}}
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="所在建筑"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                    {{data.buildingName}}
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="楼层/区域"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                    {{data.floorName}}
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="安装位置"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                    {{data.location}}
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="点位标注"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                    {{data.pointSign}}
                </a-form-item>
            </a-col>
            <!-- <a-col :span="12">
                <a-form-item label="安装时间"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                    {{data.createTime}}
                </a-form-item>
            </a-col> -->
            <a-col :span="12">
                <a-form-item label="设备型号图"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }">
                    <img v-if="data.modelPhoto" :src="data.modelPhoto" class="model_class"/>
                    <img v-if="!data.modelPhoto" src="../../../../assets/empty.png" class="model_class"/>
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>
<script>
export default {
    props: ["paramData"],
    watch:{
        'paramData.deviceId':function(val, oval){
            this.data = this.paramData
        }
    },
    data () {
        return {
            data:{},
        };
    },
    created () { 
        this.data = this.paramData
    },
    mounted () {
    },
    computed: {
    },
    destoryed(){
    },
    methods: {
    }
}
</script>
<style lang="scss">
.monitor_tab_index{
    .ant-steps-item{
        width:400px;
        flex: none;
    }
    .ant-form-item-label{
        width:120px;
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
    .model_class{
        width: 200px;
        height: 200px;
    }
}
</style>
