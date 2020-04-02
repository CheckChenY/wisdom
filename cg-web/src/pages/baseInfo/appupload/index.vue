<template>
    <div class="child_unit">
        <div class="table-operations">
            <a-button type="primary" @click="handleAdd">添加</a-button>
        </div>
        <a-table :pagination="false" size="middle" 
            bordered 
            :dataSource="dataSource" 
            :columns="columns" 
            :rowClassName="rowClassName"
            :loading="loading" style="margin-top:16px;">
        </a-table>
        <a-pagination
            style="float: right;margin:20px 0;"
            :pageSizeOptions="pageSizeOptions"
            :total="page.total"
            showSizeChanger
            :pageSize="page.pageSize"
            v-model="page.current"
            @showSizeChange="onShowSizeChange"
            @change="currentChange"
        >
            <template slot="buildOptionText" slot-scope="props">
                <span>{{props.value}}条/页</span>
            </template>
        </a-pagination>
        <formDialog ref="formDialog" @result="getData"></formDialog>
    </div>
</template>

<script>
import formDialog from './formDialog.vue';
import { findPageList } from '@/api/dict'
import { mapGetters } from "vuex";
export default {
    components: {
        formDialog,
    },
    data() {
        return {
            dataSource: [],
            columns: [
                {
                    title: '版本号',
                    align:'center',
                    dataIndex: 'id',
                    key:'id',
                },
                {
                    title: '更新时间',
                    align:'center',
                    dataIndex: 'label',
                    key:'label',
                },
                {
                    title: '更新内容',
                    align:'center',
                    dataIndex: 'parentId',
                    key:'parentId',
                },
                {
                    title: '更新说明',
                    align:'center',
                    dataIndex: 'level',
                    key:'level',
                },
            ],
            loading:false,
            pageSizeOptions: ['5', '10', '15', '20', '50'],
            page:{
                current: 0,
                pageSize: 10,
                total: 0,
            },
            params:{
                page:0,
                size:10,
                type:null
            }
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
    methods:{
        currentChange(num){
            console.log(num-1)
            this.params.page=num-1
            this.getData()
        },
        onShowSizeChange(current, pageSize) {
            console.log(pageSize)
            this.params.page=current-1
            this.params.size=pageSize
            this.page.pageSize=pageSize
            this.getData()
        },
        getData(){
            this.loading=true
            findPageList(this.params).then(res=>{
                if(res && res.data && res.data.success){
                    this.loading=false
                    this.dataSource=res.data.value.content
                    this.page.total=res.data.value.totalElements
                    this.page.current=res.data.value.number+1
                    if(res.data.value.content.length){
                        res.data.value.content.forEach(s=>{
                            s.key=s.id
                        })
                    }
                }
            })
        },
        handleAdd() {
            this.$refs.formDialog.showDrawer('', 'add')
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
    .item_list{
        margin: 20px;
        text-align: right;
        .item_list_left{
            text-align: right
        }
    }
    .modalStyle{
        widows: 720px;
    }
</style>