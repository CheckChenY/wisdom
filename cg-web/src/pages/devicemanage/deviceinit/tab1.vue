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
            <template slot="deviceType" slot-scope="text" style="display: flex;">
                {{deviceTypeObj[text]}}
            </template>
            <template slot="deviceModel" slot-scope="text" style="display: flex;">
                {{deviceModelObj[text]}}
            </template>
            <template slot="isMain" slot-scope="text" style="display: flex;">
               {{text===1?'是':'否'}}
            </template>
            <template slot="isLink" slot-scope="text" style="display: flex;">
               {{text===1?'是':'否'}}
            </template>
            <template slot="isActivate" slot-scope="text" style="display: flex;">
               {{text===1?'是':'否'}}
            </template>
            <template slot="isIot" slot-scope="text" style="display: flex;">
               {{text===1?'是':'否'}}
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
import { columns, columnForm } from '@/const/deviceinit/modeldict.js';
import { findByParentList } from "@/api/devicemanage/deviceinit/devicedict"
import { findPageList, insert, update, delDict, findAllApplication } from "@/api/devicemanage/deviceinit/modeldict"
import { findDeviceDict } from '@/api/public'
import { debuglog } from 'util';
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
                pageSize: 7,
                current:1
            },
            loading: false,
            columns: columns,
            columnForm: columnForm,
            searchCol: [
                {
                    title: '设备型号',
                    dataIndex: 'deviceModel',
                    type: 'select',
                    disData: []
                },{
                    title: '所属系统',
                    dataIndex: 'deviceSystem',
                    type: 'select',
                    disData: []
                }
            ],
            form: this.$form.createForm(this),
            params: {
                page:0,
                size:7,
            },
            deviceSystemObj: {},
            deviceTypeObj: {},
            deviceModelObj: {},
            columns2: [],
            columns3: [],
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
            Object.assign(this.params, values)
            this.findPageList()
        },
        handleAdd() {
            this.columnForm[2].disData = []
            this.columnForm[3].disData = []
            this.$refs.formDialog.showDrawer('', 'add', this.columnForm)
        },
        onEdit(record){
            this.columnForm[2].disData = this.columns2.filter(item => item.value === record.deviceType)
            this.columnForm[3].disData = this.columns3.filter(item => item.value === record.deviceModel)
            this.$refs.formDialog.showDrawer(record, 'edit', this.columnForm)
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
            let appSystem = this.columnForm[4].disData.filter(item => item.label == params.appSystemType)
            if (appSystem.length > 0) {
                params.applicationId = appSystem[0].value.split(',')[0]
                params.serviceId = appSystem[0].value.split(',')[1]
            } else {
                params.applicationId = params.appSystemType.split(',')[0]
                params.serviceId = params.appSystemType.split(',')[1]
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
                        this.$message.error('修改失败')
                    }
                })
            }
        },
        getDict () {
            findDeviceDict({type:1}).then(res=>{
                res.data.value.forEach(item => {
                    item.value = item.id.toString()
                    item.label = item.dataDicDesc
                    this.deviceSystemObj[item.id] = item.dataDicDesc
                })
                this.columnForm[1].disData = res.data.value
                this.searchCol[1].disData = res.data.value
            })
            findDeviceDict({type:2}).then(res=>{
                res.data.value.forEach(item => {
                    item.value = item.id.toString()
                    item.label = item.dataDicDesc
                    this.deviceTypeObj[item.id] = item.dataDicDesc
                })
                this.columns2 = res.data.value
            })
            findDeviceDict({type:3}).then(res=>{
                if (!res.data.value) return
                res.data.value.forEach(item => {
                    item.value = item.id.toString()
                    item.label = item.dataDicDesc
                    this.deviceModelObj[item.id] = item.dataDicDesc
                })
                this.columns3 = res.data.value
                this.searchCol[0].disData = res.data.value
            })
            this.columnForm[1].change = (value) => {
                let id = this.columnForm[1].disData.filter(item => item.value === value)[0].id
                findByParentList({parentId:id}).then(res => {
                    res.data.value.forEach(item => {
                        item.value = item.id.toString()
                        item.label = item.dataDicDesc
                    })
                    this.columnForm[2].disData = res.data.value
                })
            }
            this.columnForm[2].change = (value) => {
                let id = this.columnForm[2].disData.filter(item => item.value === value)[0].id
                findByParentList({parentId:id}).then(res => {
                    res.data.value.forEach(item => {
                        item.value = item.id.toString()
                        item.label = item.dataDicDesc
                    })
                    this.columnForm[3].disData = res.data.value
                })
            }

            findAllApplication().then(res => {
                this.columnForm[4].disData = []
                res.data.value.forEach(item => {
                    item.label = item.applyName + "(" + item.service_type + ")"
                    item.value = item.applicationId + "," + item.serviceId
                })
                this.columnForm[4].disData = res.data.value
            })
        },
        findPageList () {
            this.loading = true;
            findPageList(this.params).then(res => {
                if (res && res.data && res.data.success) {
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    res.data.value.content = res.data.value.content?res.data.value.content:[]
                    res.data.value.content.forEach(item => {
                        item.key=item.id
                        item.modelImg = this.$imgUrl + item.modelImg
                        item.appSystemType = item.serviceName
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