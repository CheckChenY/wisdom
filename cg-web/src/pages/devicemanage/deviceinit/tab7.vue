<template>
    <div class="child_unit">
        <formSearch :columns="searchCol" @search="handleSearch"></formSearch>
        <div class="table-operations">
            <a-button type="primary" @click="handleAdd">添加</a-button>
        </div>
        <a-table bordered 
            :dataSource="dataSource" 
            :pagination="pagination"
            ref="table"
            :rowClassName="rowClassName"
            :loading="loading"
            :columns="columns">
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
                    <a-button @click="() => onEdit(record)" style="margin-right: 10px;">编辑</a-button>
                    <a-popconfirm title="确定删除?" okText="确定" cancelText="取消" @confirm="() => onDelete(record)">
                        <a-button type="danger">删除</a-button>
                    </a-popconfirm>
                    <a-button @click="() => onSet(record)" style="margin-left: 10px;">配置服务</a-button>
                </div>
            </template>
        </a-table>
        <vendorDialog ref="vendorDialog" @submit="submit"></vendorDialog>
        <vendorsetDialog ref="vendorsetDialog"></vendorsetDialog>
    </div>
</template>
<script>
import vendorDialog from './vendorDialog.vue';
import formSearch from '@/components/base/formSearch.vue';
import vendorsetDialog from './vendorsetDialog.vue';
import { columns, columnsForm } from '@/const/deviceinit/vendordict.js';
import { findDictList } from "@/api/public"
import { findPageList, insert, update, delDict, findPrefix, findDeviceModel } from "@/api/devicemanage/deviceinit/vendordict.js"
import { mapGetters } from "vuex";
export default {
    components: {
        vendorDialog,
        formSearch,
        vendorsetDialog
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
            columns: columns,
            searchCol: [
                {
                    title: '厂商名称',
                    dataIndex: 'companyName',
                } 
            ],
            form: this.$form.createForm(this),
            params: {
                page: 0,
                size: 8
            }
        };
    },
    created(){
        this.findPageList()
        this.findDeviceModel()
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    methods: {
        handleSearch(values) {
            this.params.page = 0
            this.pagination.current = 1
            Object.assign(this.params, values)
            this.findPageList()
        },
        handleAdd() {
            this.$refs.vendorDialog.showDrawer('', 'add', columnsForm)
        },
        onEdit(record){
            this.$refs.vendorDialog.showDrawer(record, 'edit', columnsForm)
        },
        onSet(record){
            this.$refs.vendorsetDialog.showDrawer(record)
        },
        onDelete(record) {
            delDict({id:record.id}).then(res => {
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
                insert(params).then(res => {
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
        findDeviceModel () {
            findDeviceModel().then(res=>{
                if (res && res.data && res.data.success) {
                    res.data.value.forEach(item => {
                        item.label = item.model
                        item.value = item.deviceModel
                    })
                    columnsForm[0].children[1].disData = res.data.value
                }
            })
            columnsForm[0].children[1].change = (value) => {
                this.findPrefix(value)
            }
        },
        findPrefix (deviceModel) {
            findPrefix({deviceModel:deviceModel}).then(res=>{
                if (res && res.data && res.data.success) {
                    this.$refs.vendorDialog.setPreSuf(res.data.value)
                }
            })
        },
        findPageList () {
            this.loading = true;
            findPageList(this.params).then(res => {
                if (res && res.data && res.data.success) {
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    res.data.value.content.forEach(item => {
                        item.modelImg = this.$imgUrl + item.modelImg
                    })
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