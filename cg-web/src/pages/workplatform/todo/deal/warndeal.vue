<template>
    <!-- <div class="platform_cont"> -->
        <div>
            <a-table :loading="tableLoading"
                size="small"
                :pagination="false"
                :rowClassName="rowClassName" 
                :dataSource="dataSource" :columns="columns">
                <template slot="operation" slot-scope="text, record" style="display: flex;">
                    <div class="editable-row-operations">
                        <a-button type="primary" @click="onDeal(record)" style="margin-right: 10px;">处理</a-button>
                        <a-button type="danger" @click="onRela(record)" v-if="record.linkState==1">联动动作</a-button>
                    </div>
                </template>
            </a-table>
            <formDialog @cancel="cancel" :dialogShow="dialogShow" :record="record"></formDialog>
        </div>
    <!-- </div> -->
</template>
<script> 
import formDialog from '../../../warncenter/a_deal_dialog/formDialog';
import { scheduleTask, startLinkDeviceByHand } from '@/api/warncenter/warnscan'
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
            columns: [
                {
                    title: '报警时间',
                    dataIndex: 'createTime',
                },{
                    title: '警情程度',
                    dataIndex: 'alarmLevel',
                },{
                    title: '操作',
                    dataIndex: 'operation',
                    width: 180,
                    scopedSlots: { customRender: 'operation' },
                    fixed:'right'
                },
            ],
            params:{
                page:0,
                pageSize:5,
                deal: 1,
                task: 1
            },
            alarmTypeList:dict.USESTATE,
            warnLevelList:dict.ALARMLEVEL,
            tableLoading:false,
            dialogShow:false,
            record:{},
        }
    },
    components:{
        formDialog
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
        onRela(record){
            var that=this
            startLinkDeviceByHand({
                deviceId:record.deviceId,
                alarmId:record.id
            }).then(res=>{
                if(res && res.data && res.data.success){
                    var h = this.$createElement;
                    that.$info({
                        title: '操作成功',
                        content: h('div', {}, [
                            h('p', '下发命令成功的个数'+res.data.value.sendSucceedCout),
                            h('p', '下发命令失败的个数'+res.data.value.sendFailedCount),
                            h('p', '不符合逻辑的个数'+res.data.value.inconformityLogicCount),
                        ]),
                        onOk() {},
                    });
                }else{
                    that.$message.error(res.data.errorMsg)
                }
            })
        },
        onDeal(record){
            this.record=record
            this.dialogShow=true
        },
        cancel(refresh){
            if(refresh){
                this.getData()
            }
            this.dialogShow=false
        },
        getData(){
            this.tableLoading=true
            scheduleTask(this.params).then(res=>{
                this.tableLoading=false
                if(res && res.data && res.data.success){
                    res.data.value.content.forEach((s,index)=>{
                        s.key=index
                        this.alarmTypeList.forEach(t=>{
                            if(s.alarmType==t.value){
                                s.alarmType=t.label
                            }
                        })
                        this.warnLevelList.forEach(t=>{
                            if(s.alarmLevel==t.value){
                                s.alarmLevel=t.label
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
<style>
</style>