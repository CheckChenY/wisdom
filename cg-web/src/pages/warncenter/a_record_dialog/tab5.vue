<template>
    <div>
        <a-table :loading="tableLoading"
            bordered 
            size="small"
            :pagination="pagination"
            :dataSource="dataSource" :columns="columns">
        </a-table>
    </div>
</template>
<script>
import { getLinkLogByAlarmId } from '@/api/warncenter/warnscan'
export default {
    props:['warnnum','record'],
    watch:{
        warnnum(){
            if(this.warnnum==5){
                this.getData()
            }
        }
    },
    mounted(){
        this.getData()
    },
    data(){
        return{
            tableLoading:false,
            pagination: {
                onChange: this.onChange,
                pageSize:10,
                current: 1,
                size:'middle',
            },
            dataSource:[],
            columns: [
                {
                    title: '操作时间',
                    dataIndex: 'createTime',
                },
                {
                    title: '操作用户',
                    dataIndex: 'operatorName',
                },
                {
                    title: '操作详情',
                    dataIndex: 'operationDetails',
                },
            ],
            params:{
                page:0,
                size:10,
                alarmId:null,
                companyId:null
            }
        }
    },
    methods:{
        getData(){
            this.params.alarmId=this.record.id
            this.params.companyId=this.record.companyId
            getLinkLogByAlarmId(this.params).then(res=>{
                if(res && res.data && res.data.success){
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    if(res.data.value.content.length){
                        res.data.value.content.forEach(s=>{
                            s.key=s.id
                        })
                    }
                    this.dataSource = res.data.value.content;
                    this.pagination = pagination;
                }
            })
        },
        onChange(value){
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        },
    }
}
</script>