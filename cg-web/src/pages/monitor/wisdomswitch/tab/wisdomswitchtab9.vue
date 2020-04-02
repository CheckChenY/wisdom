<template>
    <div class="child_unit">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="10">
                    <a-form-item label="开始日期">
                        <a-date-picker
                            v-model="params.starttime"
                            type="date"
                            class="status_date_pick"
                            placeholder="选择日期">
                        </a-date-picker>
                    </a-form-item>
                </a-col>
                <a-col :span="10">
                    <a-form-item label="结束日期">
                        <a-date-picker
                            v-model="params.endtime"
                            type="date"
                            class="status_date_pick"
                            placeholder="选择日期">
                        </a-date-picker>
                    </a-form-item>
                </a-col>
                <a-col :span="10">
                    <a-form-item label="操作用户">
                            <a-select 
                                placeholder="请选择"
                                showSearch
                                optionFilterProp="children"
                                v-decorator="['userId']">
                                <a-select-option v-for="(item,index) in userList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                            </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="5" style="margin-top: 3px;">
                    <a-button type="primary" html-type="submit">
                        查询
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        清空
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
        <a-table 
            bordered 
            :dataSource="dataSource" 
            :pagination="pagination"
            :loading="loading"
            :columns="columns">
        </a-table>
    </div>
</template>
<script>
import { getUsers } from "@/api/public"
import { findListByDeviceIdWeb } from '@/api/monitor/monitor'
import { mapGetters } from "vuex";
import moment from 'moment';

export default {
    props: ["paramData","tabnum"],
    components: {
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
            columns: [
                {
                    title: '时间',
                    dataIndex: 'createTime',
                },
                {
                    title: '操作用户',
                    dataIndex: 'userName',
                },
                {
                    title: '操作详情',
                    dataIndex: 'operationDesc',
                },
                {
                    title: '操作结果',
                    dataIndex: 'operationResult',
                },
            ],
            form: this.$form.createForm(this),
            params: {
                page: 0,
                pageSize: 8,
                deviceId: '',
                starttime: moment(new Date(), 'YYYY-MM-DD'),
                endtime: moment(new Date(), 'YYYY-MM-DD'),
                dateTime: null,
                endTime: null,
            },
            userList: []
        };
    },
    computed: {
        ...mapGetters([
            "orgInfo",
        ]),
    },
    watch: {
        'paramData.deviceId':function(val, oval){
            this.params.deviceId = this.paramData.deviceId
            this.findListByDeviceIdWeb()
        },
        tabnum(){
            if(this.tabnum==7){
                this.params.deviceId = this.paramData.deviceId
                this.findListByDeviceIdWeb()
            }
        }
    },
    created(){
        this.params.deviceId = this.paramData.deviceId
        this.findListByDeviceIdWeb()
    },
    mounted () {
        this.getDict()
    },
    methods: {
        handleSearch(e) {
            e.preventDefault();
            this.params.dateTime = this.params.starttime?this.params.starttime.format('YYYY-MM-DD'):null
            this.params.endTime = this.params.endtime?this.params.endtime.format('YYYY-MM-DD'):null
            this.form.validateFields((error, values) => {
                this.params.page = 0
                this.pagination.current = 1
                Object.assign(this.params, values)
                this.findListByDeviceIdWeb()
            });
        },
        handleReset() {
            this.form.resetFields();
        },
        getDict () {
            getUsers({orgId:this.orgInfo.id}).then(res => {
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.realName
                            s.value=s.id
                        })
                    }
                    this.userList = res.data.value
                }
            })
        },
        findListByDeviceIdWeb () {
            this.loading = true;
            delete this.params.starttime
            delete this.params.endtime
            findListByDeviceIdWeb(this.params).then(res => {
                if (res && res.data && res.data.success) {
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    res.data.value.content = res.data.value.content?res.data.value.content:[]
                    res.data.value.content.forEach(item => {
                        item.key=item.id
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
            this.findListByDeviceIdWeb()
        },
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