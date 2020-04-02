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
                    <a-button @click="() => onSet(record)" type="primary" style="margin-right: 10px;">配置巡查点</a-button>
                    <a-button @click="() => onTime(record)" type="primary" style="margin-right: 10px;">配置巡查周期</a-button>
                    <a-button @click="() => onEdit(record)" type="primary" style="margin-right: 10px;">编辑</a-button>
                    <a-popconfirm title="确定删除?" okText="确定" cancelText="取消" @confirm="() => onDelete(record)">
                        <a-button type="danger">删除</a-button>
                    </a-popconfirm>
                </div>
            </template>
        </a-table>
        <patrolTask ref="patrolTask" @refresh="patrolTaskRefresh" :userList="userList"></patrolTask>
        <setPatrolPoint ref="setPatrolPoint"></setPatrolPoint>
        <patrolTime ref="patrolTime"></patrolTime>
    </div>
</template>
<script>
import setPatrolPoint from './tab2/setPatrolPoint';
import patrolTask from './tab2/patrolTask';
import patrolTime from './tab2/patrolTime';
import formSearch from '@/components/base/formSearch';
import { findTaskPageList,getAllUserByOrgId,patrolTaskDelete } from '@/api/patrol/patrol'
import { mapGetters } from "vuex";
export default {
    components: {
        patrolTask,
        formSearch,
        setPatrolPoint,
        patrolTime
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
                    title: '任务名称',
                    dataIndex: 'patrolName',
                    rules:[
                        {
                        required: true,
                        message: '请输入任务名称!',
                        },
                    ],
                    required: true,
                    disabled:false,
                },{
                    title: '巡查人',
                    dataIndex: 'patrolUserName',
                    type: 'select',
                    disData: [],
                    required: true,
                    rules:[
                        {
                        required: true,
                        message: '请选择巡查人!',
                        },
                    ],
                    disabled:false,
                },
                {
                    title: '备注说明',
                    dataIndex: 'remark',
                    required: false,
                    rules:[
                        {
                        required: false,
                        message: '请输入备注说明!',
                        },
                    ],
                    disabled:false,
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 410,
                    scopedSlots: { customRender: 'operation' },
                    disabled:false,
                },
            ],
            searchCol: [
                {
                    title: '任务名称',
                    dataIndex: 'patrolName',
                },
                {
                    title: '巡查人',
                    dataIndex: 'patrolUserId',
                    type: 'select',
                    disData: []
                },
            ],
            form: this.$form.createForm(this),
            params: {
                page:0,
                size:8,
            },
            patrolTimeColumns:[
                {
                    title: '开始巡查时间',
                    dataIndex: 'buildingCode',
                },
                {
                    title: '结束巡查时间',
                    dataIndex: 'usageNature',
                },
                {
                    title: '任务名称',
                    dataIndex: 'structure',
                },
                {
                    title: '巡查总点数',
                    dataIndex: 'page',
                },
                {
                    title: '巡查人',
                    dataIndex: 'size',
                },
                {
                    title: '已巡查点数',
                    dataIndex: 'createTime',
                },
                {
                    title: '待巡查点数',
                    dataIndex: 'createBy',
                },
                {
                    title: '巡查情况',
                    dataIndex: 'areaCovered',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 250,
                    scopedSlots: { customRender: 'operation' },
                    disabled:false,
                },
            ],
            userList:[]
        };
    },
    props:["tabnum"],
    watch:{
        tabnum(){
            if(this.tabnum==2){
                this.findPageList()
            }
        }
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]), 
    },
    created(){
        this.getDict()
    },
    methods: {
        patrolTaskRefresh(){
            this.findPageList()
        },
        handleSearch(values) {
            this.params.page = 0
            this.pagination.current = 1
            Object.assign(this.params, values)
            this.findPageList()
        },
        handleAdd() {
            this.$refs.patrolTask.showDrawer('', 'add',)
        },
        onTime(record){
            this.$refs.patrolTime.showDrawer(record, 'add', this.patrolTimeColumns)
        },
        onEdit(record) {
            console.log(record)
            this.$refs.patrolTask.showDrawer(record, 'edit',)
        },
        onSet(record){
            this.$refs.setPatrolPoint.showDrawer(record, 'add', this.columns)
        },
        onDelete(record) {
            console.log('删除任务')
            console.log(record)
            patrolTaskDelete({id:record.id}).then(res => {
                if (res && res.data && res.data.success) {
                    this.$message.success('删除成功')
                    this.findPageList()
                } else {
                    this.$message.error('删除失败')
                }
            })
        },
        getDict () {
            getAllUserByOrgId().then(res=>{
                console.log(res)
                if (res && res.data && res.data.success) {
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.realName
                            s.value=s.id
                        })
                    }
                    this.userList=res.data.value
                    this.columns[3].disData = res.data.value
                    this.searchCol[1].disData = res.data.value
                }
                this.findPageList()
            })
        },
        findPageList () {
            this.loading = true;
            findTaskPageList(this.params).then(res => {
                console.log(res)
                if (res && res.data && res.data.success) {
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    res.data.value.content.forEach(item => {
                        item.key = item.id
                        if(this.columns[3].disData.length){
                            this.columns[3].disData.forEach(s=>{
                                if(item.patrolUserId==s.value){
                                    item.patrolUserName=s.label
                                }
                            })
                        }
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