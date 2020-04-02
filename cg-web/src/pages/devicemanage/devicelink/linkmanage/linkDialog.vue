<template>
    <div>
        <a-drawer
            :title="title"
            placement="right"
            :closable="false"
            @close="onCloseDrawer"
            :visible="visible"
            :width="1010"
            >
            <span style="margin-left:8px;font-weight: bold;">(符合以下任何逻辑均可联动该设备)</span>
            <div style="display: flex;flex-wrap: wrap;width:100%;">
                <a-card v-for="(item, index) in groupData" 
                    :title="item.group.groupName" 
                    :key="index"
                    :bordered="true" style="width: 300px;height:200px;margin:10px;">
                    <p style="margin-top:10px;">触发条件数量：{{item.logicCount}}</p>
                    <div style="display: flex;justify-content:center;margin-top:40px;">
                        <a-button type="primary" @click="onView(item)" style="margin-right: 10px;width:40%;">详情</a-button>
                        <a-button type="danger" style="width:40%;" @click="deleteLinkGroup(item)">删除</a-button>
                    </div>
                </a-card>
                <a-card @click="onAdd" style="width: 300px;height:200px;margin:10px;display: flex;justify-content: center;align-items: center;cursor: pointer;">
                    <p style="width:100px;height:50px;font-size: 30px;">
                        <a-icon type="plus"/>&nbsp;添加
                    </p>
                </a-card>
                <div
                    :style="{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right',
                    }"
                >
                    <a-button :style="{marginRight: '8px'}" @click="onCloseDrawer">
                        取 消
                    </a-button>
                </div>
            </div>
            <a-modal
                title="添加逻辑"
                :visible="addGroupDialog"
                @ok="addGroupHandleOk"
                :confirmLoading="addGroupConfirmLoading"
                @cancel="addGroupCancel"
                cancelText="取消"
                okText="确定"
                width="33%"
                style="height:800px;"
            >
                <a-form class="ant-advanced-search-form" :form="formGroup" layout="vertical">
                    <a-row :gutter="18" style="margin-top:20px;">
                        <a-col :span="18">
                            <a-form-item label="逻辑名称">
                                <a-input 
                                style="margin-left:10px;margin-top:-10px;"
                                placeholder="请输入逻辑名称"
                                v-decorator="[
                                    'groupName',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '逻辑名称!',
                                            },
                                        ],
                                    },
                                ]"
                                maxLength="100"/>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-modal>
            <a-modal
            title="新建逻辑"
            :visible="groupDialog"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
            width="70%"
            style="height:800px;"
            :footer="null"
        >
                <a-form class="ant-advanced-search-form" :form="form" layout="vertical">
                    <a-row :gutter="18" style="margin-top:20px;">
                        <a-col :span="10">
                            <a-form-item label="逻辑名称">
                                <a-input 
                                style="margin-left:10px;margin-top:-10px;"
                                placeholder="请输入逻辑名称"
                                v-decorator="[
                                    'groupName',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '逻辑名称!',
                                            },
                                        ],
                                    },
                                ]"
                                :disabled="true"/>
                            </a-form-item>
                            <span style="margin-left:8px;font-weight: bold;">满足以下全部触发条件时，才能实现联动逻辑</span>
                        </a-col>
                    </a-row>
                    <a-divider style="margin-top:-10px;"/>
                    <div style="margin-bottom:50px;">
                        <a-button class="editable-add-btn" type="primary" @click="handleAdd" style="margin-bottom:20px;">触发条件</a-button>
                        <a-table :columns="columns" 
                            :dataSource="dataSource" 
                            :loading="tableloading" bordered>
                            <template
                                slot="logicName"
                                slot-scope="text, record"
                            >
                                <a-input placeholder="请输入条件名称" 
                                    maxLength="20"
                                    v-model="record.logicName"></a-input>
                            </template>
                            <template
                                slot="alarmDeviceCount"
                                slot-scope="text, record"
                            >
                                <a-select 
                                    placeholder="请选择触发条件"
                                    size="default" 
                                    style="width: 200px" 
                                    showSearch
                                    optionFilterProp="children"
                                    :defaultValue="record.alarmDeviceCount"
                                    v-model="record.alarmDeviceCount">
                                    <a-select-option v-for="i in alarmDeviceCount" :value="i.value" :key="i.value">
                                        {{i.label}}
                                    </a-select-option>
                                </a-select>
                            </template>
                            <template
                                slot="device"
                                slot-scope="text, record"
                            >
                                <div>
                                    <!-- <a-select
                                        mode="multiple"
                                        size="default"
                                        showSearch
                                        optionFilterProp="children"
                                        placeholder="请选择触发设备"
                                        :defaultValue="record.device"
                                        v-model="record.device"
                                        style="width: 200px"
                                    >
                                        <a-select-option v-for="i in deviceList" :value="i.value" :key="i.value">
                                        {{i.label}}
                                        </a-select-option>
                                    </a-select> -->
                                    <a-tree-select
                                        style="width: 300px"
                                        :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                                        :treeData="deviceList"
                                        placeholder='Please select'
                                        treeDefaultExpandAll
                                        multiple
                                        v-model="record.device"
                                        >
                                        <!-- <span style="color: #08c" slot="title" slot-scope="{key, value}" v-if="key='0-0-1'">
                                        Child Node1 {{value}}
                                        </span> -->
                                    </a-tree-select>
                                </div>
                            </template>
                            <template slot="operation" slot-scope="text, record" style="display: flex;">
                                <div class="editable-row-operations">
                                    <a-button type="primary" @click="saveLogic(record)" style="margin-right: 10px;">保存</a-button>
                                    <a-button @click="onDelete(record)" type="danger" style="margin-right: 10px;">删除</a-button>
                                </div>
                            </template>
                        </a-table>
                    </div>
                    <div
                        :style="{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                        }"
                    >
                        <!-- <a-button :style="{marginRight: '8px'}" html-type="submit" type="primary">提 交</a-button> -->
                        <a-button :style="{marginRight: '8px'}" @click="onClose">
                            取 消
                        </a-button>
                    </div>
                </a-form>
            </a-modal>
        </a-drawer>
    </div>
