<template>
  <div class="form_dialog">
    <a-drawer
        :title="title"
        placement="right"
        :closable="false"
        @close="onClose"
        :visible="visible"
		:width="720"
        >
		<a-form :form="form" layout="vertical" @submit="handleSubmit">
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="关联关系">
							<a-select 
							@select="relationChange"
							v-decorator="[
								'relationType',
								{
									rules: [
										{
										required: true,
										message: '关联关系!',
										},
									],
								},
							]"
							showSearch
                        	optionFilterProp="children"
							:disabled="formEdit">
								<a-select-option v-for="(item,index) in relationList" :key="index" :value="item.value">{{item.label}}</a-select-option>
							</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="上级单位名称">
							<a-select 
							v-decorator="[
								'parentCompanyId',
								{
									rules: [
										{
										required: true,
										message: '请输入上级名称!',
										},
									],
								},
							]"
							showSearch
                        	optionFilterProp="children"
							:disabled="formEdit">
								<a-select-option v-for="(item,index) in parentList" :key="index" :value="item.value">{{item.label}}</a-select-option>
							</a-select>
					</a-form-item>
				</a-col>
				
			</a-row>
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="下级单位名称">
						<a-select 
						v-decorator="[
							'childCompanyId',
							{
								rules: [
									{
									required: true,
									message: '请输入下级单位名称!',
									},
								],
							},
						]"
						showSearch
						optionFilterProp="children"
						:disabled="formEdit">
							<a-select-option v-for="(item,index) in childList" :key="index" :value="item.value">{{item.label}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="关联类型">
						<a-select 
							v-decorator="[
								'dataLevel',
								{
									rules: [
										{
										required: true,
										message: '请输入下级关联类型!',
										},
									],
								},
							]"
							showSearch
                        	optionFilterProp="children"
							:disabled="formEdit">
								<a-select-option v-for="(item,index) in dataLeveldata" :key="index" :value="item.value">{{item.value}}</a-select-option>
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
				<a-button :style="{marginRight: '8px'}" html-type="submit" type="primary" v-if="!formEdit">提 交</a-button>
				<a-button :style="{marginRight: '8px'}" @click="onClose">
					取 消
				</a-button>
			</div>
		</a-form>
    </a-drawer>
  </div>
</template>
<script>
import { insert,findOrgByType,update } from '@/api/company/companyassociation'
import { findDictList } from "@/api/public"
export default {
    data() {
        return {
			visible: false,
			title: '添加',
			form: this.$form.createForm(this),
			formEdit: false,
			relationList:[],
			parentList:[],
			childList:[],
			dataLeveldata:[{'label':'1','value':'仅看本单位'},{'label':'2','value':'透视下级单位'}],
			id:''
        };
    },
    watch: {
	},
	created(){
		findDictList({type:'company_relation'}).then(res=>{
			if(res.data.success && res.data.value.length){
				res.data.value.forEach(s=>{
					var obj={}
					obj['value']=s.value
					obj['label']=s.label
					this.relationList.push(obj)
				})
			}
			console.log(this.relationList)
		})
	},
    methods: {
		relationChange(e){
			console.log(e)
			this.form.setFieldsValue({
				'parentCompanyId':'',
				'childCompanyId':'',
			});
			this.relationList.forEach(s=>{
				if(s.value==e){
					let parent=s.label.split('查看')[0]
					let child=s.label.split('查看')[1]
					var parentType=parent=='社管'?'1':parent=='监管'?'2':parent=='总公司'?'3':'4'
					var childType=child=='社管'?'1':child=='监管'?'2':child=='总公司'?'3':'4'
					findOrgByType({orgType:parentType}).then(res=>{
						console.log(res)
						if(res.data.success && res.data.value.length){
							this.parentList=[]
							res.data.value.forEach(p=>{
								var obj={}
								obj['value']=p.id
								obj['label']=p.orgName
								this.parentList.push(obj)
							})
						}
					})
					findOrgByType({orgType:childType}).then(res=>{
						console.log(res)
						if(res.data.success && res.data.value.length){
							this.childList=[]
							res.data.value.forEach(p=>{
								var obj={}
								obj['value']=p.id
								obj['label']=p.orgName
								this.childList.push(obj)
							})
						}
					})
				}
			})
		},
		handleSubmit(e){
			e.preventDefault();
			this.form.validateFields((error, values) => {
				if(!error){
					this.relationList.forEach(s=>{
						if(s.value==values.relationType){
							values.relationType=s.label
						}
					})
					if(values.dataLevel === '仅看本单位'){
						values.dataLevel = '1'
					}else{
						values.dataLevel = '2'
					}
					console.log(values)
					if(this.title=='添加'){
						insert(values).then(res=>{
							console.log(res)
							if(res && res.data && res.data.success){
								this.visible = false
								this.$emit('refresh','')
								this.$message.success('关联成功')
							}else{
								this.$message.error(res.data.errorMsg)
							}
						})
					}else{
						values.id=this.id
						update(values).then(res=>{
							console.log(res)
							if(res && res.data && res.data.success){
								this.visible = false
								this.$emit('refresh','')
							}else{
								this.$message.error(res.data.msg)
							}
						})
					}
				}
			});
		},
        showDrawer(record, handle) {
			console.log(record)
			this.id=record.id
			this.$store.dispatch("setRowLight", record.id)
			this.visible = true;
			this.$nextTick(()=>{
				if (handle === 'add') {
					this.formEdit = false
					this.title = '添加'
					this.form.resetFields();
					this.parentList=[]
					this.childList=[]
				} else if (handle === 'view') {
					this.formEdit = true
					this.title = '查看'
					this.parentList=[{
						value:record.parentCompanyId,
						label:record.parentCompanyName
					}]
					this.childList=[{
						value:record.childCompanyId,
						label:record.childCompanyName
					}]
					this.form.setFieldsValue({
						'parentCompanyId':record.parentCompanyId,
						'childCompanyId':record.childCompanyId,
						'relationType':record.relationType,
						'dataLevel':record.dataLevel === '1' ? '仅看本单位' : '透视下级单位',
					});
				} else if (handle === 'edit') {
					this.formEdit = false
					this.title = '编辑'
					this.parentList=[{
						value:record.parentCompanyId,
						label:record.parentCompanyName
					}]
					this.childList=[{
						value:record.childCompanyId,
						label:record.childCompanyName
					}]
					// this.dataLeveldata=[{
					// 	value:record.dataLevel,
					// 	label:record.childCompanyName
					// }]
					this.form.setFieldsValue({
						'parentCompanyId':record.parentCompanyId,
						'childCompanyId':record.childCompanyId,
						'relationType':record.relationType,
						'dataLevel':record.dataLevel === '1' ? '仅看本单位' : '透视下级单位',
					});
				}
			})
        },
        onClose() {
			this.visible = false;
			this.$store.dispatch("setRowLight", '')
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