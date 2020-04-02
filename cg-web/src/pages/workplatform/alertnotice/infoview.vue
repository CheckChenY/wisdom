<template>
    <div class="info_view">
        <a-list size="small" bordered :dataSource="dataSource">
            <a-list-item slot="renderItem" slot-scope="item">
                <div style="width: 98%;" @click="onView(item)">
                    <div class="info_view_title">
                        <span v-if="item.noticeType != '1'">{{item.createTime}}</span>
                        <span v-if="item.noticeType != '1'" style="color:#40a9ff;">{{item.noticeType}}</span>
                        <span>{{item.acceptNoticeContent}}</span>
                    </div>
                </div>
            </a-list-item>
        </a-list>
        <div style="padding:5px;text-align:right">
            <a-pagination size="small" :current="current" :total="total" @change="onChange" />
        </div>
        <!-- <a-pagination v-model="current" size='small' @change="onChange" :total="total" showLessItems /> -->
        <formDialog ref="formDialog"></formDialog>
    </div>
</template>
<script>
import { findViewMessageList, updateAlreadyread } from '@/api/pushcenter/pushcenter'
import formDialog from './formDialog.vue';
import { dict } from '@/const/dict'
import { mapGetters } from "vuex";
export default {
    components: {
        formDialog
    },
    props:["tabnum"],
    watch:{
        tabnum(){
            if(this.tabnum==1){
                this.getData()
            }
        }
    },
    data() {
        return {
            dataSource: [],
            count: 2,
            current:1,
            total:0,
            params:{
                page:0,
                pageSize:8,
                status:0//未读
            },
        };
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    mounted(){
        this.getData()
    },
    methods: {
        getData(){
            findViewMessageList(this.params).then(res=>{
                if(res && res.data && res.data.success){
                    res.data.value.content.forEach(s=>{
                        s.key=s.id
                        let noticeType = dict.NOTICETYPE.filter(item => s.noticeType.indexOf(item.value) != -1)
                        if (noticeType.length > 0) {
                            s.noticeType  = noticeType[0].label
                        }
                    })
                    this.dataSource=res.data.value.content;
                    this.total = res.data.value.totalElements;
                }
            })
        },
        onChange (value) {
            this.current = value;
            this.params.page = value - 1
            this.getData()
        },
        onView(record) {
            console.log(record)
            this.$refs.formDialog.showDrawer(record, 'view')
            updateAlreadyread({id:record.id}).then(res => {
                this.$store.dispatch("findCount")
                this.getData()
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
.info_view{
    overflow: auto;
    // height: 300px;
    .info_view_title{
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
    }
}
</style>