</template>
<script>
import { logicGroupList,insertLogicGroup,findById,saveOrUpdateLogicDetail,findNotLinkPage,deleteLogic,deleteLogicGroup } from '@/api/devicemanage/devicelink'
export default {
    components:{
        
    },
    data() {
        return {
            visible: false,
            title: '',
            count:0,            
            form: this.$form.createForm(this),
            formGroup:this.$form.createForm(this),
            alarmDeviceCount:[
                {label:'任意1个设备',value:1},
                {label:'任意2个设备',value:2},
                {label:'任意3个设备',value:3},
                {label:'任意4个设备',value:4},
                {label:'任意5个设备',value:5},
            ],
            groupData:[],
            handle:'',
            groupDialog:false,
            confirmLoading:false,
            columns:[
                {
                    title: '与',
                    dataIndex: '与',
                    customRender: (text, row, index) => {
                        if (index < 1) {
                            return <span></span>;
                        }
                        return <span style="font-weight: bold;font-size:30px;">+</span>;
                    },
                },
                {
                    title: '条件名称',
                    dataIndex: 'logicName',
                    scopedSlots: { customRender: 'logicName' },
                },
                {
                    title: '限制类型',
                    dataIndex: 'alarmDeviceCount',
                    scopedSlots: { customRender: 'alarmDeviceCount' },
                },
                {
                    title: '相关设备',
                    dataIndex: 'device',
                    scopedSlots: { customRender: 'device' },
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width:200,
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            dataSource: [],
            currentData:{},
            params:{
                deviceId:''
            },
            addGroupDialog:false,
            addGroupConfirmLoading:false,
            tableloading:false,
            deviceList:[]
        };
    },
    watch: {
        visible(){
            if(this.visible){
                this.getLogicList()
            }
        }
    },
    created(){
        
    },
    methods: {
        addGroupHandleOk(){//添加逻辑
            this.formGroup.validateFields((err, values) => {
                if(!err){
                    insertLogicGroup({
                        deviceId:this.params.deviceId,
                        groupName:values.groupName
                    }).then(res=>{
                        console.log(res)
                        if(res && res.data && res.data.success){
                            this.addGroupDialog = false;
                            this.$message.success('添加成功')
                            this.getLogicList()
                        }else{
                            this.$message.error(res.data.errorMsg)
                        }
                    })
                }
            })
        },
        addGroupCancel(){
            this.addGroupDialog = false;
        },
        getLogicList(){//get 逻辑列表
            logicGroupList(this.params).then(res=>{
                console.log(res.data.value)
                if(res && res.data && res.data.success){
                    this.groupData=res.data.value
                }
            })
        },
        onAdd(){
            this.addGroupDialog = true;
            this.$nextTick(()=>{
                this.formGroup.setFieldsValue({
                    logicGroupName:''
                })
            })
        },
        getDeviceList(){//待选设备
            findNotLinkPage().then(res=>{
                if(res && res.data && res.data.success && res.data.value && res.data.value.length){
                    this.deviceList= this.notLinkPack(res.data.value)
                }
            })
        },
        notLinkPack (value) {
            let dArr = [], fArr = {}, bArr = {}
            for (let bi = 0, len = value.length; bi < len; bi ++) {
                let b = value[bi]
                b.title = b.deviceName
                b.value = b.deviceId
                b.key = b.deviceId
                if (!fArr[b.floor]) {
                    let fObj ={
                        key: b.floor + '_' + bi.toString(),
                        title: b.floor,
                        value: b.floor,
                        children: [b]
                    }
                    fArr[b.floor] = b.floor
                    if (!bArr[b.build]) {
                        
                        let bObj ={
                            key: b.build + '_' + bi.toString(),
                            title: b.build,
                            value: b.build,
                            children: [fObj]
                        }
                        
                        dArr.push(bObj)
                        bArr[b.build] = b.build
                    } else {
                        for (let i = 0; i < dArr.length; i++) {
                            let itemd = dArr[i]
                            if (itemd.title == b.build) {
                                itemd.children.push(fObj)
                                break
                            }
                        }
                    }
                } else {
                    for (let i = 0; i < dArr.length; i++) {
                        for (let j = 0; j < dArr[i].children.length; j++) {
                            let itemd = dArr[i].children[j]
                            if (itemd.title == b.floor) {
                                itemd.children.push(b)
                                break
                            }
                        }
                    }
                }
            }
            console.log(dArr)
            return dArr
        },
        getLogicGroupDetail(){//获取逻辑-逻辑列表
            findById({
                id:this.currentData.id
            }).then(res=>{
                if(res && res.data && res.data.success && res.data.value.length){
                    res.data.value.forEach(s=>{
                        s.key=s.logicId
                        s.device=[]
                        s.deviceVos.forEach(device=>{
                            s.device.push(device.deviceId)
                        })
                    })
                }
                this.dataSource=res.data.value
                this.count=res.data.value.length
            })
        },
        onView(item){
            this.getDeviceList()
            this.currentData=item.group
            this.groupDialog = true;
            this.$nextTick(()=>{
                this.form.setFieldsValue({
                    'groupName':this.currentData.groupName
                })
            })
            this.getLogicGroupDetail()
        },
        onDelete(record) {
            if(!record.logicId){
                this.dataSource=this.dataSource.filter(s=>s.logicId)
            }else{
                console.log(record)
                console.log(this.currentData)
                deleteLogic({param:record.logicId}).then(res=>{
                    console.log(res)
                    if(res && res.data && res.data.success){
                        this.$message.success('删除成功')
                        this.getLogicGroupDetail()
                        this.getLogicList()
                    }else{
                        this.$message.error(res.data.errorMsg)
                    }
                })
            }
        },
        saveLogic(record){//添加或修改逻辑
            if(!record.logicName){
                this.$message.error('请输入逻辑名称')
                return
            }
            if(!record.alarmDeviceCount){
                this.$message.error('请选择触发条件')
                return
            }
            if(!record.device.length){
                this.$message.error('请选择触发设备')
                return
            }
            let groupId=this.currentData.id
            var obj=Object.assign({
                alarmDeviceCount:record.alarmDeviceCount,
                logicName:record.logicName,
                deviceIds:record.device.join(','),
                logicId:record.logicId?record.logicId:null,
            },{groupId:groupId})
            console.log(obj)
            saveOrUpdateLogicDetail(obj).then(res=>{
                console.log(res)
                if(res && res.data && res.data.success){
                    this.$message.success('添加成功')
                    this.getLogicGroupDetail()
                    this.getLogicList()
                }else{
                    this.$message.error(res.data.errorMsg)
                }
            })
        },
        handleAdd(){//表格添加逻辑
            console.log(this)
            const { count, dataSource } = this;
            console.log(dataSource)
            if(dataSource.length){
                console.log(dataSource.filter(s=>!s.logicId))
                if(dataSource.filter(s=>!s.logicId).length){
                    this.$message.error('请输入完整逻辑信息')
                    return
                }else{
                    const newData = {
                        key: count,
                        logicName:'',
                        alarmDeviceCount:'',
                        device:[],
                        logicId:''
                    };
                    this.dataSource = [...dataSource, newData];
                    this.count = count + 1;
                }
            }else{
                const newData = {
                    key: count,
                    logicName:'',
                    alarmDeviceCount:'',
                    device:[],
                    logicId:''
                };
                this.dataSource = [...dataSource, newData];
                this.count = count + 1;
            }
        },
        handleCancel(){
            this.groupDialog=false
        },
        deleteLinkGroup(record){//删除逻辑
            var that=this
            this.$confirm({
                title: '提示',
                content: '确定删除此联动逻辑？',
                okText:'确定',
                cancelText:'取消',
                onOk() {
                    return new Promise((resolve, reject) => {
                        deleteLogicGroup({param:record.group.id}).then(res=>{
                            if(res && res.data && res.data.success){
                                resolve();
                                that.$message.success('删除成功')
                                that.getLogicList()
                            }
                        })
                        resolve();
                    }).catch(() => console.log('Oops errors!'));
                },
                onCancel() {},
            });
        },
        showDrawer(record, handle) {
            console.log(handle)
            this.handle=handle
            this.params.deviceId=record.deviceId
            this.$store.dispatch("setRowLight",record.deviceId)
            this.title = '联动逻辑'
            this.visible = true;
        },
        onCloseDrawer(){
            this.visible = false;
            this.$store.dispatch("setRowLight",'')
        },
        onClose() {
            this.groupDialog = false;
        },
    },
};
</script>
<style lang='scss'>
    
</style>