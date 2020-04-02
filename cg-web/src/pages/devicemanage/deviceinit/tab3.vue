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
            <template slot="isMain" slot-scope="text" style="display: flex;">
               {{text===0?'是':'否'}}
            </template>
            <template slot="isLink" slot-scope="text" style="display: flex;">
               {{text===0?'是':'否'}}
            </template>
            <template slot="isActivate" slot-scope="text" style="display: flex;">
               {{text===0?'是':'否'}}
            </template>
            <template slot="isIot" slot-scope="text" style="display: flex;">
               {{text===0?'是':'否'}}
            </template>
            <template slot="modelImg" slot-scope="text, record" style="display: flex;">
               <div class="editable-row-operations">
                    <img style="height:60px;max-width:100px;" :src='record.modelImg'/>
                </div>
            </template>
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
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
import { columns } from '@/const/deviceinit/statedict.js';
import { findLicense } from "@/api/public"
import { findPageList, insert, update, delDict } from "@/api/devicemanage/deviceinit/statedict"
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
            columns: columns,
            searchCol: [
                {
                    title: '设备状态',
                    dataIndex: 'stateDicDesc',
                },{
                    title: '协议号',
                    dataIndex: 'licence',
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
        this.findPageList()
    },
    mounted () {
        this.getDict()
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
            values.licence = values.licence?values.licence.replace(',', ''):null
            Object.assign(this.params, values)
            this.findPageList()
        },
        handleAdd() {
            this.$refs.formDialog.showDrawer('', 'add', this.columns)
        },
        onEdit(record){
            this.$refs.formDialog.showDrawer(record, 'edit', this.columns)
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
            params.stateDicCode = parseInt(params.stateDicCode, 16)
            if (params.stateDicCodeTen) {
                params.stateDicCode = params.stateDicCodeTen
            }
            params.licence = params.licence.replace(',', '')
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
        getDict () {
            findLicense({}).then(res=>{
                if (res && res.data && res.data.success) {
                    let arr = []
                    res.data.value.forEach(item => {
                        let obj = {}
                        obj.value = item + ","
                        obj.label = item
                        arr.push(obj)
                    })
                    this.columns[4].disData = arr
                    this.searchCol[1].disData = arr
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
                        item.stateDicCodeTen = item.stateDicCode
                        item.stateDicCode = item.stateDicCode?parseInt(item.stateDicCode).toString(16):''
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