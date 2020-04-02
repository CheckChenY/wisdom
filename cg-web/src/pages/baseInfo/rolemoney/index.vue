<template>
    <div class="child_unit">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="功能包名称">
                        <a-input
                        v-decorator="[
                            'packageName',
                            {
                                rules: [
                                    {
                                    required: false,
                                    message: 'Input something!',
                                    },
                                ],
                            },
                    ]"
                    maxLength="40"
                    placeholder="请输入功能包名称"/>
                </a-form-item>
            </a-col>
            <!-- <a-col :span="6">
                    <a-form-item label="功能包价格">
                        <a-input
                        v-decorator="[
                            'packageCode',
                            {
                                rules: [
                                    {
                                    required: false,
                                    message: 'Input something!',
                                    },
                                ],
                            },
                    ]"
                    maxLength="10"
                    placeholder="请输入功能包价格"/>
                </a-form-item>
            </a-col> -->
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
        :pagination="pagination" 
        :dataSource="dataSource" 
        :columns="columns" 
        :rowClassName="rowClassName"
        :loading="loading" style="margin-top:16px;">
        <template slot="operation" slot-scope="text, record">
            <div class="editable-row-operations">
                <a-button @click="() => onView(record)" type="text" style="margin-right: 5px;">查看</a-button>
                <a-button @click="() => onEdit(record)" type="primary" style="margin-right: 5px;">编辑</a-button>
                <a-button @click="() => onSet(record)" type="primary" style="margin-right: 5px;">配置菜单</a-button>
                <a-button @click="() => onDelete(record)" type="danger" style="margin-right: 5px;">删除</a-button>
                <!-- <a-button @click="() => showModal(record)" type="danger" style="margin-right: 5px;">付费功能包</a-button>
                <a-button @click="() => onDelete(record)" type="danger">启用/禁用</a-button> -->
            </div>
        </template>
    </a-table>
    <formDialog ref="formDialog" @result="refresh"></formDialog>
    <roleMonDialog ref="roleMonDialog" :packageName="packageName" :packageCode="packageCode"></roleMonDialog>
</div>
</template>

<script>
import formDialog from './formDialog.vue';
import { search } from '@/components/unitmanage/unitmanage';
import { findPageList,deletePackage } from '@/api/rolemoney'
import roleMonDialog from './roleMonDialog.vue';
import { mapGetters } from "vuex";
export default {
    components: {
        formDialog,
        roleMonDialog
    },
    data() {
        return {
            dataSource: [],
            columns: [
                {
                    title: '序号',
                    align:'center',
                    dataIndex: 'id',
                    key:'id',
                },
                {
                    title: '功能包名称',
                    align:'center',
                    dataIndex: 'packageName',
                    key:'packageName',
                },
                {
                    title: '功能包编码',
                    align:'center',
                    dataIndex: 'packageCode',
                    key:'packageCode',
                },
                {
                    title: '功能包价格',
                    dataIndex: 'packagePrice',
                    key:'packagePrice',
                },
                {
                    title: '授权期限',
                    dataIndex: 'authPeriod',
                    key:'authPeriod',
                },
                {
                    title: '操作',
                    // dataIndex: 'operation',
                    width: 360,
                    key:'operation',
                    scopedSlots: { customRender: 'operation' },
                    status:false
                },
            ],
            loading:false,
            //查询
            name:'',
            nub:'',
            type:'',
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                size:10,
                packageName:null,
                packageCode:null,
            },
            visible: false,
            treeData:[],
            packageName:'',
            packageCode:'',
            pagination: {
                onChange: this.onChange,
                pageSize:10,
                current: 1
            },
        };
    },
    created(){
        this.getData()
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    methods:{
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        },
        refresh(){
            this.getData()
        },
        getData(){
            findPageList(this.params).then(res=>{
                if(res && res.data && res.data.success){
                    this.dataSource=res.data.value.content
                    if(res.data.value.content.length){
                        res.data.value.content.forEach(s=>{
                            s.key=s.id
                        })
                    }
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    pagination.pageSize = res.data.value.size;
                    this.dataSource=res.data.value.content
                    this.pagination = pagination;
                }
            })
        },
        handleReset() {
            this.form.resetFields();
        },
        handleSearch(e) {
            e.preventDefault();
            this.params.page = 0
            this.pagination.current = 1
            this.form.validateFields((error, values) => {
                console.log(values);
                this.params.packageName=values.packageName?values.packageName:null
                this.params.packageCode=values.packageCode?values.packageCode:null
                this.getData()
            });
        },
        onDelete(record) {
            var that=this
            // const dataSource = [...this.dataSource];
            // this.dataSource = dataSource.filter(item => item.key !== key);
            this.$confirm({
                title: '提示?',
                content: '确定删除该功能包?',
                cancelText:'取消',
                okText:'确定',
                onOk() {
                    return new Promise((resolve, reject) => {
                        deletePackage({id:record.id.toString()}).then(res=>{
                            if(res && res.data && res.data.success){
                                that.$message.success('删除成功')
                                that.getData()
                                resolve()
                            }else{
                                that.$message.error(res.data.errorMsg)
                                that.getData()
                                resolve()
                            }
                        })
                    }).catch(() => console.log('Oops errors!'));
                },
                onCancel() {},
            });
        },
        handleAdd() {
            this.$refs.formDialog.showDrawer('', 'add')
        },
        onView(record) {
            this.$refs.formDialog.showDrawer(record, 'view')
        },
        onEdit (record) {
            this.$refs.formDialog.showDrawer(record, 'edit')
        },
        onSet(record){
            this.$refs.roleMonDialog.showDrawer(record)
            this.packageCode=record.packageCode
            this.packageName=record.packageName
        },
        //付费功能包
        // showModal(record) {
        //     this.$refs.moneymodal.showDrawer(record, 'money')
        // },
        handleOk(e) {
            console.log(e);
            this.visible = false;
        },
        rowClassName (record) {
            let className = '';
            if (this.rowLight == record.id) {
                className = 'light-row';
            }
            return className;
        }
    }
    
}
</script>
<style lang='scss'>
// .child_unit{
//     .table-operations {
//         text-align: left;
//         margin-bottom: 16px;
//     }

//     .table-operations > button {
//         margin-right: 8px;
//     }
// }
    .item_list{
        margin: 20px;
        text-align: right;
        .item_list_left{
            text-align: right
        }
    }
    .modalStyle{
        widows: 720px;
    }
</style>