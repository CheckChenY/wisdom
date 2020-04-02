<template>
    <div class="child_unit">
        <a-form :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="9">
                    <a-form-item label="巡查卡编码" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                        <a-input
                        v-decorator="['careCode']"
                        maxLength="45"
                        placeholder="巡查卡编码"/>
                    </a-form-item>
                </a-col>
                <a-col :span="9">
                    <a-form-item label="巡查点类型" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                        <a-select 
                            placeholder="请选择"
                            showSearch
                            optionFilterProp="children"
                            v-decorator="['patrolPointType']">
                            <a-select-option v-for="(item,index) in searchCol.persondata" :key="index" :value="item.value">{{item.label}}</a-select-option>
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
        <div class="table-operations">
            <a-button type="primary" @click="handleAdd">配置巡查点</a-button>
        </div>
        <a-table bordered 
            :dataSource="dataSource" 
            :pagination="pagination"
            :loading="loading"
            :columns="columns">
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
                    <a-popconfirm title="确定删除?" okText="确定" 
                        cancelText="取消" 
                        @confirm="() => onDelete(record)">
                        <a-button type="danger">删除</a-button>
                    </a-popconfirm>
                </div>
            </template>
        </a-table>
        <patrolPointListHave ref="patrolPointListHave" @refresh="selectPatrolPointRefresh"></patrolPointListHave>
    </div>
</template>
<script>
import patrolPointListHave from './patrolPointListHave.vue';
import { findDictList } from "@/api/public"
import { taskPointInfos,safeTaskPointRelationDelete } from "@/api/patrol/patrol"
import { dict } from '@/const/dict'

export default {
    components: {
        patrolPointListHave,
    },
    props:["record"],
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
                    dataIndex: 'patrolPointPype',
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
                    dataIndex: 'building',
                },
                {
                    title: '所在楼层/区域',
                    dataIndex: 'floor',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 100,
                    scopedSlots: { customRender: 'operation' },
                    disabled:false,
                },
            ],
            searchCol: {
                persondata: []
            },
            form: this.$form.createForm(this),
            params: {
                page:0,
                size:8,
                taskId:null,
                careCode:null,
                patrolPointType:null
            },
            patrolPointTypeList: dict.POINTTYPE
        };
    },
    created(){
        this.params.taskId=this.record.id
        this.getDict()
        this.getData()
    },
    methods: {
        selectPatrolPointRefresh(){
            this.getData()
        },
        getData(){
            console.log('请求有巡查任务的巡查点')
            taskPointInfos(this.params).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    if(res.data.value && res.data.value.content.length){
                        res.data.value.content.forEach(s=>{
                            s.key=s.id
                            this.patrolPointTypeList.forEach(t=>{
                                if(s.patrolPointPype==t.value){
                                    s.patrolPointPype=t.label
                                }
                            })
                        })
                    }
                    const pagination = { ...this.pagination };
                    this.pagination = pagination;
                    this.dataSource = res.data.value.content;
                }
            })
        },
        handleSearch(values) {
            this.params.page = 0
            this.pagination.current = 1
            this.form.validateFields((error, values) => {
                console.log(values)
                this.params.careCode=values.careCode?values.careCode:null
                this.params.patrolPointType=values.patrolPointType?values.patrolPointType:null
                this.getData()
            })
            // Object.assign(this.params, values)
        },
        handleAdd() {
            this.$refs.patrolPointListHave.showDrawer(this.record, 'add', this.columns)
        },
        onDelete(record) {
            console.log('删除巡查点')
            console.log(record)
            console.log(this.params.taskId)
            safeTaskPointRelationDelete({
                pointId:record.id,
                taskId:this.params.taskId
            }).then(res => {
                if (res && res.data && res.data.success) {
                    this.$message.success('删除成功')
                    this.getData()
                } else {
                    this.$message.error('删除失败')
                }
            })
        },
        getDict () {
            var list=[
                {label:'消火栓',value:'1'},
                {label:'防火门',value:'2'},
                {label:'安全出口',value:'3'},
                {label:'配电箱',value:'4'},
                {label:'疏散通道',value:'5'},
                {label:'灭火器',value:'6'},
                {label:'应急照明灯',value:'7'},
                {label:'消防水泵',value:'8'},
                {label:'水泵房',value:'9'},
                {label:'配电室',value:'10'},
                {label:'应急疏散标志',value:'11'},
                {label:'其他',value:'0'}
            ]
            this.searchCol.persondata = list
            // console.log(this.columns[3])
            // findDictList({type:'building_structure'}).then(res=>{
            //     if (res && res.data && res.data.success) {
            //         this.columns[3].disData = res.data.value
            //     }
            // })
        },
        // getData () {
        //     this.loading = true;
        //     findPageList(this.params).then(res => {
        //         if (res && res.data && res.data.success) {
                    // const pagination = { ...this.pagination };
                    // pagination.total = res.data.value.totalElements;
                    // this.dataSource = res.data.value.content;
                    // this.pagination = pagination;
        //         }
        //         this.loading = false;
        //     })
        // },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        },
        handleReset() {
            this.form.resetFields();
        },
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