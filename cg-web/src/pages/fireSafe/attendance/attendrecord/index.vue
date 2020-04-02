<template>
    <div class="unit_review">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="5">
                    <a-form-item label="人员姓名">
                        <a-select 
                        v-decorator="[
                            'hiddensource',
                            {
                                rules: [
                                    {
                                    required: false,
                                    message: 'Input something!',
                                    },
                                ],
                            },
                        ]"
                        placeholder="人员姓名">
                            <a-select-option value="1">一键上传</a-select-option>
                            <a-select-option value="2">巡查上传</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="考勤日期">
                        <a-range-picker 
                        @change="dateChange"
                        v-model="reportDate"/>
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
            <a-button @click="exportTo" type="primary" style="margin-right:20px;">导出报表</a-button>
        </div>
        <a-table :pagination="pagination" bordered size="middle" :dataSource="dataSource" :columns="columns">
            <!-- slot-scope="text, record" -->
            <template slot="img">
                <div class="editable-row-operations">
                    <img style="height:50px;" src="https://www.baidu.com/img/bd_logo1.png?where=super"/>
                </div>
            </template>
        </a-table>
    </div>
</template>
<script>
import { findPageList,findRoleList } from '@/api/company/companycheckrecord'
import { debuglog } from 'util';
export default {
    data() {
        return {
            dataSource: [],
            count: 2,
            columns: [
                {
                    title: '姓名',
                    dataIndex: 'id',
                },
                {
                    title: '部门',
                    dataIndex: 'review_time',
                },
                {
                    title: '职务',
                    dataIndex: 'org_name',
                },
                {
                    title: '打卡时间',
                    dataIndex: 'review_by',
                },
                {
                    title: '打卡次数',
                    dataIndex: 'org_code',
                },
                {
                    title: '打卡结果',
                    dataIndex: 'time',
                },
                {
                    title: '打卡地址',
                    dataIndex: 'org_type',
                },
                {
                    title: '打卡图片',
                    dataIndex: 'org',
                    scopedSlots: { customRender: 'img' },
                },
                {
                    title: '打卡备注',
                    dataIndex: 'ortype',
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
                current: 1,
                size:'middle'
            },
            reportDate:null,
            reportDateValue:''
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
    methods: {
        exportTo(){

        },
        dateChange(date,dateString){
            this.reportDate=date
            this.reportDateValue=dateString
        },
        getData(){
            findPageList(this.params).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    var roleDic={}
                    this.roleList.forEach(t=>{
                        roleDic[t.value]=t.label
                    })
                    res.data.value.content.forEach(s=>{
                        s.review_by=roleDic[s.review_by]
                        s.orgImg=this.$imgUrl+s.org_img
                        s.review_result=s.review_result==null?'':s.review_result==1?'通过':'未通过'
                        s.key=s.id
                        s.check=false
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
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                console.log(values)
                console.log(this.reportDateValue)
            });
        },
        handleReset() {
            this.reportDate=null
            this.reportDateValue=''
            this.form.resetFields();
        },
    },
};
</script>