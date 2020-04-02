<template>
    <div class="platform_cont">
        <a-table :loading="tableLoading"
            size="small"
            :pagination="false"
            :rowClassName="rowClassName" 
            :dataSource="dataSource" :columns="columns">
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
                    <a-button type="primary" @click="onView(record)" style="margin-right: 10px;">查看</a-button>
                </div>
            </template>
        </a-table>
        <formDialog @cancel="cancel" :dialogShow="dialogShow" :record="record"></formDialog>
    </div>
</template>

<script>
import formDialog from '../../../warncenter/a_record_dialog/formDialog';
import { scheduleTask } from '@/api/warncenter/warnscan'
import { dict } from '@/const/dict'
import { mapGetters } from "vuex";
export default {
    props:["tabnum"],
    watch:{
        tabnum(){
            if(this.tabnum==1){
                this.getData()
            }
        }
    },
    data () {
        return {
            dataSource: [],
            columns: [{
                    title: '报警时间',
                    dataIndex: 'createTime',
                }, {
                   
                    title: '警情程度',
                    dataIndex: 'alarmLevel',
                },{
                    title: '操作',
                    dataIndex: 'operation',
                    width: 80,
                    scopedSlots: { customRender: 'operation' },
                    fixed:'right'
                },
            ],
            params:{
                page:0,
                pageSize:5,
                deal: 2,
                task: 1
            },
            tableLoading:false,
            dialogShow:false,
            warnTypeList:dict.USESTATE,
            warnLevelList:dict.ALARMLEVEL,
            warnConfirmList:[{
                label:'真实火警',
                value:'1'
            },{
                label:'异常',
                value:'2'
            },{
                label:'误报',
                value:'3'
            },{
                label:'测试',
                value:'4'
            },],
            record:{}
        }
    },
    components:{
        formDialog,
    },
    created(){
    },
    mounted(){
        this.getData()
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    methods:{
        cancel(){
            this.dialogShow=false
        },
        onView(record){
            this.record=record
            this.dialogShow=true
        },
        getData(){
            this.tableLoading=true
            scheduleTask(this.params).then(res=>{
                this.tableLoading=false
                if(res && res.data && res.data.success){
                    res.data.value.content.forEach((s,index)=>{
                        s.key=index
                        this.warnTypeList.forEach(t=>{
                            if(s.alarmType==t.value){
                                s.alarmType=t.label
                            }
                        })
                        this.warnLevelList.forEach(t=>{
                            if(s.alarmLevel==t.value){
                                s.alarmLevel=t.label
                            }
                        })
                        this.warnConfirmList.forEach(t=>{
                            if(s.warnConfirmType==t.value){
                                s.warnConfirmType=t.label
                            }
                        })
                    })
                    this.dataSource=res.data.value.content
                } else {
                    this.dataSource = []
                }
            })
        },
        rowClassName (record) {
            let className = '';
            if (this.rowLight == record.id) {
                className = 'light-row';
            }
            return className;
        }
    }
}
</script>
<style lang='scss'>

</style>