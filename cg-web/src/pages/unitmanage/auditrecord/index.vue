<template>
    <div class="unit_review">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="5">
                    <a-form-item label="单位名称">
                        <a-input
                        v-decorator="[
                            'orgName',
                            {
                                rules: [
                                    {
                                    required: false,
                                    message: 'Input something!',
                                    },
                                ],
                            },
                        ]"
                        maxLength="50"
                        placeholder="单位名称"/>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="审核时间">
                        <a-range-picker 
                        v-decorator="[
                            'registerTime',
                            {
                                rules: [
                                    {
                                    required: false,
                                    message: 'Input something!',
                                    },
                                ],
                            },
                        ]"/>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="审核结果">
                        <a-select 
                        v-decorator="[
                            'reviewResult',
                            {
                                rules: [
                                    {
                                    required: false,
                                    message: 'Input something!',
                                    },
                                ],
                            },
                        ]"
                        placeholder="审核结果">
                            <a-select-option value="1">通过</a-select-option>
                            <a-select-option value="2">未通过</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5">
                    <a-form-item label="审核人">
                        <a-select 
                        v-decorator="[
                            'createBy',
                            {
                                rules: [
                                    {
                                    required: false,
                                    message: 'Input something!',
                                    },
                                ],
                            },
                        ]"
                        showSearch
                        optionFilterProp="children"
                        placeholder="审核人">
                            <a-select-option v-for="item in roleList" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
                        </a-select>
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
            :columns="columns" style="margin-top:16px;">
            <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                    <a-button @click="() => onView(record)" type="primary">查看</a-button>
                </div>
            </template>
        </a-table>
        <formDialog ref="formDialog"></formDialog>
    </div>
</template>
<script>
import { findPageList,findRoleList } from '@/api/company/companycheckrecord'
import formDialog from './formDialog.vue';
import { debuglog } from 'util';
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
                    title: '审核时间',
                    dataIndex: 'review_time',
                },
                {
                    title: '审核人',
                    dataIndex: 'check',
                },
                {
                    title: '单位名称',
                    dataIndex: 'org_name',
                },
                {
                    title: '统一社会信用代码',
                    dataIndex: 'org_code',
                },
                {
                    title: '单位类型',
                    dataIndex: 'org_type',
                },
                {
                    title: '单位法人',
                    dataIndex: 'legal_person',
                },
                {
                    title: '联系人',
                    dataIndex: 'user_name',
                },
                {
                    title: '联系人电话',
                    dataIndex: 'phone',
                },{
                    title: '注册时间',
                    dataIndex: 'create_time',
                },{
                    title: '审核结果',
                    dataIndex: 'review_result',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: '8%',
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            expand:false,
            orgTypeList:[{
                label:'社会单位',
                value:'1'
            },{
                label:'监管单位',
                value:'2'
            },{
                label:'总公司',
                value:'3'
            },{
                label:'代理商',
                value:'4'
            }],
            unitName:'',
            unitType:'',
            registerTime:'',
            params:{
                orgName:'',
                orgType:'',
                startTime:'',
                endTime:'',
                page:0,
                pageSize:10,
                createBy:'',
                reviewResult:''
            },
            roleList:[],
            pagination: {
                onChange: this.onChange,
                pageSize: 10,
                current: 1
            },
        };
    },
    created(){
        findRoleList().then(res=>{
            console.log(res)
            if(res.data.success && res.data.value.content.length){
                res.data.value.content.forEach(s=>{
                    s.value=s.id
                    s.label=s.roleName
                })
                this.roleList=res.data.value.content
            }
        })
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
        getData(){
            findPageList(this.params).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    res.data.value.content.forEach(s=>{
                        s.orgImg=this.$imgUrl+s.org_img
                        s.review_result=s.review_result==null?'':s.review_result==1?'通过':'未通过'
                        s.key=s.id
                        this.orgTypeList.forEach(t=>{
                            if(s.org_type==t.value){
                                s.org_type=t.label
                            }
                        })
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
        format(a){
            let d=new Date(a)
            let Y=d.getFullYear()
            let M=(d.getMonth()+1<10)?('0'+d.getMonth()+1):d.getMonth()+1
            let D=d.getDate()<10?'0'+d.getDate():d.getDate()
            return Y+'-'+M+'-'+D
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.params.page = 0
                this.pagination.current = 1
                this.params.createBy=values.createBy?values.createBy:''
                this.params.reviewResult=values.reviewResult?values.reviewResult:''
                this.params.orgName=values.orgName?values.orgName:''
                this.params.orgType=values.orgType?values.orgType:''
                if(values.registerTime && values.registerTime.length){
                    this.params.startTime=this.format(values.registerTime[0]._d)
                    this.params.endTime=this.format(values.registerTime[1]._d)
                }else{
                    this.params.startTime=''
                    this.params.endTime=''
                }
                this.getData()
            });
        },

        handleReset() {
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
        onView(record) {
            console.log(record)
            this.$refs.formDialog.showDrawer(record, 'view')
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