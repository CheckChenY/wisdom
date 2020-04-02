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
            <template slot="type" slot-scope="text, record" style="display: flex;">
                {{typeObj[record.type]}}
            </template>
            <template slot="parentId" slot-scope="text, record" style="display: flex;">
                {{parentObj[record.parentId]}}
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
        <deviceDialog ref="deviceDialog" @submit="submit"></deviceDialog>
    </div>
</template>
<script>
import deviceDialog from './deviceDialog.vue';
import formSearch from '@/components/base/formSearch.vue';
import { columns } from '@/const/deviceinit/devicedict.js';
import { findPageList, insert, update, delDict, findById } from "@/api/devicemanage/deviceinit/devicedict"
import { findDeviceDict } from '@/api/public'
import { mapGetters } from "vuex";
export default {
    components: {
        deviceDialog,
        formSearch
    },
    data() {
        return {
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                total: 0,
                pageSize: 8,
            },
            loading: false,
            columns: columns,
            form: this.$form.createForm(this),
            params: {
                page: 0,
                size: 8
            },
            parentObj: {
                0:'无',
            },
            typeObj: {
                1:'设备系统',
                2:'设备类型',
                3:'设备型号',
            },
            searchCol: [
                {
                    title: '数据名称',
                    dataIndex: 'dataDicDesc',
                }
            ],
        };
    },
    created(){
        this.findPageList()
        this.getDict()
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    methods: {
        handleAdd() {
            this.columns[4].disData = []
            this.$refs.deviceDialog.showDrawer('', 'add', this.columns)
        },
        onEdit(record){
            this.typeChange(record.type)
            this.$refs.deviceDialog.showDrawer(record, 'edit', this.columns)
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
            params.type = params.type === '无'?0:params.type
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
            this.columns[1].change = this.typeChange
            this.searchCol[0].disData = []
            findDeviceDict({type:1}).then(res => {
                return res.data.value
            }).then(res => {
                res.forEach(item => {
                    let obj = {
                        value: item.id,
                        label: item.dataDicDesc
                    }
                    this.searchCol[0].disData.push(obj)
                })
                findDeviceDict({type:2}).then(result => {
                    let array = res.concat(result.data.value)
                    for (let i = 0, len = array.length; i < len; i++){
                        this.parentObj[array[i].id] = array[i].dataDicDesc
                    }
                })
            })
        },
        typeChange (value) {
            this.columns[4].disData = [{
                value: 0,
                label: '无'
            }]
            if (value === 1) return
            this.columns[4].disData = []
            findDeviceDict({type:value-1}).then(res => {
                res.data.value.forEach(item => {
                    item.value = item.id
                    item.label = item.dataDicDesc
                })
                this.columns[4].disData = res.data.value
            })
        },
        findPageList () {
            this.loading = true;
            let _this = this
            findPageList(_this.params).then(res => {
                if (res && res.data && res.data.success) {
                    const pagination = { ..._this.pagination };
                    pagination.total = res.data.value.totalElements;
                    res.data.value.content.forEach(item => {
                        item.modelImg = this.$imgUrl + item.modelImg
                    })
                    _this.dataSource = res.data.value.content;
                    _this.pagination = pagination;
                }
                _this.loading = false;
            })
        },
        findById (id){
            return findById({id:id}).then(res => {
                if (res && res.data && res.data.success) {
                    return res.data.value.dataDicDesc
                }
                return ''
            })
        },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.findPageList()
        },
        handleSearch(values) {
            this.params.page = 0
            this.pagination.current = 1
            Object.assign(this.params, values)
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