<template>
  <div class="form_dialog">
    <a-drawer
        title="巡查情况详情"
        placement="right"
        :closable="false"
        @close="onClose"
        :visible="visible"
		:width="720"
        >
        <a-form layout="vertical">
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-item label="巡查开始时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">{{record.startTime}}</a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="巡查结束时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">{{record.endTime}}</a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="巡查卡编码" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">{{record.cardCode}}</a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="巡查卡类型" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">{{record.patrolPointType}}</a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="巡查点名称" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">{{record.patrolPointName}}</a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="所在建筑" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">{{record.building}}</a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="楼层/区域" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">{{record.floor}}</a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="所在位置" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">{{record.location}}</a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="所属任务" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">{{record.patrolName}}</a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="巡查人" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">{{record.patrolUser}}</a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="巡查时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">{{record.patrolTime}}</a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="巡查状态" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">{{record.patrolStatus}}</a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="巡查结果" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">{{record.patrolResult}}</a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="巡查描述" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">{{record.patrolRemark}}</a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="现场图片" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
                        <img :src="record.patrolPhoto" style="width: 100px;height:100px;" v-if="record.patrolPhoto">
                    </a-form-item>
                </a-col>
            </a-row>
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
                  <a-button :style="{marginRight: '8px'}" @click="handleReset">
                      取 消
                  </a-button>
              </div>
        </a-form>
    </a-drawer>
  </div>
</template>
<script>
import { findPageList } from "@/api/building"
import { findDictList } from "@/api/public"
import { taskInfoList } from '@/api/patrol/patrol'
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
                    dataIndex: 'patrolPointTypeName',
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
                    title: '楼层/区域',
                    dataIndex: 'floor',
				},
				{
                    title: '巡查状态',
                    dataIndex: 'patrolStatus',
                },
                {
                    title: '巡查结果',
                    dataIndex: 'patrolResult',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    width: 100,
                    scopedSlots: { customRender: 'operation' },
                },
			],
			searchCol: {
                persondata: []
			},
			form: this.$form.createForm(this),
			params: {
                page:0,
                size:6,
                taskId:null
            },
            record:{},
            patrolPointTypeList: dict.POINTTYPE
        };
    },
    watch: {
	},
	created () {
	},
    methods: {
        showDrawer(record) {
            this.visible = true;
            this.record=record
            this.$store.dispatch("setRowLight", record.id)
            this.params.taskId=record.id
            this.findPageList()
        },
		handleReset() {
            this.form.resetFields();
            this.visible = false;
            this.$store.dispatch("setRowLight", '')
            this.disabled = false
        },
		handleSearch(values) {
            this.params.page = 0
            this.pagination.current = 1
            this.form.validateFields((error, values) => {
                console.log(values)
                this.params.cardCode=values.cardCode?values.cardCode:null
                this.params.patrolPointType=values.patrolPointType?values.patrolPointType:null
                this.findPageList()
            })
		},
		findPageList () {
            this.loading = true;
            taskInfoList(this.params).then(res => {
                if (res && res.data && res.data.success) {
                    res.data.value.content.forEach(item => {
                        item.key = item.id
                        this.patrolPointTypeList.forEach(s=>{
                            if(s.value==item.patrolPointType){
                                item.patrolPointTypeName=s.label
                                item.patrolStatus=item.patrolStatus==1?'已巡查':item.patrolStatus==2?'待巡查':'漏巡查'
                                item.patrolResult=item.patrolResult==1?'合格':'不合格'
                            }
                        })
                    })
                    const pagination = { ...this.pagination };
                    pagination.total = res.data.value.totalElements;
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
        onClose(){
            this.visible=false
            this.$store.dispatch("setRowLight", '')
        },
    },
};
</script>
<style lang='scss'>
</style>