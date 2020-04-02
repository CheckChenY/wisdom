<template>
    <div class="form_dialog">
        <a-drawer
            title="修改阈值"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
            :width="900"
            >
            <div style="text-align: center;" v-if="thresholdArr.length === 0">
                <span>没有阈值</span>
            </div>
            <div style="font-size:18px;color:#f00;" v-if="thresholdArr.length != 0">
                <span>复位操作后，请等待30s--60s设备重新连网</span>
            </div>
            <a-form v-if="thresholdArr.length > 0" style="overflow: scroll;">
                <div v-for="(item, i) in thresholdArr" :key="i">
                    <a-form-item :label="item.thresholdDesc" 
                        :wrapperCol="{ span: 10 }" 
                        :labelCol="{ span: 14 }">
                        <a-input :addonAfter="item.unit" v-model="item.thresholdValue" 
                            placeholder="请输入阈值"
                            maxLength="20"
                            type="number"
                            @change="formFilter(item)"/>
                    </a-form-item>
                </div>
            </a-form>
            <div style="text-align:right"  v-if="thresholdArr.length > 0">
                <a-button type="primary" @click="handleSubmit" :loading="loading">
                    提 交
                </a-button>
            </div>

            <div>
                <a-form-item label="最近操作队列">
                    <a-table bordered 
                        :dataSource="dataSource" 
                        :pagination="pagination"
                        rowKey="id"
                        :columns="columns">
                        <span slot="operationResult" slot-scope="operationResult">
                            <a-tag
                                :color="operationResult === '成功' ? '#87d068' : 
                                        operationResult === '正在执行' ? '#108ee9' :
                                        operationResult === '失败' ? '#f50' : ''"
                                :key="operationResult"
                            >   
                                
                                {{ operationResult === '成功' ? '操作成功' : 
                                operationResult === '失败' ? '操作失败' : 
                                operationResult === '正在执行' ? '正在执行' : '' }}

                                <a-icon :type="operationResult === '成功' ? 'check-circle' : 
                                                operationResult === '正在执行' ? 'loading' :
                                                operationResult === '失败' ? 'close-circle' :'book'"
                                        :spin="operationResult == '正在执行' ? true : false "
                                ></a-icon>

                            </a-tag>
                        </span>

                    </a-table>
                </a-form-item>
            </div>
        </a-drawer>
    </div>
</template>
<script>
import { changeDeviceThreshold, getDeviceThresholdNowDateApp,getOperationList } from '@/api/monitor/monitor'
import { columnsOther } from '@/const/monitor/operation'
export default {
    data() {
        return {
            visible: false,
            formItemLayout: {
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
            },
            mysite: '',
            thresholdArr: [],
            loading: false,

            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize: 4,
                current: 1
            },
            
            params:{
                page:0,
                pageSize:4,
                operationType:2,
            },
            timer:0,
            columns: columnsOther,
        };
    },
    created(){
    },
    methods: {
        showDrawer(record) {
            this.visible = true;
            // '868221987653441891'
            this.$store.dispatch("setRowLight", record.deviceId)
            this.getDeviceThresholdNowDateApp(record.deviceId)
            this.getOperationList(record)
        },
        onClose() {
            this.$store.dispatch("setRowLight", '')
            this.visible = false;
        },
        handleSubmit() {
            this.loading = true
            changeDeviceThreshold(this.thresholdArr).then(res => {
                this.loading = false
                if (res && res.data && res.data.success) {
                    this.$message.success('修改成功')
                    this.visible = false;
                } else {
                    this.$message.error('修改失败')
                }
            })
        },
        getDeviceThresholdNowDateApp (id) {
            getDeviceThresholdNowDateApp({deviceId:id}).then(res => {
                this.thresholdArr = res.data.value
            })
        },
        formFilter (item) {
            const dotIndex = item.thresholdValue.indexOf('.')
            if (dotIndex != -1) {
                setTimeout(() => {
                    item.thresholdValue = item.thresholdValue.split('.')[0]
                })
            }
        },

        getOperationList(list){
            this.params.deviceId = list.deviceId;
            console.log(this.params)
            getOperationList(this.params).then(res=>{
                console.log(res)
                const bool = res.data.success; 
                if(bool){
                    const data = res.data.value.content;
                    this.dataSource = data
                }
            })
        },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getOperationList()
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