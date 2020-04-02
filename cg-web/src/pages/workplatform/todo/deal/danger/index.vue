<template>
    <div class="platform_cont">
        <a-table :pagination="false" 
            size="middle" 
            :dataSource="dataSource" 
            :rowClassName="rowClassName"
            :columns="columns">
            <!-- slot-scope="text, record" -->
            <template slot="img" slot-scope="text, record">
                <div class="editable-row-operations">
                    <img style="height:50px;" :src="record.scenePhoto"/>
                </div>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                    <a-button type="primary" @click="() => onDeal(record)" style="margin-right:10px;">处理</a-button>
                </div>
            </template>
        </a-table>
        <formDialog ref="formDialog" @dialogColse="getData"></formDialog>
    </div>
</template>
<script>
import { scheduleTask } from '@/api/warncenter/warnscan'
import formDialog from './formDialog.vue';
import { mapGetters } from "vuex";
export default {
    components: {
        formDialog
    },
    props:["tabnum"],
    watch:{
        tabnum(){
            if(this.tabnum==3){
                this.getData()
            }
        }
    },
    data() {
        return {
            dataSource: [],
            columns: [
                {
                    title: '隐患上传时间',
                    dataIndex: 'createTime',
                },
                {
                    title: '隐患来源',
                    dataIndex: 'source',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 80,
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            params:{
                page:0,
                pageSize:50,
                deal: 1,
                task: 3
            },
            reportDate:null,
        };
    },
    created(){
        this.getData()
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]), 
    },
    methods: {
        getData(){
            scheduleTask(this.params).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    res.data.value.content.forEach(s=>{
                        s.scenePhoto=this.$imgUrl+s.scenePhoto
                        s.handPhoto=this.$imgUrl+s.handPhoto
                        s.source=s.source==null?'':s.source==1?'一键上传':'巡查上传'
                    })
                    this.dataSource=res.data.value.content
                }
            })
        },
        onDeal(record) {
            this.$refs.formDialog.showDrawer(record, 'deal')
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
.ant-advanced-search-form {
    padding: 0px;
    background: #fff;
    /* border: 1px solid #d9d9d9; */
    border-radius: 6px;
}
</style>