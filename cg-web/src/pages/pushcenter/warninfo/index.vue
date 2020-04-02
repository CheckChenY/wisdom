<template>
    <div class="unit_review">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="5">
                    <a-form-item label="所属系统">
                        <a-select 
                        v-decorator="['acceptNoticeSubtitle']"
                        showSearch
                        optionFilterProp="children"
                        placeholder="所属系统">
                            <a-select-option v-for="(item,index) in systemList" :value="item.value" :key="index">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="查看状态">
                        <a-select 
                        v-decorator="['statusType']"
                        placeholder="查看状态">
                            <a-select-option value="1">已读</a-select-option>
                            <a-select-option value="0">未读</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="报警时间">
                        <a-range-picker 
                        @change="dateChange"
                        v-model="sendDate"/>
                    </a-form-item>
                </a-col>
                <a-col :span="3" :style="{marginTop:'3px'}">
                    <a-button type="primary" html-type="submit">
                        查询
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        清空
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
        <a-table :pagination="pagination" bordered 
            :dataSource="dataSource" 
            :rowClassName="rowClassName"
            :columns="columns">
            <template slot="statusType" slot-scope="text, record">
                <a-tag color="blue" v-if="record.statusType == 1">已读</a-tag>
                <a-tag color="red" v-else>未读</a-tag>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                    <a-button type="primary" @click="() => onView(record)">查看</a-button>
                </div>
            </template>
        </a-table>
        <formDialog ref="formDialog"></formDialog>
    </div>
</template>
<script>
import { findAlarmSituationList, updateAlreadyread } from '@/api/pushcenter/pushcenter'
import formDialog from './formDialog.vue';
import moment from 'moment';
import { getDeviceFindList } from '@/api/public'
import { mapGetters } from "vuex";
export default {
    components: {
        formDialog
    },
    data() {
        return {
            dataSource: [],
            count: 2,
            columns: [
                {
                    title: '序号',
                    dataIndex: 'id',
                },
                {
                    title: '报警时间',
                    dataIndex: 'createTime',
                },
                {
                    title: '设备名称',
                    dataIndex: 'acceptNoticeTitle',
                },
                {
                    title: '所属系统',
                    dataIndex: 'acceptNoticeSubtitle',
                },
                {
                    title: '警情消息内容',
                    dataIndex: 'acceptNoticeContent',
                },
                {
                    title: '查看状态',
                    dataIndex: 'statusType',
                    scopedSlots: { customRender: 'statusType' },
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: '8%',
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                size:9,
            },
            pagination: {
                onChange: this.onChange,
                pageSize: 9,
                current: 1
            },
            sendDate:null,
            sendDateValue:'',
            systemList: [],
        };
    },
    created(){
        this.getDictData()
    },
    mounted(){
        this.getData()
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    methods: {
        dateChange(date,dateString){
            this.sendDate=date
            this.sendDateValue=dateString
        },
        getData(){
            findAlarmSituationList(this.params).then(res=>{
                if(res && res.data && res.data.success){
                    res.data.value.content.forEach(s=>{
                        s.key=s.id
                    })
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    this.dataSource=res.data.value.content
                    this.pagination = pagination;
                }
            })
        },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        },
        handleSearch(e) {
            e.preventDefault();
            this.params.page = 0
            this.pagination.current = 1
            this.params.startTime = this.sendDateValue[0]
            this.params.endTime = this.sendDateValue[1]
            this.form.validateFields((error, values) => {
                values.acceptNoticeSubtitle = values.acceptNoticeSubtitle?values.acceptNoticeSubtitle.toString():null
                Object.assign(this.params,values)
                this.getData()
            });
        },
        getDictData(){
            getDeviceFindList({type:1}).then(res=>{
                this.systemList=[]
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                        this.systemList=res.data.value
                    }
                }
            })
            
        },
        handleReset() {
            this.sendDate=null
            this.sendDateValue=''
            this.form.resetFields();
        },
        onCellChange(key, dataIndex, value) {
            const dataSource = [...this.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.dataSource = dataSource;
            }
        },
        onView(record) {
            console.log(record)
            this.$refs.formDialog.showDrawer(record, 'view')
            updateAlreadyread({id:record.id}).then(res => {
                this.$store.dispatch("findCount")
                this.onChange(1)
            })
        },
        rowClassName (record) {
            let className = '';
            if (this.rowLight == record.id) {
                className = 'light-row';
            }
            return className;
        }
    },
};
</script>
<style lang='scss'>
.ant-advanced-search-form {
    padding: 24px;
    background: #fff;
    /* border: 1px solid #d9d9d9; */
    border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
    display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
    flex: 1;
}

#components-form-demo-advanced-search .ant-form {
    max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}
</style>