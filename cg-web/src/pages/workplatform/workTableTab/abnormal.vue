<template>
    <div>
        <a-row>
            <a-col :span="24">
                <a-form :form="form" @submit="handleSearch">
                    <a-row :gutter="24">
                        <a-col :span="6">
                            <a-form-item label="所属系统">
                                <a-select 
                                    placeholder="请选择"
                                    @select="systemChange"
                                    showSearch
                                    optionFilterProp="children"
                                    v-decorator="['systemCode']">
                                    <a-select-option v-for="(item,index) in systemList" :value="item.value" :key="index">{{item.label}}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="设备类型">
                                <a-select 
                                    placeholder="请选择"
                                    @select="typeChange"
                                    showSearch
                                    optionFilterProp="children"
                                    v-decorator="['deviceType']">
                                    <a-select-option v-for="(item,index) in deviceTypeList" :value="item.value" :key="index">{{item.label}}</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="设备状态">
                                    <a-select 
                                        placeholder="请选择"
                                        showSearch
                                        optionFilterProp="children"
                                        v-decorator="['warnState']">
                                        <a-select-option v-for="(item,index) in warnStateList" :key="index" :value="item.value">{{item.label}}</a-select-option>
                                    </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6" style="margin-top: 45px;">
                            <a-button type="primary" size="small" html-type="submit">
                                查询
                            </a-button>
                            <a-button :style="{ marginLeft: '8px' }" size="small" @click="handleReset">
                                清空
                            </a-button>
                        </a-col>
                    </a-row>
                </a-form>
                <a-row>
                    <a-col :span="24" style="height:226px;overflow:auto;">
                        <a-table bordered 
                            :dataSource="dataSource" 
                            :pagination="false"
                            size="small"
                            :columns="columns">
                            <template slot="status" slot-scope="text, record" style="display: flex;">
                                <a-switch defaultChecked @change="onChange" v-model="record.commStatus"/>
                            </template>
                            <template slot="operation" slot-scope="text, record" style="display: flex;">
                                <div class="editable-row-operations">
                                    <a-button @click="() => onView(record)" type="text" style="margin-right: 10px;">查看</a-button>
                                    <a-button @click="() => onRemote(record)" type="primary" style="margin-right: 10px;">远程操作</a-button>
                                    <a-button @click="() => onThresold(record)" type="primary" style="margin-right: 10px;">阈值修改</a-button>
                                </div>
                            </template>
                        </a-table>
                    </a-col>
                </a-row>
                <CurrentdataDialog  ref="CurrentdataDialog" ></CurrentdataDialog>

                <currentdataRemote ref="currentdataRemote" @refresh="refresh"></currentdataRemote>
                <currentdataThresold ref="currentdataThresold" @refresh="refresh"></currentdataThresold>

                <checkmodal ref="checkmodal" @closeModal="closeModal"></checkmodal>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { dict } from '@/const/dict'
import { findDeviceNormal } from '@/api/monitor/monitor'
import { getDeviceFindList } from '@/api/public'
import CurrentdataDialog from './videoDialog/currentdataDialog.vue';

import currentdataThresold from '../../monitor/currentdata/currentdataThresold.vue';
import currentdataRemote from '../../monitor/currentdata/currentdataRemote.vue';

import checkmodal from '@/components/public/checkmodal.vue';
export default {
    name:'tab1',
    components:{
        CurrentdataDialog:CurrentdataDialog,
        checkmodal:checkmodal,
        currentdataRemote:currentdataRemote,
        currentdataThresold:currentdataThresold
    },
    data(){
        return{
            dataSource: [],
            columns: [
                {
                    title: '设备ID',
                    dataIndex: 'deviceId',
                    fixed:'left',
                    width:150
                },
                {
                    title: '设备名称',
                    dataIndex: 'deviceName',
                    fixed:'left',
                    width:150
                },
                {
                    title: '设备型号',
                    dataIndex: 'deviceModel',
                },
                {
                    title: '设备类型',
                    dataIndex: 'deviceType',
                },
                {
                    title: '所属系统',
                    dataIndex: 'systemCode',
                },
                // {
                //     title: '所在建筑',
                //     dataIndex: 'model',
                // },
                // {
                //     title: '楼层/区域',
                //     dataIndex: 'floorId',
                // },
                // {
                //     title: '具体位置',
                //     dataIndex: 'location',
                // },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 310,
                    scopedSlots: { customRender: 'operation' },
                    fixed:'right'
                },
            ],
            systemList:[],
            deviceTypeList:[],
            warnStateList:dict.USESTATE,
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                size:30,
                state:1
            },
        }
    },
    watch:{

    },
    created(){
        this.getDictData()
    },
    mounted(){
        this.getData()
    },
    methods:{
        refresh(){
            this.getData()
        },
        getData(){
            findDeviceNormal(this.params).then(res=>{
                if(res && res.data && res.data.success){
                    if(res.data.value.content && res.data.value.content.length){
                        console.log(res.data.value.content)
                        res.data.value.content.forEach(s=>{
                            s.key=s.id
                            let warn = dict.USESTATE.filter(item => item.value == s.warnState)
                            s.warnState = warn.length>0?warn[0].label:''
                        })
                    }
                    this.dataSource=res.data.value.content
                }else{
                    this.dataSource=[]
                }
            })
        },
        getDictData(){
            getDeviceFindList({type:1}).then(res=>{
                this.systemList=[]
                if(res && res.data && res.data.value){
                    console.log(res.data.value)
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                        this.systemList=res.data.value
                    }
                }
            })
        },
        
        systemChange (value) {
            getDeviceFindList({type:2,id:value}).then(res=>{
                this.deviceTypeList=[]
                if(res && res.data && res.data.value){
                    if(res.data.value.length){
                        res.data.value.forEach(s=>{
                            s.label=s.dataDicDesc
                            s.value=s.id
                        })
                        this.deviceTypeList=res.data.value
                    }
                }
            })
        },
        typeChange(value){
            console.log(value)
        },
        onChange (value) {
            this.params.page = value - 1
            this.getData()
        },
        onRemote(record){
            this.$refs.checkmodal.showModal(record, 'Remote')
        },
        onView(record) {
            this.$refs.CurrentdataDialog.showDrawer(record)
        },
        onThresold(record){
            this.$refs.checkmodal.showModal(record, 'Thresold')
        },
        
        closeModal(record, value) {
            if (value == 'Thresold') {
                this.$refs.currentdataThresold.showDrawer(record)
            } else if (value == 'Remote'){
                this.$refs.currentdataRemote.showDrawer(record)
            }
        },
        handleReset() {
            this.form.resetFields();
            this.expireDate=null
        },
        handleSearch(e) {
            e.preventDefault();
            this.form.validateFields((error, values) => {
                this.params.page = 0
                Object.assign(this.params, values)
                console.log(Object.assign(this.params, values))
                this.getData()
            });
        },

    }
}
</script>
<style lang="scss">
    .content_left{
        border:1px #ebeef5 solid;
        background-color: #ffffff;
        margin: 10px;
        padding: 2px;
    }
</style>