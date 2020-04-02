<template>
    <div class="child_unit">
        <formSearch :columns="searchCol" @search="handleSearch"></formSearch>
        <div class="table-operations">
            <a-button type="primary" @click="handleAdd">添加</a-button>
        </div>
        <a-table bordered 
            :dataSource="dataSource" 
            :pagination="pagination"
            :loading="loading"
            :rowClassName="rowClassName"
            :columns="columns">
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
                    <a-button @click="() => onView(record)" type="primary" style="margin-right: 10px;">查看</a-button>
                    <a-button @click="() => onEdit(record)" style="margin-right: 10px;">编辑</a-button>
                    <a-popconfirm title="确定删除?" okText="确定" cancelText="取消" @confirm="() => onDelete(record)">
                        <a-button type="danger">删除</a-button>
                    </a-popconfirm>
                </div>
            </template>
        </a-table>
        <formDialog ref="formDialog" @submit="submit"></formDialog>
    </div>
</template>
<script>
import formDialog from '@/components/base/formDialog.vue';
import formSearch from '@/components/base/formSearch.vue';
import { findDictList } from "@/api/public"
import { findPageList, insert, update, deleteBuilding } from "@/api/building"
import { mapGetters } from "vuex";
export default {
    components: {
        formDialog,
        formSearch
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
                    disabled:false,
                },
                {
                    title: '建筑编码',
                    dataIndex: 'buildingCode',
                    rules:[
                        {
                        required: true,
                        message: '请输入建筑编码!',
                        },
                    ],
                    disabled:false,
                },
                {
                    title: '使用性质',
                    dataIndex: 'usageNature',
                    type: 'select',
                    disData: [],
                    rules:[
                        {
                        required: true,
                        message: '请选择使用性质!',
                        },
                    ],
                    disabled:false,
                },
                {
                    title: '建筑结构类型',
                    dataIndex: 'structure',
                    type: 'select',
                    disData: [],
                    rules:[
                        {
                        required: true,
                        message: '请选择建筑结构类型!',
                        },
                    ],
                    disabled:false,
                },
                {
                    title: '占地面积(m²)',
                    dataIndex: 'areaCovered',
                    rules:[
                        {
                        required: true,
                        message: '请输入占地面积!',
                        },
                    ],
                    type: 'number',
                    disabled:false,
                },
                {
                    title: '建筑高度(m)',
                    dataIndex: 'height',
                    rules:[
                        {
                        required: true,
                        message: '请输入建筑高度!',
                        },
                    ],
                    type: 'number',
                    disabled:false,
                },
                {
                    title: '建筑层数',
                    dataIndex: 'floor',
                    rules:[
                        {
                        required: true,
                        message: '请输入建筑层数!',
                        },
                    ],
                    type: 'number',
                    disabled:false,
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 250,
                    scopedSlots: { customRender: 'operation' },
                    disabled:false,
                },
            ],
            searchCol: [
                {
                    title: '建筑编码',
                    dataIndex: 'buildingCode',
                },
                {
                    title: '使用性质',
                    dataIndex: 'usageNature',
                    type: 'select',
                    disData: []
                },
                {
                    title: '建筑结构类型',
                    dataIndex: 'structure',
                    type: 'select',
                    disData: []
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
        this.getDict()
        this.findPageList()
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
            this.$refs.formDialog.showDrawer('', 'add', this.columns)
        },
        onView(record) {
            this.$refs.formDialog.showDrawer(record, 'view', this.columns)
        },
        onEdit(record){
            this.$refs.formDialog.showDrawer(record, 'edit', this.columns)
        },
        onDelete(record) {
            deleteBuilding({id:record.id}).then(res => {
                if (res && res.data && res.data.success) {
                    this.$message.success('删除成功')
                    this.findPageList()
                } else {
                    this.$message.error('删除失败')
                }
            })
        },
        submit(params, handle) {
            let usageNature = this.columns[2].disData.filter(item => item.value == params.usageNature)
            if (usageNature.length > 0) {
                params.usageNature = usageNature[0].label
            }
            let structure = this.columns[3].disData.filter(item => item.value == params.structure)
            if (structure.length > 0) {
                params.structure = structure[0].label
            }
            if (handle === 'add') {
                insert(params).then(res => {
                    if (res && res.data && res.data.success) {
                        this.$message.success('添加成功')
                        this.findPageList()
                    } else {
                        this.$message.error(res.data.errorMsg)
                    }
                })
            } else if (handle === 'edit') {
                update(params).then(res => {
                    if (res && res.data && res.data.success) {
                        this.$message.success('修改成功')
                        this.findPageList()
                    } else {
                        this.$message.error(res.data.errorMsg)
                    }
                })
            }
        },
        getDict () {
            findDictList({type:'building_usageNature'}).then(res=>{
                if (res && res.data && res.data.success) {
                    this.columns[2].disData = res.data.value
                    console.log("building_usageNature",res.data.value)
                    this.searchCol[1].disData = []
                    res.data.value.forEach(item => {
                        let obj = {
                            value: item.label,
                            label: item.label
                        }
                        this.searchCol[1].disData.push(obj)
                    });
                }
            })
            findDictList({type:'building_structure'}).then(res=>{
                if (res && res.data && res.data.success) {
                    this.columns[3].disData = res.data.value
                    console.log("building_structure",res.data.value)
                    this.searchCol[2].disData = []
                    res.data.value.forEach(item => {
                        let obj = {
                            value: item.label,
                            label: item.label
                        }
                        this.searchCol[2].disData.push(obj)
                    });
                    // this.searchCol[2].disData = res.data.value
                }
            })
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