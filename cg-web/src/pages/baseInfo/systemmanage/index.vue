<template>
  <div class="child_unit">
    <div class="table-operations">
      <a-button type="primary" @click="handleAdd">添加</a-button>
    </div>
    <a-table bordered :dataSource="dataSource" 
        :columns="columns"
        :rowClassName="rowClassName"
        :pagination="pagination">
        <template slot="operation" slot-scope="text, record">
            <div class="editable-row-operations">
                <a @click="() => onView(record)">查看</a>
                <a @click="() => onEdit(record)">修改</a>
                <a-popconfirm title="确定删除?" okText="确定" cancelText="取消" @confirm="() => onDelete(record)">
                    <a>删除</a>
                </a-popconfirm>
            </div>
        </template>
    </a-table>
    <formDialog ref="formDialog" @submit="submit"></formDialog>
  </div>
</template>
<script>
import formDialog from '@/components/base/formDialog.vue';
import { findPageList, findById, save, update, deleteSystem} from '@/api/systemmanage'
import { mapGetters } from "vuex";
export default {
    components: {
        formDialog,
    },
    data() {
        return {
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize: 8,
                current:1
            },
            loading: false,
            columns: [
                {
                    title: '序号',
                    dataIndex: 'id',
                    display: true,
                },
                {
                    title: '系统名称',
                    dataIndex: 'systemName',
                },
                {
                    title: '系统路径',
                    dataIndex: 'systemPath',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 250,
                    scopedSlots: { customRender: 'operation' },
                }
            ],
            form: this.$form.createForm(this),
            params: {
                page:0,
                size:8,
            }
        };
    },
    created(){
        this.findPageList()
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    methods: {
        handleAdd() {
            this.$refs.formDialog.showDrawer('', 'add', this.columns)
        },
        onView(record) {
            console.log(record)
            this.$refs.formDialog.showDrawer(record, 'view', this.columns)
        },
        onEdit(record){
            console.log(record)
            this.$refs.formDialog.showDrawer(record, 'edit', this.columns)
        },
        onDelete(record) {
            deleteSystem(record.id).then(res => {
                if (res && res.data && res.data.success) {
                    this.$message.success('删除成功')
                    this.findPageList()
                } else {
                    this.$message.error('删除失败')
                }
            })
        },
        submit(params, handle) {
            if (handle === 'add') {
                save(params).then(res => {
                    if (res && res.data && res.data.success) {
                        this.$message.success('添加成功')
                        this.findPageList()
                    } else {
                        this.$message.error('添加失败')
                    }
                })
            } else if (handle === 'edit') {
                update(params).then(res => {
                    if (res && res.data && res.data.success) {
                        this.$message.success('修改成功')
                        this.findPageList()
                    } else {
                        this.$message.error('修改失败')
                    }
                })
            }
        },
        findPageList () {
            this.loading = true;
            findPageList(this.params).then(res => {
                if (res && res.data && res.data.success) {
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    this.dataSource = res.data.value.content;
                    this.pagination = pagination;
                }
                this.loading = false;
            })
        },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.findPageList()
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