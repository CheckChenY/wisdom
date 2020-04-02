<template>
    <div class="child_unit">
        <formSearch :columns="searchCol" @search="handleSearch"></formSearch>
        <a-table bordered 
            :dataSource="dataSource" 
            :pagination="pagination"
            :loading="loading"
            :rowClassName="rowClassName"
            :columns="columns">
            <template slot="deviceType" slot-scope="text, record" style="display: flex;">
                {{deviceTypeObj[record.deviceType]}}
            </template>
            <template slot="operation" slot-scope="text, record" style="display: flex;">
                <div class="editable-row-operations">
                    <a-button @click="() => setThresh(record)" style="margin-right: 10px;">配置阈值</a-button>
                </div>
            </template>
        </a-table>
        <threshinitDialog ref="threshinitDialog"></threshinitDialog>
    </div>
</template>
<script>
import threshinitDialog from './threshinitDialog.vue';
import formSearch from '@/components/base/formSearch.vue';
import { columns } from '@/const/threshinit/threshinit.js';
import { findByParentList } from "@/api/devicemanage/deviceinit/devicedict"
import { findPageList } from "@/api/devicemanage/threshinit/threshinit"
import { getDeviceFindList, findLicense } from '@/api/public'
import { mapGetters } from "vuex";
export default {
    components: {
        threshinitDialog,
        formSearch
    },
    data() {
        return {
            dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize: 8,
                current: 1
            },
            loading: false,
            columns: columns,
            deviceTypeObj: {},
            searchCol: [
                {
                    title: '协议号',
                    dataIndex: 'licence',
                    type: 'select',
                    disData: []
                },{
                    title: '所属系统',
                    dataIndex: 'deviceSystem',
                    change: this.systemChange,
                    type: 'select',
                    disData: []
                },{
                    title: '设备类型',
                    dataIndex: 'deviceType',
                    change: this.typeChange,
                    type: 'select',
                    disData: []
                },{
                    title: '设备型号',
                    dataIndex: 'deviceModel',
                    type: 'select',
                    disData: []
                }
            ],
            form: this.$form.createForm(this),
            params: {
                page: 0,
                size: 8
            }
        };
    },
    created(){
        this.findPageList()
    },
    mounted () {
        this.getDict()
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
            values.licence = values.licence?values.licence.replace(',', ''):null
            Object.assign(this.params, values)
            this.findPageList()
        },
        setThresh(record){
            this.$refs.threshinitDialog.showDrawer(record)
        },
        getDict () {
            this.deviceTypeObj = []
            getDeviceFindList({type:1}).then(res=>{
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                        this.searchCol[1].disData = res.data.value
                    }
                }
            })
            findLicense({}).then(res=>{
                if (res && res.data && res.data.success) {
                    let arr = []
                    res.data.value.forEach(item => {
                        let obj = {}
                        obj.value = item + ","
                        obj.label = item
                        arr.push(obj)
                    })
                    this.searchCol[0].disData = arr
                }
            })
        },
        systemChange (value) {
            getDeviceFindList({type:2,id:value}).then(res=>{
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                        this.searchCol[2].disData = res.data.value
                    }
                }
            })
        },
        typeChange (value) {
            getDeviceFindList({type:3,id:value}).then(res=>{
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                        this.searchCol[3].disData = res.data.value
                    }
                }
            })
        },
        findPageList () {
            this.loading = true;
            findPageList(this.params).then(res => {
                if (res && res.data && res.data.success) {
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    res.data.value.content = res.data.value.content?res.data.value.content:[]
                    res.data.value.content.forEach(item => {
                        item.modelImg = this.$imgUrl + item.modelImg
                    })
                    this.dataSource = res.data.value.content;
                    this.pagination = pagination;
                }
                this.loading = false;
            })
        },
        onChange (value) {
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