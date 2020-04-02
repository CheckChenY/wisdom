<template>
    <div class="unit_review">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="5">
                    <a-form-item label="发送对象">
                        <a-select 
                        v-decorator="['noticeType']"
                        showSearch
                        optionFilterProp="children"
                        placeholder="发送对象">
                            <a-select-option :value="item.value" v-for="(item, i) in noticeTypeList" :key="i">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="发送状态">
                        <a-select 
                        v-decorator="['statusType']"
                        placeholder="发送状态">
                            <a-select-option value="1">已推送</a-select-option>
                            <a-select-option value="2">推送失败</a-select-option>
                            <a-select-option value="0">未发送</a-select-option>
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
        <div style="margin-bottom:20px;">
            <a-button @click="addself" type="primary" style="margin-right:20px;">新建内部消息</a-button>
            <a-button @click="addcompany" type="primary">新建单位消息</a-button>
        </div>
        <a-table :pagination="pagination" bordered 
            :dataSource="dataSource" 
            :rowClassName="rowClassName"
            :columns="columns">
            <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                    <a-button type="text" @click="() => onView(record)" style="margin-right:10px;">查看</a-button>
                    <a-button type="primary" 
                        @click="() => onSend(record)" 
                        v-if="record.isPush != 1"
                        style="margin-right:10px;">发送</a-button>
                    <a-button type="text" 
                        @click="() => onEdit(record)" 
                        v-if="record.isPush != 1"
                        style="margin-right:10px;">编辑</a-button>
                    <a-button type="danger" 
                        @click="() => onDelete(record)"
                        v-if="record.isPush != 1">删除</a-button>
                </div>
            </template>
        </a-table>
        <a-modal
            title="消息详情"
            :visible="visible"
            @ok="handleOk"
            okText="确定"
            cancelText="取消"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
            >
            <div>
                <div style="display: flex;">
                    <div class="label" style="width:20%;">发布时间：</div>
                    <div style="width:80%;">{{viewForm.sendTime}}</div>
                </div>
                <div style="display: flex;">
                    <div class="label" style="width:20%;">标题：</div>
                    <div style="width:80%;">{{viewForm.noticeTitle}}</div>
                </div>
                <div style="display: flex;">
                    <div class="label" style="width:20%;">接收人：</div>
                    <div style="width:80%;">{{viewForm.noticeUserName}}</div>
                </div>
                <div style="display: flex;">
                    <div class="label" style="width:20%;">具体内容：</div>
                    <div style="width:80%;">{{viewForm.noticeContent}}</div>
                </div>
            </div>
        </a-modal>
        <formDialog ref="formDialog" @refrash="onChange(1)"></formDialog>
    </div>
</template>
<script>
import { findSendMessageList, deleteNotice, pushNotice } from '@/api/pushcenter/pushcenter'
import formDialog from './formDialog.vue';
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
                    title: '发送对象',
                    dataIndex: 'userTypeText',
                },
                {
                    title: '标题',
                    dataIndex: 'noticeTitle',
                },
                {
                    title: '发送给',
                    dataIndex: 'noticeUserName',
                },
                {
                    title: '消息内容',
                    dataIndex: 'noticeContent',
                },
                {
                    title: '发送时间',
                    dataIndex: 'sendTime',
                },
                {
                    title: '发送状态',
                    dataIndex: 'isPushText',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 320,
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            expand:false,
            unitName:'',
            unitType:'',
            registerTime:'',
            params:{
                page:0,
                size:7,
            },
            pagination: {
                onChange: this.onChange,
                pageSize: 7,
                current: 1
            },
            sendDate:null,
            sendDateValue:'',
            visible:false,
            confirmLoading:false,
            viewForm: {},
            noticeTypeList: dict.SENDOBJECT
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
        handleCancel(){
            this.visible=false
        },
        handleOk(){
            this.visible=false
        },
        onDelete(record){
            let _this = this
            this.$confirm({
                title: '提示',
                content: '确定删除该条消息？',
                okText:'确定',
                cancelText:'取消',
                onOk() {
                    return new Promise((resolve, reject) => {
                        deleteNotice({id:record.id}).then(res => {
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
            findSendMessageList(this.params).then(res=>{
                if(res && res.data && res.data.success){
                    res.data.value.content.forEach(s=>{
                        s.isPushText=s.isPush==0?'未推送':s.isPush==1?'已推送':''
                        s.userTypeText=s.userType==0?'内部消息':'单位消息'
                        s.key=s.id
                        s.sendTime= moment(new Date(s.sendTime)).format('YYYY-MM-DD HH:mm:SS')
                        s.noticeUserName = ''
                        if (s.userType == 0) {
                            s.noticeUser.forEach(item => {
                                s.noticeUserName += item.realName + " "
                            })
                        } else {
                            s.noticeCompany.forEach(item => {
                                s.noticeUserName += item.orgName + " "
                            })
                        }
                    })
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    this.dataSource = res.data.value.content
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
        toggle() {
            this.expand = !this.expand;
        },
        onCellChange(key, dataIndex, value) {
            const dataSource = [...this.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.dataSource = dataSource;
            }
        },
        addcompany(){
            this.$refs.formDialog.showDrawer('addcompany', 'add')
        },
        addself(){
            this.$refs.formDialog.showDrawer('addself', 'add')
        },
        onView(record) {
            this.viewForm = record
            this.visible=true
        },
        onEdit(record){
            console.log(record)
            this.$refs.formDialog.showDrawer(record, 'edit')
        },
        onSend(record){
            console.log(record)
            pushNotice({id:record.id}).then(res => {
                console.log(res.data)
                if (res && res.data && res.data.success) {
                    this.$message.success('发送成功')
                } else {
                    this.$message.error('发送失败')
                }
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