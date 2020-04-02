<template>
    <div class="form_dialog">
        <a-drawer
            title="远程操作"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
            :width="900"
            >
            <div style="text-align: center;" v-if="operateArr.length === 0">
                <span>没有远程操作</span>
            </div>
            <div style="font-size:18px;color:#f00;" v-if="operateArr.length != 0">
                <span>复位操作后，请等待30s--60s设备重新连网</span>
            </div>
            <a-form v-bind="formItemLayout" v-if="operateArr.length > 0">
                <a-form-item label="操作说明">
                    <a-radio-group v-model="radio">
                        <a-radio v-for="(item, i) in recordDict" 
                            :key="i" 
                            :value="item.value">{{item.label}}</a-radio>
                    </a-radio-group>
                    <a-textarea
                        placeholder="请填写说明"
                        :autosize="{ minRows: 2, maxRows: 6 }"
                        :disabled="radio != 'h'"
                        v-model="radioText"
                    />
                </a-form-item>
                <a-form-item label="远程操作">
                    <a-radio-group v-model="operate">
                        <a-radio-button v-for="(item, i) in operateArr" 
                            :value="item.value" 
                            :key="i">{{item.key}}</a-radio-button>
                    </a-radio-group>
                </a-form-item>
            </a-form>
            <!-- <div>
                <a-progress :percent="percent" />
            </div> -->
            <div style="text-align:right" v-if="operateArr.length > 0">
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
                        :locale="{emptyText: '暂无数据'}"
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
import { operationApp, getOrderList,getOperationList } from '@/api/monitor/monitor';
import { debuglog } from 'util';
import { dict } from '@/const/dict';
import { columns } from '@/const/monitor/operation';
import { remoteAnalys } from '@/util/public';

export default {
    data() {
        return {
            visible: false,
            formItemLayout: {
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
            },
            radio: '',
            operate: '',
            operateArr: [],
            record: {},
            recordDict: [],
            radioText:'',
            percent:0,
            perInterval: '',
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
                operationType:1,
            },
            timer:0,
            columns: columns,
        };
    },
    created(){
    },
    methods: {
        showDrawer(record) {
            this.visible = true;
            this.record = record
            this.$store.dispatch("setRowLight", record.deviceId)
            this.radio = ""
            this.operate = ""
            this.radioText = ""
            this.getOrderList(record.deviceModelId)
            this.getOperationList(record)
        },
        onClose() {
            this.visible = false;
            this.$store.dispatch("setRowLight", '')
        },
        handleSubmit() {
            if (!this.radio) {
                this.$message.info('请选择操作说明')
                return
            }
            if (!this.operate) {
                this.$message.info('请选择远程操作')
                return
            }
            let describe = ''
            if (this.radio === 'h') {
                describe = this.radioText
            } else {
                let radio = dict.REMOTEDICT.filter(item => item.value == this.radio)
                describe = radio[0].label
            }
            let operate = parseInt(this.operate).toString(16)
            // this.perTimeInterval()
            this.loading = true
            operationApp({deviceId:this.record.deviceId,cmd:operate,describe:describe}).then(res => {
                this.loading = false
                if (res && res.data && res.data.success) {
                    this.$message.success('操作成功')
                    this.percent=100
                } else {
                    this.$message.error('操作失败')
                }
                clearInterval(this.perInterval)
                this.visible = false;
            })
        },
        perTimeInterval () {
            this.perInterval = setInterval(() => {
                this.percent=this.percent+1
                if(this.percent==95){
                    clearInterval(this.perInterval)
                }
            },300)
        },
        getOrderList (model) {
            this.recordDict = []
            getOrderList({deviceModel:model}).then(res => {
                res.data.value.forEach(item => {
                    let dicItem = remoteAnalys(item.key)
                    this.recordDict.push(dicItem)
                })
                this.recordDict.push(dict.REMOTEDICT[dict.REMOTEDICT.length-1])
                this.operateArr = res.data.value
            })
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