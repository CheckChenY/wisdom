<template>
  <div class="form_dialog">
    <a-modal
        title="配置方案巡查点"
        placement="right"
        okText="确定"
        cancelText="取消"
        :closable="false"
        @cancel="onCancel"
        :afterClose="handleReset"
        :visible="visible"
		:width="1020"
        @ok="onSumbit"
        >
		<a-form :form="form" @submit="handleSearch">
            <a-row :gutter="24">
                <a-col :span="9">
                    <a-form-item label="巡查卡编码" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                        <a-input
                        v-decorator="['careCode']"
                        maxLength="45"
                        placeholder="巡查卡编码"/>
                    </a-form-item>
                </a-col>
                <a-col :span="9">
                    <a-form-item label="巡查点类型" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                        <a-select 
                            placeholder="请选择"
                            showSearch
                            optionFilterProp="children"
                            v-decorator="['patrolPointType']">
                            <a-select-option v-for="(item,index) in searchCol.persondata" :key="index" :value="item.value">{{item.label}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6" style="margin-top:-1px;">
                    <a-button type="primary" html-type="submit">
                        查询
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        清空
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
        <a-table bordered 
            :dataSource="dataSource" 
            :pagination="pagination"
            :loading="loading"
            :rowSelection="rowSelection"
            :columns="columns">
        </a-table>
    </a-modal>
  </div>
</template>
<script>
import { findPageList } from "@/api/building"
import { findDictList } from "@/api/public"
import { batchConfigPoint,notConfiguredTaskPoints } from "@/api/patrol/patrol"
import { dict } from '@/const/dict'
export default {
    components: {
    },
    data() {
        return {
			visible: false,
			dataSource: [],
            pagination: {
                onChange: this.onChange,
                pageSize: 6,
                current:1
            },
			loading: false,
			columns: [
                {
                    title: '巡查点名称',
                    dataIndex: 'patrolPointName',
                },
                {
                    title: '巡查点类型',
                    dataIndex: 'patrolPointType',
                },
                {
                    title: '巡查卡编码',
                    dataIndex: 'cardCode',
                },
                {
                    title: '所在建筑',
                    dataIndex: 'building',
                },
                {
                    title: '所在楼层/区域',
                    dataIndex: 'floor',
				},
				{
                    title: '所在位置',
                    dataIndex: 'location',
                },
			],
			searchCol: {
                persondata: []
			},
			form: this.$form.createForm(this),
			params: {
                page:0,
                size:6,
                patrolPointType:null,
                careCode:null,
                taskId:null
            },
            rowSelection:{},
            selectedRowKeys: [],
            record:{},
            patrolPointTypeList: dict.POINTTYPE
        };
    },
    watch: {
    },
    created(){
        this.params.taskId=this.record.id
        this.getDict()
    },
	mounted(){
        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.selectedRowKeys=selectedRowKeys
            },
            onSelect: (record, selected, selectedRows) => {},
            onSelectAll: (selected, selectedRows, changeRows) => {},
        };
    },
    methods: {
        showDrawer(record) {
            console.log('需要巡查的任务')
            this.record=record
			this.visible = true;
			this.getData()
        },
		handleReset() {
			this.form.resetFields();
        },
        onCancel(){
            this.visible=false
        },
		onSumbit () {
            console.log(this.record.id)
            console.log(this.selectedRowKeys.join(','))
            // this.params.taskId=this.record.id
            if(this.selectedRowKeys.length){
                batchConfigPoint({
                    ids:this.selectedRowKeys.join(','),
                    taskId:this.record.id
                }).then(res=>{
                    console.log(res)
                    if(res && res.data && res.data.success){
                        this.$message.success('添加成功')
                    }else{
                        this.$message.error('添加失败')
                    }
                    this.$emit('refresh','')
                    this.visible = false;
                })
            }else{
                this.$message.error('请选择巡查点')
            }
		},
		handleSearch(values) {
            this.params.page = 0
            this.pagination.current = 1
            this.form.validateFields((error, values) => {
                this.params.patrolPointType=values.patrolPointType?values.patrolPointType:null
                this.params.careCode=values.careCode?values.careCode:null
                this.getData()
            })
		},
		getData() {
            this.loading = true;
            console.log('查询没有巡查任务的巡查点')
            notConfiguredTaskPoints(this.params).then(res => {
                if (res && res.data && res.data.success) {
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
                    res.data.value.content.forEach(s=>{
                        s.key=s.id
                        this.patrolPointTypeList.forEach(t=>{
                            if(s.patrolPointType==t.value){
                                s.patrolPointType=t.label
                            }
                        })
                    })
                    this.dataSource = res.data.value.content;
                    this.pagination = pagination;
                }
                this.loading = false;
            })
		},
		getDict () {
            var list=[
                {label:'消火栓',value:'1'},
                {label:'防火门',value:'2'},
                {label:'安全出口',value:'3'},
                {label:'配电箱',value:'4'},
                {label:'疏散通道',value:'5'},
                {label:'灭火器',value:'6'},
                {label:'应急照明灯',value:'7'},
                {label:'消防水泵',value:'8'},
                {label:'水泵房',value:'9'},
                {label:'配电室',value:'10'},
                {label:'应急疏散标志',value:'11'},
                {label:'其他',value:'0'}
            ]
            this.searchCol.persondata = list
        },
        onChange (value) {
            this.params.page = value - 1
            this.pagination.current = value
            this.getData()
        },
    },
};
</script>
<style lang='scss'>
</style>