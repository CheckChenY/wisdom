<template>
    <div class="unit_review">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="5">
                    <a-form-item label="隐患来源">
                        <a-select 
                        v-decorator="['source']"
                        placeholder="隐患来源">
                            <a-select-option value="1">一键上传</a-select-option>
                            <a-select-option value="2">巡查上传</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="隐患上传日期">
                        <a-range-picker 
                        @change="dateChange"
                        v-model="reportDate"/>
                    </a-form-item>
                </a-col>
                <a-col :span="4" :style="{marginTop:'3px'}">
                    <a-button type="primary" html-type="submit">
                        查询
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        清空
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
        <a-table :pagination="pagination" bordered 
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
import { findPageList } from '@/api/patrol/hidden'
import formDialog from './formDialog.vue';
import { mapGetters } from "vuex";
export default {
    components: {
        formDialog
    },
    data() {
        return {
            dataSource: [],
            count: 2,
            columns: [
                {
                    title: '序号',
                    dataIndex: 'id',
                },
                {
                    title: '隐患上传时间',
                    dataIndex: 'createTime',
                },
                {
                    title: '上传人员',
                    dataIndex: 'uploadName',
                },
                {
                    title: '所在建筑',
                    dataIndex: 'buildingName',
                },
                {
                    title: '楼层/区域',
                    dataIndex: 'floorName',
                },
                {
                    title: '所在位置',
                    dataIndex: 'position',
                },
                {
                    title: '隐患来源',
                    dataIndex: 'source',
                },
                {
                    title: '隐患图片',
                    dataIndex: 'scenePhoto',
                    scopedSlots: { customRender: 'img' },
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                hiddenStatus:'0',
                startTime:'',
                endTime:'',
                page:0,
                size:10,
            },
            pagination: {
                onChange: this.onChange,
                pageSize: 10,
                current: 1,
                size:'middle'
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
        dateChange(date,dateString){
            this.reportDate=date
            this.params.startTime = new Date(dateString[0]).getTime()
            this.params.endTime = new Date(dateString[1]).getTime()
        },
        getData(){
            findPageList(this.params).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    res.data.value.content.forEach(s=>{
                        s.scenePhoto=this.$imgUrl+s.scenePhoto
                        s.handPhoto=this.$imgUrl+s.handPhoto
                        s.source=s.source==null?'':s.source==1?'一键上传':'巡查上传'
                    })
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    this.dataSource=res.data.value.content
                    this.pagination = pagination;
                }
            })
        },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.params.page = 0
                this.pagination.current = 1
                Object.assign(this.params, values)
                this.getData()
            });
        },
        handleReset() {
            this.reportDate=null
            this.form.resetFields();
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
    padding: 24px;
    background: #fff;
    /* border: 1px solid #d9d9d9; */
    border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
    display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
    flex: 1;
}

#components-form-demo-advanced-search .ant-form {
    max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}
</style>