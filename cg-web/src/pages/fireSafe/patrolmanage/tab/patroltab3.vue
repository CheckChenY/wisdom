<template>
    <div class="child_unit">
        <a-form :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="9">
                    <a-form-item label="巡查开始时间" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                        <a-date-picker @change="onChangeStart" v-model="startTime" style="width:100%;" placeholder="请巡查结束时间"/>
                    </a-form-item>
                </a-col>
                <a-col :span="9">
                    <a-form-item label="巡查结束时间" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                        <a-date-picker @change="onChangeEnd" v-model="endTime" style="width:100%;" placeholder="请巡查结束时间"/>
                    </a-form-item>
                </a-col>
                <!-- <a-col :span="9">
                    <a-form-item label="任务名称" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                        <a-select 
                            placeholder="请选择"
                            v-decorator="['taskId']">
                            <a-select-option v-for="(item,index) in patrolList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col> -->
                <a-col :span="9">
                    <a-form-item label="巡查结果" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                        <a-select 
                            placeholder="请选择"
                            showSearch
                            optionFilterProp="children"
                            v-decorator="['patrolResult']">
                            <a-select-option v-for="(item,index) in persondata" :key="index" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6" style="margin-top:-1px;">
                    <a-button type="primary" html-type="submit">
                        查询
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        清空
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
        <a-table bordered 
            :dataSource="dataSource" 
            :pagination="pagination"
            :loading="loading"
            :rowClassName="rowClassName"
            :columns="columns">
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
                    <a-button @click="() => onView(record)" type="primary" style="margin-right: 10px;">查看</a-button>
                </div>
            </template>
        </a-table>
        <taskdetail3 ref="taskdetail3" @submit="submit"></taskdetail3>
    </div>
</template>
<script>
import { findDictList } from "@/api/public"
import { findPageList, insert, update, deleteBuilding } from "@/api/building"
import { safePatrolRecordFindPageList,findTaskPageList } from '@/api/patrol/patrol'
import { constants } from 'fs';
import taskdetail3 from './tab3/taskdetail3.vue';
import { mapGetters } from "vuex";
import { dict } from '@/const/dict'

export default {
    components: {
        taskdetail3
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
                    title: '开始巡查时间',
                    dataIndex: 'startTime',
                },
                {
                    title: '结束巡查时间',
                    dataIndex: 'endTime',
                },
                {
                    title: '巡查点编码',
                    dataIndex: 'cardCode',
                },
                {
                    title: '巡查点名称',
                    dataIndex: 'patrolPointName',
                },
                {
                    title: '巡查点类型',
                    dataIndex: 'patrolPointType',
                },
                {
                    title: '所在位置',
                    dataIndex: 'location',
                },
                {
                    title: '巡查人',
                    dataIndex: 'patrolUser',
                },
                {
                    title: '巡查状态',
                    dataIndex: 'patrolStatus',
                },
                {
                    title: '巡查结果',
                    dataIndex: 'patrolResult',
                },
                {
                    title: '巡查完成时间',
                    dataIndex: 'patrolTime',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 100,
                    scopedSlots: { customRender: 'operation' },
                    disabled:false,
                },
            ],
            persondata: [{
                label:'合格',
                value:'1'
            },{
                label:'不合格',
                value:'2'
            }],
            form: this.$form.createForm(this),
            params: {
                page:0,
                size:8,
            },
            patrolPointTypeList: dict.POINTTYPE,
            startTime:null,
            startTimeValue:'',
            endTime:null,
            endTimeValue:'',
            patrolList:[]
        };
    },
    props:["tabnum"],
    watch:{
        tabnum(){
            if(this.tabnum==3){
                this.findPageList()
            }
        }
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
            this.form.validateFields((error, values) => {
                console.log(values)
                this.params.startTime=this.startTimeValue?this.startTimeValue:null
                this.params.endTime=this.endTimeValue?this.endTimeValue:null
                this.params.patrolResult=values.patrolResult?values.patrolResult:null
                this.findPageList()
            })
        },
        onView(record) {
            this.$refs.taskdetail3.showDrawer(record)
        },
        submit(params, handle) {
            params.usageNature = this.columns[2].disData.filter(item => item.value == params.usageNature)[0].label
            params.structure = this.columns[3].disData.filter(item => item.value == params.structure)[0].label
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
            findTaskPageList(this.params).then(res => {
                if (res && res.data && res.data.success) {
                    if(res.data.value.content.length){
                        res.data.value.content.forEach(s=>{
                            s.label=s.patrolName
                            s.value=s.id
                        })
                    }
                    this.patrolList=res.data.value.content
                }
            })
        },
        findPageList () {
            this.loading = true;
            safePatrolRecordFindPageList(this.params).then(res => {
                if (res && res.data && res.data.success) {
                    // const pagination = { ...this.pagination };
                    // pagination.total = res.data.value.totalElements;
                    // if(res.data.value.content.length){
                    //     res.data.value.content.forEach(item => {
                    //         item.key = item.id
                    //     })
                    // }
                    if(res.data.value.content.length){
                        res.data.value.content.forEach(s=>{
                            this.patrolPointTypeList.forEach(t=>{
                                if(s.patrolPointType==t.value){
                                    s.patrolPointType=t.label
                                }
                            })
                            s.key=s.id
                            s.patrolStatus=!s.patrolStatus?'':s.patrolStatus=='1'?'已巡查':s.patrolStatus=='2'?'待巡查':'漏巡查'
                            s.patrolResult=s.patrolResult == 1?'合格':s.patrolResult==2?'不合格':''
                            s.patrolPhoto = s.patrolPhoto?this.$imgUrl + s.patrolPhoto:null
                        })
                    }
                    this.dataSource = res.data.value.content;
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
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
        onChangeStart (value, dateString) {
            this.startTime=value
            this.startTimeValue=dateString
        },
        onChangeEnd (value, dateString) {
            this.endTime=value
            this.endTimeValue=dateString
        },
        handleReset() {
            this.form.resetFields();
            this.startTimeValue=''
            this.startTime=null
            this.endTimeValue=''
            this.endTime=null
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