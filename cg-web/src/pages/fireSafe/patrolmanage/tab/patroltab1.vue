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
import { savePoint,findPatrolPointPageList,safePatrolPointDelete,updatePoint,findPatrolCard  } from "@/api/patrol/patrol"
import { findPageList,findByBuildCode } from "@/api/floor"
import { findBuildPageList } from "@/api/building"
import { mapGetters } from "vuex";
import { dict } from '@/const/dict'

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
                },
                {
                    title: '巡查点名称',
                    dataIndex: 'patrolPointName',
                },
                {
                    title: '巡查点类型',
                    dataIndex: 'patrolPointTypeName',
                },
                {
                    title: '巡查卡编码',
                    dataIndex: 'cardCode',
                },
                {
                    title: '所在建筑',
                    dataIndex: 'build',
                },
                {
                    title: '所在楼层/区域',
                    dataIndex: 'floor',
                },
                {
                    title: '所在位置',
                    dataIndex: 'location',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 250,
                    scopedSlots: { customRender: 'operation' },
                    disabled:false,
                },
            ],
            columnsFormDialog: [
                {
                    title: '序号',
                    dataIndex: 'id',
                    display: true,
                    disabled:false,
                },
                {
                    title: '巡查点名称',
                    dataIndex: 'patrolPointName',
                    rules:[
                        {
                        required: true,
                        message: '巡查点名称!',
                        },
                    ],
                    disabled:false,
                },
                {
                    title: '巡查点类型',
                    dataIndex: 'patrolPointType',
                    type: 'select',
                    disData: [],
                    rules:[
                        {
                        required: true,
                        message: '巡查点类型!',
                        },
                    ],
                    disabled:false,
                },
                {
                    title: '巡查卡编码',
                    dataIndex: 'cardCode',
                    rules:[
                        {
                        required: true,
                        message: '巡查卡编码!',
                        },
                    ],
                    disabled:false,
                },
                {
                    title: '所在建筑',
                    dataIndex: 'buildingId',
                    type: 'select',
                    disData: [],
                    rules:[
                        {
                        required: true,
                        message: '所在建筑!',
                        },
                    ],
                    disabled:false,
                },
                {
                    title: '所在楼层/区域',
                    dataIndex: 'floorId',
                    type: 'select',
                    disData: [],
                    rules:[
                        {
                        required: true,
                        message: '所在楼层/区域!',
                        },
                    ],
                    disabled:false,
                },
                {
                    title: '所在位置',
                    dataIndex: 'location',
                    rules:[
                        {
                        required: true,
                        message: '所在位置!',
                        },
                    ],
                    disabled:false,
                },
            ],
            searchCol: [
                {
                    title: '巡查卡编码',
                    dataIndex: 'cardCode',
                },
                {
                    title: '巡查点类型',
                    dataIndex: 'patrolPointType',
                    type: 'select',
                    disData: []
                },
            ],
            form: this.$form.createForm(this),
            params: {
                page:0,
                size:8,
            },
            floorList:[],
            buildingList:[],
            errorMsg:'',
            cardId:'',
            patrolPointTypeList: dict.POINTTYPE
        };
    },
    props:["tabnum"],
    watch:{
        tabnum(){
            if(this.tabnum==1){
                this.findPageList()
            }
        }
    },
    created(){
        this.getDict()
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]), 
    },
    mounted(){
        var that=this
        this.columnsFormDialog[4].change = (value) => {
            this.columnsFormDialog[5].disData=[]
            let obj = this.columnsFormDialog[4].disData.filter(item => item.value === value)[0]
            findByBuildCode({buildingCode:obj.buildingCode}).then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.forEach(item => {
                        let obj = { 
                            label: item.floorCode,
                            value: item.id, 
                        }
                        this.columnsFormDialog[5].disData.push(obj);
                    })
                }
            })
        }
        this.findPageList()
    },
    methods: {
        handleSearch(values) {
            this.params.page = 0
            this.pagination.current = 1
            Object.assign(this.params, values)
            this.findPageList()
        },
        handleAdd() {
            this.$refs.formDialog.showDrawer('', 'add', this.columnsFormDialog)
        },
        onView(record) {
            this.columnsFormDialog[5].disData=[]
            findByBuildCode({buildingCode:record.buildingName}).then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.forEach(item => {
                        let obj = { 
                            label: item.floorCode,
                            value: item.id, 
                        }
                        this.columnsFormDialog[5].disData.push(obj);
                    })
                }
            })
            this.$refs.formDialog.showDrawer(record, 'view', this.columnsFormDialog)
        },
        onEdit(record){
            this.columnsFormDialog[5].disData=[]
            findByBuildCode({buildingCode:record.buildingName}).then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.forEach(item => {
                        let obj = { 
                            label: item.floorCode,
                            value: item.id, 
                        }
                        this.columnsFormDialog[5].disData.push(obj);
                    })
                }
            })
            this.$refs.formDialog.showDrawer(record, 'edit', this.columnsFormDialog)
        },
        onDelete(record) {
            safePatrolPointDelete({id:record.id}).then(res => {
                if (res && res.data && res.data.success) {
                    this.$message.success('删除成功')
                    this.findPageList()
                } else {
                    this.$message.error('删除失败')
                }
            })
        },
        submit(params, handle) {
            var that=this
            this.buildingList.forEach(s=>{
                if(s.id==params.buildingId){
                    findByBuildCode({buildingCode:s.buildingCode}).then(res => {
                        if (res && res.data && res.data.success) {
                            if(res.data.value.length){
                                if(!res.data.value.filter(t=>t.id==params.floorId).length){
                                    this.$message.error('该建筑没有此楼层')
                                    return
                                }else{
                                    this.patrolCardCheck(params,handle)
                                }
                            }else{
                                this.$message.error('该建筑没有此楼层')
                                return
                            }
                        }
                    })
                }
            })
        },
        patrolCardCheck (params,handle) {
            var formData= new FormData()
            formData.append('cardCode',params.cardCode)
            findPatrolCard(formData).then(res=>{
                if(res && res.data && res.data.success){
                    this.cardId=res.data.value.id
                    this.trueSubmit(params,handle)
                }else{
                    this.errorMsg=res.data.errorMsg
                    this.$message.error(res.data.errorMsg)
                }
            })
        },
        trueSubmit(params,handle){
            let that = this
            if (handle === 'add') {
                if(that.cardId){
                    params.patrolTaskId=null
                    params.buildingId=params.buildingId.toString()
                    params.floorId=params.floorId.toString()
                    params.id=that.cardId
                    savePoint(params).then(res => {
                        if (res && res.data && res.data.success) {
                            that.$message.success('添加成功')
                            that.cardId=''
                            that.findPageList()
                        } else {
                            that.$message.error(res.data.errorMsg)
                        }
                    })
                }else{
                    that.$message.error('请填写正确的巡查卡')
                    that.cardId=''
                }
            } else if (handle === 'edit') {
                updatePoint(params).then(res => {
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
            this.columnsFormDialog[2].disData =this.patrolPointTypeList
            this.searchCol[1].disData = this.patrolPointTypeList
            findBuildPageList({}).then(res=>{
                if (res && res.data && res.data.success) {
                    res.data.value.content.forEach(s=>{
                        s.value=s.id
                        s.label=s.buildingCode
                    })
                    this.buildingList=res.data.value.content
                    this.columnsFormDialog[4].disData=res.data.value.content
                }
            })
            findPageList({}).then(res=>{
                if (res && res.data && res.data.success) {
                    res.data.value.content.forEach(s=>{
                        s.value=s.id
                        s.label=s.floorCode
                    })
                    this.floorList=res.data.value.content
                }
            })
        },
        findPageList () {
            this.loading = true;
            findPatrolPointPageList(this.params).then(res => {
                if (res && res.data && res.data.success && res.data.value.content.length) {
                    res.data.value.content.forEach(s=>{
                        this.buildingList.forEach(t=>{
                            if(t.value==s.buildingId){
                                s.buildingName=t.label
                            }
                        })
                        this.floorList.forEach(t=>{
                            if(t.value==s.floorId){
                                s.floorName=t.label
                            }
                        })
                        this.patrolPointTypeList.forEach(t=>{
                            if(t.value==s.patrolPointType){
                                s.patrolPointTypeName=t.label
                            }
                        })
                    })
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    res.data.value.content.forEach(item => {
                        item.key = item.id
                    })
                    this.dataSource = res.data.value.content;
                    this.pagination = pagination;
                }else{
                    this.dataSource =[]
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