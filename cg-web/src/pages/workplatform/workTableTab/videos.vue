<template>
    <div>
        <a-row>
            <a-col :span="24" style="height:328px;overflow:auto;">
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
                            <a-button @click="() => onRemote(record)" type="primary" style="margin-right: 10px;">视频</a-button>
                            <!-- <a-button @click="() => onThresold(record)" type="primary" style="margin-right: 10px;">回看</a-button> -->
                        </div>
                    </template>
                </a-table>
            </a-col>
        </a-row>
        <firesurveilDialog ref="firesurveilDialog"></firesurveilDialog>
        <firesurveilLive ref="firesurveilLive"></firesurveilLive>
    </div>
</template>

<script>

import { getDeviceFindList } from '@/api/public'
import { dict } from '@/const/dict'
import { findCamcerPageList } from '@/api/monitor/monitor'
import firesurveilDialog from '../../monitor/firesurveil/firesurveilDialog';
import firesurveilLive from '../../monitor/firesurveil/firesurveilLive';
export default {
    name:'tab3',
    components:{
        firesurveilDialog:firesurveilDialog,
        firesurveilLive:firesurveilLive
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
                {
                    title: '所在建筑',
                    dataIndex: 'buildingName',
                },
                {
                    title: '楼层/区域',
                    dataIndex: 'floorName',
                },
                {
                    title: '具体位置',
                    dataIndex: 'location',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 310,
                    scopedSlots: { customRender: 'operation' },
                    fixed:'right'
                },
            ],
            // deviceTypeList:[],
            // deviceModelList:[],
            form: this.$form.createForm(this, { name: 'advanced_search' }),
            params:{
                page:0,
                size:30,
            },
        }
    },
    watch:{

    },
    created(){
        // this.getDictData()
    },
    mounted(){
        this.getData(this.params)
    },
    methods:{
        
        refresh(){
            this.getData()
        },

        getData(params){
            findCamcerPageList(params).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    if(res.data.value.content && res.data.value.content.length){
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
        onChange (value) {
            this.params.page = value - 1
            this.getData(this.params)
        },
        onView(record) {
            console.log(record)
            this.$refs.firesurveilDialog.showDrawer(record)
        },
        onRemote(record){
            console.log(record)
            this.$refs.firesurveilLive.showDrawer(record)
        }
    },
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