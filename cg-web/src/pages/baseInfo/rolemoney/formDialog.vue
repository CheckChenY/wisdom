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
			<a-form :form="form" layout="vertical" @submit="onSubmit" hideRequiredMark>
				<a-row :gutter="16">
					<a-col :span="12">
						<a-form-item label="功能包名称">
							<a-input
								:disabled="formEdit"
								v-decorator="[
									'packageName',
									{
										rules: [
											{
											required: true,
											message: '请输入功能包名称!',
											},
										],
									},
								]"
								maxLength="40"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="功能包价格">
							<a-input
								:disabled="formEdit"
								v-decorator="[
									'packagePrice',
									{
										rules: [
											{
											required: true,
											message: '请输入功能包价格!',
											},
										],
									},
								]"
								type="number"
								maxLength="10"
							/>
						</a-form-item>
					</a-col>
				</a-row>
				<!-- <a-row :gutter="16">
					<a-col :span="12">
						<a-form-item label="授权期限">
							<a-input
								:disabled="formEdit"
								v-decorator="[
									'authPeriod',
									{
										rules: [
											{
											required: true,
											message: '请输入授权期限!',
											},
										],
									},
								]"
								maxLength="10"
							/>
						</a-form-item>
					</a-col>
				</a-row> -->
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
import { insert,update } from '@/api/rolemoney'
export default {
	data() {
		return {
			visible: false,
			title: '添加',
			form: this.$form.createForm(this),
			formEdit: false,
			handle:'',
			id:''
		};
	},
	watch: {
	},
	methods: {
		showDrawer(record, handle) {
			console.log(record)
			this.handle=handle
			this.$store.dispatch("setRowLight",record.id)
			this.visible = true;
			if (handle === 'add') {
				this.formEdit = false
				this.title = '添加'
				this.form.setFieldsValue({
					'packageName':'',
					'packagePrice':'',
					'authPeriod':'',
				});
			} else if (handle === 'view') {
				this.formEdit = true
				this.title = '查看'
				console.log(record)
				this.$nextTick(()=>{
					this.form.setFieldsValue({
						'packageName':record.packageName,
						'packagePrice':record.packagePrice,
						'authPeriod':record.authPeriod,
					});
				})
			} else if (handle === 'edit') {
				this.formEdit = false
				this.title = '编辑'
				this.id=record.id
				this.$nextTick(()=>{
					this.form.setFieldsValue({
						'packageName':record.packageName,
						'packagePrice':record.packagePrice,
						'authPeriod':record.authPeriod,
					});
				})
			}
			
		},
		onClose() {
			this.visible = false;
			this.$store.dispatch("setRowLight",'')
		},
		onSubmit(e){
			e.preventDefault();
			this.form.validateFields((error, values) => {
				if(!error){
					console.log(values)
					if(this.handle=='add'){
						insert(values).then(res=>{
							if(res && res.data && res.data.success){
								this.$message.success('添加成功')
								this.visible = false;
								this.$emit('result','')
							}else{
								this.$message.error(res.data.errorMsg)
							}
						})
					}
					if(this.handle=='edit'){
						values.id=this.id
						update(values).then(res=>{
							if(res && res.data && res.data.success){
								this.$message.success('修改成功')
								this.visible = false;
								this.$emit('result','')
							}else{
								this.$message.error(res.data.errorMsg)
							}
						})
					}
				}
			})
		}
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