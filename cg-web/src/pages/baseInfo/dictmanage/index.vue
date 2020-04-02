<template>
    <div class="child_unit">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="字典类型">
                        <a-input
                        v-decorator="[
                            'type',
                            {
                                rules: [
                                    {
                                    required: false,
                                    message: 'Input something!',
                                    },
                                ],
                            },
                    ]"
                    maxLength="100"
                    placeholder="请输入字典类型"/>
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
    <a-table :pagination="false" size="middle" 
        bordered 
        :dataSource="dataSource" 
        :columns="columns" 
        :rowClassName="rowClassName"
        :loading="loading" style="margin-top:16px;">
        <template slot="operation" slot-scope="text, record">
            <div class="editable-row-operations">
                <a-button @click="() => onEdit(record)" type="primary" style="margin-right: 5px;">编辑</a-button>
                <a-button @click="() => onDelete(record)" type="danger" style="margin-right: 5px;">删除</a-button>
                <!-- <a-button @click="() => showModal(record)" type="danger" style="margin-right: 5px;">付费功能包</a-button>
                <a-button @click="() => onDelete(record)" type="danger">启用/禁用</a-button> -->
            </div>
        </template>
    </a-table>
    <a-pagination
        style="float: right;margin:20px 0;"
        :pageSizeOptions="pageSizeOptions"
        :total="page.total"
        showSizeChanger
        :pageSize="page.pageSize"
        v-model="page.current"
        @showSizeChange="onShowSizeChange"
        @change="currentChange"
    >
        <template slot="buildOptionText" slot-scope="props">
            <span>{{props.value}}条/页</span>
        </template>
    </a-pagination>
    <formDialog ref="formDialog" @result="refresh"></formDialog>
</div>
</template>

<script>
import formDialog from './formDialog.vue';
import { search } from '@/components/unitmanage/unitmanage';
import { findPageList,dictDelete } from '@/api/dict'
import { mapGetters } from "vuex";
export default {
    components: {
        formDialog,
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
                    title: '数据值',
                    align:'center',
                    dataIndex: 'value',
                    key:'value',
                },
                {
                    title: '标签名',
                    align:'center',
                    dataIndex: 'label',
                    key:'label',
                },
                {
                    title: '父级',
                    align:'center',
                    dataIndex: 'parentId',
                    key:'parentId',
                },
                {
                    title: '级别',
                    align:'center',
                    dataIndex: 'level',
                    key:'level',
                },
                {
                    title: '类型',
                    dataIndex: 'type',
                    key:'type',
                },
                {
                    title: '操作',
                    // dataIndex: 'operation',
                    width: 200,
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
            visible: false,
            treeData:[],
            packageName:'',
            pageSizeOptions: ['5', '10', '15', '20', '50'],
            page:{
                current: 0,
                pageSize: 10,
                total: 0,
            },
            params:{
                page:0,
                size:10,
                type:null
            }
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
        currentChange(num){
            console.log(num-1)
            this.params.page=num-1
            this.getData()
        },
        onShowSizeChange(current, pageSize) {
            console.log(pageSize)
            this.params.page=current-1
            this.params.size=pageSize
            this.page.pageSize=pageSize
            this.getData()
        },
        refresh(){
            this.getData()
        },
        getData(){
            this.loading=true
            findPageList(this.params).then(res=>{
                if(res && res.data && res.data.success){
                    this.loading=false
                    this.dataSource=res.data.value.content
                    this.page.total=res.data.value.totalElements
                    this.page.current=res.data.value.number+1
                    if(res.data.value.content.length){
                        res.data.value.content.forEach(s=>{
                            s.key=s.id
                        })
                    }
                }
            })
        },
        handleReset() {
            this.params.type=null
            this.params.page=0
            this.form.resetFields();
        },
        handleSearch(e) {
            e.preventDefault();
            this.params.page = 0
            this.page.current = 1
            this.form.validateFields((error, values) => {
                console.log(values);
                this.params.type=values.type?values.type:null
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
                        dictDelete({param:record.id.toString()}).then(res=>{
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