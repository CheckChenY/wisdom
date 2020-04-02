<template>
    <div class="child_unit">
        <a-row>
            <a-col :span="4">
                <div style="padding: 0px 30px">
                    <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange" />
                    <a-tree
                        @select="onSelect"
                        :expandedKeys="expandedKeys"
                        :autoExpandParent="autoExpandParent"
                        :treeData="gData"
                        >
                        <template slot="title" slot-scope="{title}">
                            <span v-if="title.indexOf(searchValue) > -1">
                                {{title.substr(0, title.indexOf(searchValue))}}
                                <span style="color: #f50">{{searchValue}}</span>
                                {{title.substr(title.indexOf(searchValue) + searchValue.length)}}
                            </span>
                            <span v-else>{{title}}</span>
                        </template>
                    </a-tree>
                </div>
            </a-col>
            <a-col :span="20">
                <formSearch :columns="searchCol" @search="handleSearch"></formSearch>
                <div class="table-operations">
                    <a-button type="primary" @click="handleAdd">添加</a-button>
                </div>
                <a-table bordered 
                    :dataSource="dataSource" 
                    :pagination="pagination"
                    :loading="loading"
                    :rowClassName="rowClassName"
                    :columns="columns">
                    <template slot="floorPlan" slot-scope="text, record" style="display: flex;">
                        <div class="editable-row-operations">
                            <img style="height:60px;max-width:100px;" :src='record.plan'/>
                        </div>
                    </template>
                    <template slot="operation" slot-scope="text, record" style="display: flex;">
                        <div class="editable-row-operations">
                            <a-button @click="() => onView(record)" type="primary" style="margin-right: 10px;">查看</a-button>
                            <a-button @click="() => onEdit(record)" style="margin-right: 10px;">编辑</a-button>
                            <a-popconfirm title="确定删除?" okText="确定" cancelText="取消" @confirm="() => onDelete(record)">
                                <a-button type="danger">删除</a-button>
                            </a-popconfirm>
                        </div>
                    </template>
                </a-table>
            </a-col>
        </a-row>
        <formDialog ref="formDialog" @submit="submit"></formDialog>
    </div>
</template>
<script>
import formDialog from '@/components/base/formDialog.vue';
import formSearch from '@/components/base/formSearch.vue';
import { findPageList, insert, update, deleteFloor, findByBuildCode } from "@/api/floor"
import { findList } from "@/api/building"
import { debuglog } from 'util';
import { mapGetters } from "vuex";
const x = 3;
const y = 2;
const z = 1;

const dataList = [];
const generateList = data => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        dataList.push({ key, title: key });
        if (node.children) {
            generateList(node.children, node.key);
        }
    }
};


const getParentKey = (title, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.title === title)) {
                parentKey = node.title;
            } else if (getParentKey(title, node.children)) {
                parentKey = getParentKey(title, node.children);
            }
        }
    }
    return parentKey;
};
export default {
    components: {
        formDialog,
        formSearch
    },
    data() {
        return {
            dataSource: [],
            pagination: {
                onChange: this.onPageChange,
                pageSize: 8,
                current:1
            },
            loading: false,
            columns: [
                {
                    title: '序号',
                    dataIndex: 'id',
                    display: true,
                    disabled:false,
                },
                {
                    title: '楼层编码',
                    dataIndex: 'floorCode',
                    rules:[
                        {
                        required: true,
                        message: '请输入楼层编码!',
                        },
                    ],
                    disabled:false,
                },
                {
                    title: '楼层面积(m²)',
                    dataIndex: 'floorArea',
                    rules:[
                        {
                        required: true,
                        message: '请输入楼层面积!',
                        },
                    ],
                    type: 'number',
                    disabled:false,
                },
                {
                    title: '楼层使用功能（用途）',
                    dataIndex: 'purpose',
                    rules:[
                        {
                        required: true,
                        message: '请选择楼层使用功能（用途）!',
                        },
                    ],
                    disabled:false,
                },
                {
                    title: '所属建筑物',
                    dataIndex: 'buildingCode',
                    editDisable: true,
                    type: 'select',
                    disData: [],
                    rules:[
                        {
                        required: true,
                        message: '请选择所属建筑物!',
                        },
                    ],
                    disabled:false,
                },
                {
                    title: '楼层平面图',
                    dataIndex: 'plan',
                    type: 'upload',
                    disabled:false,
                    scopedSlots: { customRender: 'floorPlan' },
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 250,
                    scopedSlots: { customRender: 'operation' },
                    disabled:false,
                },
            ],
            searchCol: [
                // {
                //     title: '楼层编码',
                //     dataIndex: 'floorCode',
                // }
            ],
            form: this.$form.createForm(this),
            params: {
                page:0,
                size:8,
            },
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
            gData:[],
        };
    },
    created(){
        this.findList()
    },
    mounted(){
        this.findPageList()
    },
    computed: {
        ...mapGetters([
            "rowLight",
        ]),
    },
    methods: {
        handleSearch(values) {
            this.params.page = 0
            this.pagination.current = 1
            Object.assign(this.params, values)
            this.findPageList()
        },
        handleAdd() {
            this.$refs.formDialog.showDrawer('', 'add', this.columns)
        },
        onView(record) {
            this.$refs.formDialog.showDrawer(record, 'view', this.columns)
        },
        onEdit(record){
            this.$refs.formDialog.showDrawer(record, 'edit', this.columns)
        },
        onDelete(record) {
            deleteFloor({id:record.id}).then(res => {
                if (res && res.data && res.data.success) {
                    this.$message.success('删除成功')
                    this.findPageList()
                } else {
                    this.$message.error('删除失败')
                }
            })
        },
        submit(params, handle) {
            // params.buildingCode = params.buildingCode
            if(!params.plan){
                this.$message.error('请上传楼层平面图')
                return
            }
            params.floorArea = parseInt(params.floorArea)
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
            findPageList(this.params).then(res => {
                if (res && res.data && res.data.success) {
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    res.data.value.content.forEach(s=>{
                        s.plan=this.$imgUrl+s.plan
                    })
                    this.dataSource = res.data.value.content;
                    this.pagination = pagination;
                }
                this.loading = false;
            })
        },
        onSelect(expandedKeys) {
            this.expandedKeys = expandedKeys;
            this.autoExpandParent = false;
            if (expandedKeys[0]) {
                this.findByBuildCode(expandedKeys[0])
            } else {
                this.findPageList()
            }
            
        },
        onChange(e) {
            const value = e.target.value;
            const expandedKeys = dataList.map(item => {
                let title = item.title.toString()
                if (title.indexOf(value) > -1) {
                    return getParentKey(item.title, this.gData);
                }
                return null;
            }).filter((item, i, self) => item && self.indexOf(item) === i);
            Object.assign(this, {
                expandedKeys,
                searchValue: value,
                autoExpandParent: true,
            });
            this.findByBuildCode(value)
        },
        // 获取所有建筑
        findList () {
            findList().then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.forEach(item => {
                        this.gData.push({ title: item.buildingCode, key: item.buildingCode, scopedSlots: { title: 'title' } });
                        this.columns[4].disData.push({ label: item.buildingCode, value: item.buildingCode})
                    })
                    generateList(this.gData)
                }
            })
        },
        findByBuildCode (code) {
            this.loading = true;
            findByBuildCode({buildingCode:code}).then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.forEach(s=>{
                        s.plan=this.$imgUrl+s.plan
                    })
                    this.dataSource = res.data.value;
                }
                this.loading = false;
            })
        },
        onPageChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.findPageList()
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
</style>