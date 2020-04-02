<template>
    <div class="child_unit">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="关联关系">
                        <a-select 
                            showSearch
                        	optionFilterProp="children"
                            v-decorator="[
                                'relationType',
                                {
                                    rules: [
                                        {
                                        required: false,
                                        message: '关联关系!',
                                        },
                                    ],
                                },
                            ]">
                            <a-select-option v-for="(item,index) in relationList" :key="index" :value="item.label">{{item.label}}</a-select-option>
                        </a-select>
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
        <div class="table-operations">
            <a-button type="primary" @click="handleAdd">添加</a-button>
        </div>
        <a-table bordered 
            :dataSource="dataSource" 
            :pagination="pagination"
            :rowClassName="rowClassName"
            :columns="columns">
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
                    <a-button @click="() => onView(record)" type="primary" style="margin-right: 10px;">查看</a-button>
                    <a-button @click="() => onEdit(record)" style="margin-right: 10px;">编辑</a-button>
                    <a-button @click="() => onDelete(record)" type="danger">删除</a-button>
                </div>
            </template>
        </a-table>
        <formDialog ref="formDialog" @refresh="refresh"></formDialog>
    </div>
</template>
<script>
import formDialog from './formDialog.vue';
import { findPageList,findById,deleteRelation,findOrgByType } from "@/api/company/companyassociation"
import { findDictList } from "@/api/public"
import { mapGetters } from "vuex";
export default {
    components: {
        formDialog
    },
    data() {
        return {
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize: 8,
                current: 1
            },
            columns: [
                {
                    title: '序号',
                    dataIndex: 'id',
                },
                {
                    title: '上级单位名称',
                    dataIndex: 'parentCompanyName',
                },
                {
                    title: '上级单位类型',
                    dataIndex: 'parentCompanyType',
                },
                {
                    title: '关联关系',
                    dataIndex: 'relationType',
                },
                {
                    title: '下级单位名称',
                    dataIndex: 'childCompanyName',
                },
                {
                    title: '下级单位类型',
                    dataIndex: 'childCompanyType',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 250,
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            expand:false,
            searchList:[{
                    title: '单位名称',
                    dataIndex: 'unitName',
                },
                {
                    title: '单位类型',
                    dataIndex: 'unitType',
                },
                {
                    title: '注册时间',
                    dataIndex: 'registerTime',
                }
            ],
            unitName:'',
            unitType:'',
            registerTime:'',
            params:{
                parentCompanyName:'',
                childCompanyName:'',
                relationType:'',
                page:0,
                size:8,
            },
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
            relationList:[],//关联关系
        };
    },
    created(){
        this.getDic()
        findDictList({type:'company_relation'}).then(res=>{
            console.log(res)
			if(res.data.success && res.data.value.length){
				res.data.value.forEach(s=>{
					var obj={}
					obj['value']=s.value
					obj['label']=s.label
					this.relationList.push(obj)
				})
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
        getDic(){
            
        },
        refresh(){
            this.getData()
        },
        getData(){
            findPageList(this.params).then(res=>{
                console.log(res)
                if(res.data.success && res.data.value){
                    res.data.value.content.forEach((s,o)=>{
                        s.key=o
                        this.orgTypeList.forEach(t=>{
                            if(s.parentCompanyType && t.value==s.parentCompanyType){
                                s.parentCompanyType=t.label
                            }
                            if(s.childCompanyType && t.value==s.childCompanyType){
                                s.childCompanyType=t.label
                            }
                        })
                    })
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    this.pagination = pagination;
                    this.dataSource=res.data.value.content
                }else{
                    this.dataSource=[]
                }
            })
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.params.page = 0
                this.pagination.current = 1
                Object.assign(this.params, values)
                this.getData()
            });
        },
        handleAdd() {
            this.$refs.formDialog.showDrawer('', 'add')
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
        onEdit(record){
            console.log(record)
            this.$refs.formDialog.showDrawer(record, 'edit')
        },
        onDelete(record) {
            var that=this
            console.log(record)
            this.$confirm({
                title: '提示',
                content: '确定删除此关联关系？',
                okText:'确定',
                cancelText:'取消',
                onOk() {
                    return new Promise((resolve, reject) => {
                        console.log('删除操作')
                        deleteRelation({id:record.id}).then(res=>{
                            if(res && res.data && res.data.success){
                                that.$message.success('删除成功')
                                that.onChange(1)
                                resolve();
                            }
                        })
                    }).catch(() => console.log('Oops errors!'));
                },
                onCancel() {},
            });
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
.child_unit{
    .table-operations {
        text-align: left;
        margin-bottom: 16px;
    }

    .table-operations > button {
        margin-right: 8px;
    }
}
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