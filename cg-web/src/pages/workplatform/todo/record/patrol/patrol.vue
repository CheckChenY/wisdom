<template>
    <div class="platform_cont">
        <a-table 
            :dataSource="dataSource" 
            :pagination="false"
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
import { insert, update } from "@/api/building"
import { scheduleTask } from '@/api/warncenter/warnscan'
import taskdetail3 from './taskdetail3.vue';
import { mapGetters } from "vuex";
import { dict } from '@/const/dict'

export default {
    components: {
        taskdetail3
    },
    data() {
        return {
            dataSource: [],
            loading: false,
            columns: [
                {
                    title: '开始巡查时间',
                    dataIndex: 'startTime',
                },
                {
                    title: '巡查点名称',
                    dataIndex: 'patrolPointName',
                },
                {
                    title: '巡查状态',
                    dataIndex: 'patrolStatus',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 100,
                    scopedSlots: { customRender: 'operation' },
                    disabled:false,
                },
            ],
            params: {
                page: 0,
                pageSize: 5,
                deal: 2,
                task: 2
            },
            patrolPointTypeList: dict.POINTTYPE,
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
    created(){
        // this.findPageList()
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]), 
    },
    methods: {
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
        findPageList () {
            this.loading = true;
            scheduleTask(this.params).then(res => {
                if (res && res.data && res.data.success) {
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
                }
                this.loading = false;
            })
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
.platform_cont{
    .table-operations {
        text-align: left;
        margin-bottom: 16px;
    }

    .table-operations > button {
        margin-right: 8px;
    }
}
</style>