<template>
    <div class="unit_review">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="5">
                    <a-form-item label="消息类型">
                        <a-select 
                        v-decorator="['noticeType']"
                        showSearch
                        optionFilterProp="children"
                        placeholder="消息类型">
                            <a-select-option :value="item.value" v-for="(item, i) in noticeTypeList" :key="i">{{item.label}}</a-select-option>
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
                    <a-form-item label="发送日期">
                        <a-range-picker 
                        @change="dateChange"
                        v-model="sendDate"/>
                    </a-form-item>
                </a-col>
                <a-col :span="4" :style="{marginTop:'3px'}">
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
                    <a-button type="primary" @click="() => onView(record)" style="margin-right:10px;">查看</a-button>
                    <a-button type="danger" @click="() => onDelete(record)">删除</a-button>
                </div>
            </template>
        </a-table>
        <formDialog ref="formDialog"></formDialog>
    </div>
</template>
<script>
import { findPageList, updateAlreadyread, delMessage } from '@/api/pushcenter/pushcenter'
import formDialog from './formDialog.vue';
import { debuglog } from 'util';
import moment from 'moment';
import { dict } from '@/const/dict'
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
                    title: '消息类型',
                    dataIndex: 'noticeType',
                },
                {
                    title: '标题',
                    dataIndex: 'acceptNoticeTitle',
                },
                {
                    title: '发布人',
                    dataIndex: 'noticeUser',
                },
                {
                    title: '通知消息内容',
                    width: 600,
                    dataIndex: 'acceptNoticeContent',
                },
                {
                    title: '发送时间',
                    dataIndex: 'sendTime',
                },
                {
                    title: '查看状态',
                    dataIndex: 'statusType',
                    scopedSlots: { customRender: 'statusType' },
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 180,
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
            noticeTypeList: dict.NOTICETYPE
        };
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    mounted(){
        this.getData()
    },
    methods: {
        onDelete(record){
            let _this = this
            this.$confirm({
                title: '提示',
                content: '确定删除该条消息？',
                okText:'确定',
                cancelText:'取消',
                onOk() {
                    return new Promise((resolve, reject) => {
                        delMessage({id:record.id}).then(res => {
                            if (res && res.data && res.data.success) {
                                _this.$message.success('删除成功')
                                _this.onChange(1)
                            } else {
                                _this.$message.error('删除失败')
                            }
                            resolve()
                        })
                    }).catch(() => console.log('Oops errors!'));
                },
                onCancel() {},
            });
        },
        dateChange(date,dateString){
            this.sendDate=date
            this.sendDateValue=dateString
        },
        getData(){
            findPageList(this.params).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    res.data.value.content.forEach(s=>{
                        s.key=s.id
                        s.sendTime = moment(new Date(s.sendTime)).format('YYYY-MM-DD HH:mm:SS')
                        let noticeType = dict.NOTICETYPE.filter(item => s.noticeType.indexOf(item.value) != -1)
                        if (noticeType.length > 0) {
                            s.noticeType  = noticeType[0].label
                        }
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
                Object.assign(this.params,values)
                this.getData()
            });
        },
        handleReset() {
            this.sendDate=null
            this.sendDateValue=''
            this.form.resetFields();
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