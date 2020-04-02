<template>
    <div class="unit_review">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
        <a-row :gutter="24">
            <a-col :span="6">
                <a-form-item label="单位名称">
                    <a-input
                    v-decorator="[
                        'orgName',
                    ]"
                    maxLength="50"
                    placeholder="单位名称"/>
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="单位类型">
                    <a-select 
                    v-decorator="[
                        'orgType',
                    ]"
                    showSearch
                    optionFilterProp="children"
                    placeholder="单位名称">
                        <a-select-option v-for="(item,index) in orgTypeList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="注册时间">
                    <a-range-picker 
                    v-decorator="[
                        'registerTime',
                    ]"/>
                </a-form-item>
            </a-col>
            <a-col :span="5" :style="{marginTop:'3px'}">
                <a-button type="primary" html-type="submit">
                    查询
                </a-button>
                <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                    清空
                </a-button>
            </a-col>
        </a-row>
    </a-form>
    <a-table bordered :dataSource="dataSource" 
        :columns="columns"
        :pagination="pagination"
        :rowClassName="rowClassName"
         style="margin-top:16px;">
        <template slot="checkState" slot-scope="text, record">
            <div class="editable-row-operations">
                <a-radio-group @change="switchChange(record)" v-model="record.checkState">
                    <a-radio :value="1">通过</a-radio>
                    <a-radio :value="2">未通过</a-radio>
                </a-radio-group>
            </div>
        </template>
        <template slot="operation" slot-scope="text, record">
            <div class="editable-row-operations">
                <a-button @click="() => onView(record)" type="primary" style="margin-right: 10px;">查看</a-button>
            </div>
        </template>
    </a-table>
    <formDialog ref="formDialog"></formDialog>
  </div>
</template>
<script>
import formDialog from '@/components/base/formDialog.vue';
import { insert } from "@/api/company/companyreview"
import { findPageList } from '@/api/company/companymanage'
import { debuglog } from 'util';
import { mapGetters } from "vuex";

export default {
    name: 'unitreview',
    components: {
        formDialog
    },
    data() {
        return {
            dataSource: [],
            count: 2,
            columns: [
                {
                    title: '单位名称',
                    dataIndex: 'orgName',
                },
                {
                    title: '统一社会信用代码',
                    dataIndex: 'orgCode',
                },
                {
                    title: '单位类型',
                    dataIndex: 'orgType',
                },
                {
                    title: '单位法人',
                    dataIndex: 'legalPerson',
                },
                {
                    title: '联系人',
                    dataIndex: 'userName',
                },
                {
                    title: '联系人电话',
                    dataIndex: 'phone',
                },
                {
                    title: '注册时间',
                    dataIndex: 'createTime',
                },
                {
                    title: '审核',
                    dataIndex: 'checkState',
                    width: 200,
                    type: 'radio',
                    disData: [{
                        value: 1,
                        label: '通过',
                    },{
                        value: 2,
                        label: '未通过',
                    }],
                    scopedSlots: { customRender: 'checkState' },
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: '8%',
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            form: this.$form.createForm(this, { name: 'advancedSearch' }),
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
                status:2,
            },
            pagination: {
                onChange: this.onChange,
                pageSize: 10,
                current:1
            }
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
        switchChange(item){
            console.log(item)
            let obj={
                reviewResult:item.checkState,
                companyId:item.id,
                reviewComment:''
            }
            insert(obj).then(res=>{
                if(res && res.data && res.data.success){
                    this.$message.success('审核成功')
                    this.getData()
                }
            })
        },
        getData(){
            findPageList(this.params).then(res=>{
                const pagination = { ...this.pagination };
                if(res.data.success && res.data.value){
                    if (!res.data.value) {
                        return
                    }
                    pagination.total = res.data.value.totalElements;
                    this.pagination = pagination;
                    res.data.value.content.forEach(s=>{
                        s.orgImg=this.$imgUrl+s.org_img
                        s.key=s.id
                        this.orgTypeList.forEach(t=>{
                            if(s.orgType==t.value){
                                s.orgType=t.label
                            }
                        })
                    })
                    this.dataSource=res.data.value.content
                }else{
                    this.dataSource=[]
                }
            })
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
            this.params.page = 0
            this.pagination.current = 1
            this.form.validateFields((error, values) => {
                this.params.orgName=values.orgName?values.orgName:''
                this.params.orgType=values.orgType?values.orgType:''
                if(values.registerTime && values.registerTime.length){
                    console.log(values.registerTime)
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
            this.$refs.formDialog.showDrawer(record, 'view', this.columns)
        },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
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