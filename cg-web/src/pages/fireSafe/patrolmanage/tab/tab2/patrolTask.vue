<template>
  <div class="form_dialog">
    <a-drawer
        :title="title"
        placement="right"
        :closable="false"
        @close="handleReset"
        :visible="visible"
		destroyOnClose
		:width="720"
        >
		<a-form :form="form" layout="vertical" hideRequiredMark @submit="onSumbit">
			<a-row :gutter="16">
				<a-col :span="12" 
					style="position: relative;"
					v-show="!item.display"
					v-for="(item,index) in columns" :key="index">
					<span style="color: red;position: absolute;left:-5px;top:3px;" v-if="item.required">*</span>
					<a-form-item :label="item.title">
						<a-input
							:disabled="item.disabled"
							v-decorator="[
								item.dataIndex, {
								rules: item.rules
							}]"
							:maxLength="item.maxLength"
							@change="item.change"
							:placeholder="'请输入' + item.title"
							v-if="!item.type || item.type === 'input'"
						/>
						<a-select
							:disabled="item.disabled"
							@select="item.change"
							showSearch
                            optionFilterProp="children"
							v-decorator="[
									item.dataIndex,
									{ rules: item.rules },
								]"
								:placeholder="'请选择' + item.title"
								v-if="item.type === 'select'"
							>
							<a-select-option :value="s.value" v-for="(s, i) in item.disData" :key="i">
								{{s.label}}
							</a-select-option>
						</a-select>
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
				<a-button html-type="submit" type="primary">提 交</a-button>
			</div>
		</a-form>
    </a-drawer>
  </div>
</template>
<script>
import { listAssign } from '@/util/util'
import { safeTaskSave,getAllUserByOrgId  } from "@/api/patrol/patrol"
export default {
    data() {
        return {
			visible: false,
			columns: [
                {
                    title: '序号',
					dataIndex: 'patrolCode',
					maxLength: 45,
                    display: true,
                    disabled:false,
                },
                {
                    title: '任务名称',
                    dataIndex: 'patrolName',
                    rules:[
                        {
                        required: true,
                        message: '请输入任务名称!',
                        },
					],
					maxLength: 45,
                    required: true,
                    disabled:false,
                },{
                    title: '巡查人',
                    dataIndex: 'patrolUserId',
                    type: 'select',
                    disData: [],
                    required: true,
                    rules:[
                        {
                        required: true,
                        message: '请选择巡查人!',
                        },
                    ],
                    disabled:false,
                },
                {
                    title: '备注说明',
                    dataIndex: 'remark',
                    required: false,
                    rules:[
                        {
                        required: false,
                        message: '请输入备注说明!',
                        },
					],
					maxLength: 45,
                    disabled:false,
                },
            ],
			title: '添加',
			form: this.$form.createForm(this),
			handle: '',
			record: {},
			dialogParam: {
				handle: ''
			}
        };
	},
	props:["userList"],
    watch: {
		userList(){
			this.columns[2].disData = this.userList
		},
	},
    methods: {
        showDrawer(record, handle) {
			this.visible = true;
			this.handle = handle;
			this.$store.dispatch("setRowLight", record.id)
			this.dialogParam.handle = handle;
			this.record = record
			setTimeout(() => {
				let abc = this.form.getFieldsValue()
				if (record) {
					listAssign(abc, record)
					this.form.setFieldsValue(abc)
				}
			})
			if (handle === 'add') {
				this.columns.forEach(s=>{
					s.addDisabled?s.disabled=true:s.disabled=false
				})
				this.title = '添加'
				console.log(this.columns[3])
			} else if (handle === 'view') {
				this.columns.forEach(s=>{
					s.disabled=true
				})
				this.title = '查看'
			} else if (handle === 'edit') {
				console.log(record.patrolUserId)
				this.columns.forEach(s=>{
					if(s.editDisable){
						s.disabled=true
					}else{
						s.disabled=false
					}
				})
				this.title = '编辑'
			}
        },
		handleReset() {
			this.form.resetFields();
			this.$store.dispatch("setRowLight", '')
			this.visible = false;
        },
		onSumbit () {
            console.log(this.handle)
			this.form.validateFields((err, values) => {
				if (!err) {
					console.log(values)
					values.patrolCode=null
					values.id=this.handle=='edit'?this.record.id:null
					safeTaskSave(values).then(res=>{
						console.log(res)
						if(res && res.data && res.data.success){
							this.$message.success(this.handle=='add'?'添加成功':'修改成功')
							this.$emit('refresh','')
							this.visible = false;
						}else{
							this.$message.success(this.handle=='add'?'添加失败':'修改失败')
							this.$emit('refresh','')
							this.visible = false;
						}
					})
				}
			});
		},
    },
};
</script>
<style lang='scss'>
.form_dialog{
    .table-operations {
        text-align: left;
        margin-bottom: 16px;
    }

    .table-operations > button {
        margin-right: 8px;
    }
}
</style>