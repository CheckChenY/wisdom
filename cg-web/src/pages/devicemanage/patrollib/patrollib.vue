<template>
    <div class="child_unit">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="巡查编号">
                        <a-input 
                            placeholder="巡查编号"
                            v-decorator="['cardCode']"
                            maxLength="45">
                        </a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="启用状态">
                        <a-select 
                            v-decorator="['bindingState']">
                            <a-select-option value="1">绑定</a-select-option>
                            <a-select-option value="2">未绑定</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5" :style="{marginTop:'3px'}">
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
            <a-button type="primary" @click="handleAdd" icon="plus" style="margin-right: 10px;">添加</a-button>
            <a-button type="text" @click="download" style="margin-right: 10px;">
                <a
                    download="批量导巡查卡模板.xlsx"
                    href="./static/批量导巡查卡.xlsx"
                    style="text-decoration:none;">
                    模板下载
                </a>
            </a-button>
            <a-upload
                style="display: inline-block;"
                name="file"
                accept=".xls,.xlsx"
                :multiple="false"
                :showUploadList="false"
                :beforeUpload="exportChange"
            >   
                <a-button type="text" style="margin-right: 10px;">批量导入</a-button>
            </a-upload>
            
            <span>提示：请按照模板格式进行填写，并上传文件，仅支持Excel文件</span>
        </div>
        <a-table bordered :dataSource="dataSource" 
            :columns="columns"
            :rowClassName="rowClassName"
            :pagination="pagination">
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
                    <a-button @click="() => onEdit(record)" type="primary" style="margin-right: 10px;">编辑</a-button>
                    <a-button @click="() => onDelete(record)" type="danger">删除</a-button>
                </div>
            </template>
        </a-table>
        <patrolDialog ref="patrolDialog" @refresh="refresh"></patrolDialog>
    </div>
</template>
<script>
import patrolDialog from './patrolDialog.vue';
import { findCardLibrary,delCardLibrary } from "@/api/devicemanage/patrollib"
import { dict } from '@/const/dict'
import { mapGetters } from "vuex";
export default {
    components: {
        patrolDialog
    },
    data() {
        return {
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize: 9,
                current: 1
            },
            columns: [
                {
                    title: '序号',
                    dataIndex: 'id',
                },
                {
                    title: '巡查编号',
                    dataIndex: 'cardCode',
                },
                {
                    title: '启用状态',
                    dataIndex: 'bindingState',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 180,
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                size:9,
            },
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
        exportChange(file){
            console.log(file)
        },
        download(){},
        refresh(){
            this.params.page = 0
            this.pagination.current = 1
            this.getData()
        },
        getData(){
            findCardLibrary(this.params).then(res=>{
                if(res.data.success && res.data.value){
                    res.data.value.content.forEach((item,o)=>{
                        item.key=o
                        let state = dict.BINDSTATE.filter(s => s.value == item.bindingState)
                        item.bindingState = state.length>0?state[0].label:''
                    })
                    const pagination = {...this.pagination};
                    pagination.total = res.data.value.totalElements;
                    this.pagination = pagination;
                    this.dataSource=res.data.value.content
                }else{
                    this.dataSource=[]
                }
            })
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
        handleAdd() {
            this.$refs.patrolDialog.showDrawer('', 'add')
        },
        handleReset() {
            this.form.resetFields();
        },
        onEdit(record){
            this.$refs.patrolDialog.showDrawer(record, 'edit')
        },
        onDelete(record) {
            var that=this
            console.log(record)
            this.$confirm({
                title: '提示',
                content: '确定删除此卡号？',
                okText:'确定',
                cancelText:'取消',
                onOk() {
                    return new Promise((resolve, reject) => {
                        console.log('删除操作')
                        delCardLibrary({id:record.id}).then(res=>{
                            if(res && res.data && res.data.success){
                                that.$message.success('删除成功')
                                that.onChange(1)
                                resolve();
                            }
                        })
                    }).catch(() => console.log('Oops errors!'));
                },
                onCancel() {},
            });
        },
        onChange(value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
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