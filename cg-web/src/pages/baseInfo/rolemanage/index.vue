<template>
    <div class="role_manage">
        <div class="table-operations">
        <a-button type="primary" @click="handleAdd">添加角色</a-button>
        </div>
        <a-table bordered :dataSource="dataSource" 
            :columns="columns"
            :rowClassName="rowClassName"
            :pagination="pagination">
            <template slot="roleName" slot-scope="text, record">
                <span v-if="record.roleCode.indexOf('_ROOT')!=-1">{{record.roleName}}</span>
                <editable-cell v-if="record.roleCode.indexOf('_ROOT')==-1" :text="text" @change="onCellChange(record.key, 'roleName', $event)" />
            </template>
            <template slot="description" slot-scope="text, record">
                <span v-if="record.roleCode.indexOf('_ROOT')!=-1">{{record.description}}</span>
                <editable-cell v-if="record.roleCode.indexOf('_ROOT')==-1" :text="text" @change="onCellChange(record.key, 'description', $event)" />
            </template>
            <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                    <a-button @click="() => onSave(record)" v-if="!(!isAdmin && record.roleCode.indexOf('_ROOT')!=-1)" type="primary" style="margin-right:10px;">保存</a-button>
                    <!-- <a @click="() => onCancel(record)" v-if="!(!isAdmin && record.roleCode.indexOf('_ROOT')!=-1)">取消</a> -->
                    <a-popconfirm title="确定删除?" okText="确定" cancelText="取消" @confirm="() => onDelete(record)" v-if="!(!isAdmin && record.roleCode.indexOf('_ROOT')!=-1)">
                        <a-button type="danger">删除</a-button>
                    </a-popconfirm>
                    <a-button @click="() => openPermission(record)" v-if="!(!isAdmin && record.roleCode.indexOf('_ROOT')!=-1)" type="primary" style="margin-left:10px;">权限</a-button>
                </div>
            </template>
        </a-table>
        <role-dialog ref="roleDialog"></role-dialog>
    </div>
</template>
<script>
import EditableCell from '@/components/EditableCell';
import roleDialog from './roleDialog.vue';
import { findPageListAndIsAdmin, insert, update, deleteRole, findByRoleCode } from '@/api/role'
import { mapGetters } from "vuex";
export default {
    components: {
        EditableCell,
        roleDialog
    },
    data() {
        return {
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize: 8,
                current:1
            },
            count: 2,
            columns: [
                {
                    title: '角色名称',
                    dataIndex: 'roleName',
                    width: '28%',
                    scopedSlots: { customRender: 'roleName' },
                },
                {
                    title: '角色描述',
                    dataIndex: 'description',
                    width: '28%',
                    scopedSlots: { customRender: 'description' },
                },
                {
                    title: '编辑时间',
                    dataIndex: 'updateTime',
                    width: '28%',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            saveSatus: '',
            params: {
                page:0,
                size:8,
            },
            isAdmin:false
        };
    },
    created () {
        this.findPageList()
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    methods: {
        onCellChange(key, dataIndex, value) {
            const dataSource = [...this.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.dataSource = dataSource;
            }
        },
        onDelete(record) {
            deleteRole(record.id).then(res => {
                if (res && res.data && res.data.success) {
                    this.$message.success('删除成功')
                    this.findPageList()
                } else {
                    this.$message.error('删除失败')
                }
            })
        },
        handleAdd() {
            const { count, dataSource } = this;
            const newData = {
                key: count,
                roleName: `角色`,
                roleCode: ``,
                description: `角色描述`,
            };
            this.dataSource = [...dataSource, newData];
            this.count = count + 1;
            insert(newData).then(res => {
                if (res && res.data && res.data.success) {
                    this.$message.success('添加成功')
                    this.findPageList()
                } else {
                    this.$message.error(res.data.errorMsg)
                }
            })
            console.log(this.dataSource)
            // this.findPageList()
        },
        onCancel(record){
            this.findPageList()
        },
        onSave (record) {
            console.log(record)
            if (this.saveSatus === 'add') {
                insert(record).then(res => {
                    if (res && res.data && res.data.success) {
                        this.$message.success('添加成功')
                        this.findPageList()
                    } else {
                        this.$message.error(res.data.errorMsg)
                    }
                })
            } else {
                update(record).then(res => {
                    if (res && res.data && res.data.success) {
                        this.$message.success('保存成功')
                        this.findPageList()
                    } else {
                        this.$message.error(res.data.errorMsg)
                    }
                })
            }
            this.saveSatus = ''
        },
        openPermission (record) {
            this.findByRoleCode(record.roleCode).then(arr => {
                let roleIds = []
                if (arr) {
                    arr.forEach(item => {
                        roleIds.push(item.id + item.createTime)
                    })
                }
                this.$refs.roleDialog.showDrawer(record, roleIds)
            })
        },
        findPageList (params) {
            this.loading = true;
            findPageListAndIsAdmin(this.params).then(res => {
                console.log(res)
                if (res && res.data && res.data.success) {
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.roles.totalElements;
                    if(res.data.value.roles.content.length){
                        res.data.value.roles.content.forEach(s=>{
                            s.key=s.id
                        })
                    }
                    this.isAdmin = res.data.value.isAdmin;
                    this.dataSource = res.data.value.roles.content;
                    this.pagination = pagination;
                }
                this.loading = false;
            })
        },
        findByRoleCode (roleCode) {
            return findByRoleCode({roleCode}).then(res => {
                if (res && res.data && res.data.success) {
                    return res.data.value
                }
                return []
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
.role_manage{
    .table-operations {
        text-align: left;
        margin-bottom: 16px;
    }

    .table-operations > button {
        margin-right: 8px;
    }
}
</style>