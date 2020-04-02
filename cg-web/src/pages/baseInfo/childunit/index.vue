<template>
  <div class="child_unit">
    <div class="table-operations">
      <a-button type="primary" @click="handleAdd">添加</a-button>
    </div>
    <a-table bordered :dataSource="dataSource" 
        :columns="columns"
        :rowClassName="rowClassName"
        :pagination="pagination"
        >
        <template slot="operation" slot-scope="text, record">
            <div class="editable-row-operations">
                <a-button type="primary" @click="() => onEdit(record)" style="margin-right:10px;">修改</a-button>
                <a-popconfirm title="确定删除?" okText="确定" cancelText="取消" @confirm="() => onDelete(record)">
                    <a-button type="danger">删除</a-button>
                </a-popconfirm>
            </div>
        </template>
    </a-table>
    <formDialog @onrefs='onRecive' ref="formDialog"></formDialog>
  </div>
</template>
<script>
import { tableList,fandRole,deletUser } from '@/api/childunit/unit'
// import formDialog from '@/components/base/formDialog.vue';
import formDialog from './formDialog';
import { mapGetters } from "vuex";
export default {
    components: {
        formDialog
    },
    data() {
        return {
            params:{
                page:0,
                pageSize: 12,
                userType :2,
            },
            dataSource: [],
            pagination: {
                onChange: this.onPageChange,
                pageSize: 12,
                current:1
            },
            count: 2,
            columns: [
                {
                    title: '编号',
                    dataIndex: 'id',
                    display: true,
                },
                {
                    title: '账号',
                    dataIndex: 'userName',
                },
                {
                    title: '用户名',
                    dataIndex: 'realName',
                },
                {
                    title: '角色',
                    dataIndex: 'description',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: '12%',
                    scopedSlots: { customRender: 'operation' },
                },
            ],
        };
    },
    created(){
        this.dataList();
    },
    mounted(){
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    methods: {
        onRecive(){
            this.dataList();
        },
        dataList(){
            tableList(this.params).then(res=>{
                this.dataSource = []
                if(res && res.data && res.data.success){
                    let data = res.data.value.records;
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.total;
                    this.pagination = pagination;
                    data.forEach(item=>{
                        let rol = item.jtlRoles;
                        item.jtlUser.description = rol[0].roleName;
                        item.jtlUser.roleCode = rol[0].roleCode;
                        this.dataSource.push(item.jtlUser) 
                    })
                }
            })
        },
        onCellChange(key, dataIndex, value) {
            const dataSource = [...this.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.dataSource = dataSource;
            }
        },
        onDelete(key) {
            deletUser(key.id).then(res=>{
                if(res && res.data && res.data.success){
                    this.$message.success('删除成功')
                    this.dataList();
                }else{
                    this.$message.error(res.data.errorMsg)
                }
            })
        },
        handleAdd() {
            this.$refs.formDialog.showDrawer('', 'add', this.columns)
        },
        onEdit (record) {
            this.$refs.formDialog.showDrawer(record, 'edit', this.columns)
        },
        onPageChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.dataList()
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
</style>