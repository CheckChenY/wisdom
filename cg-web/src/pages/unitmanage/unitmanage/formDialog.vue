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
			<a-form :form="form" layout="vertical" hideRequiredMark>
				<a-row :gutter="16">
					<a-col :span="12">
						<a-form-item label="单位名称">
							<a-input
								:disabled="formEdit"
								v-model="formData.orgName"
								maxLength="50"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="统一社会信用代码">
							<a-input
								:disabled="formEdit"
								v-model="formData.orgCode"
								maxLength="50"
							/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="16">
					<a-col :span="12">
						<a-form-item label="单位类型">
							<a-input
								:disabled="formEdit"
								v-model="formData.orgType"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="单位法人">
							<a-input
								:disabled="formEdit"
								v-model="formData.legalPerson"
								maxLength="45"
							/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="16">
					<a-col :span="12">
						<a-form-item label="法人电话">
							<a-input
								:disabled="formEdit"
								v-model="formData.legalPersonPhone"
								maxLength="11"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="联系人">
							<a-input
								:disabled="formEdit"
								v-model="formData.userName"
								maxLength="50"
							/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="16">
					<a-col :span="12">
						<a-form-item label="联系人电话">
							<a-input
								:disabled="formEdit"
								v-model="formData.phone"
								maxLength="11"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="所在地区">
							<a-input
								:disabled="formEdit"
								v-model="formData.position"
								maxLength="45"
							/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="16">
					<a-col :span="12">
						<a-form-item label="单位地址">
							<a-input
								:disabled="formEdit"
								v-model="formData.address"
								maxLength="100"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="经营范围">
							<a-input
								:disabled="formEdit"
								v-model="formData.businessScope"
								maxLength="500"
							/>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row :gutter="16">
					<a-col :span="12">
						<a-form-item label="营业执照">
							<div style="width:100px;height:100px;">
								<img style="width:100%;height:100%;" :src='formData.orgImg'/>
							</div>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
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
				<a-button :style="{marginRight: '8px'}" @click="onClose">
					取 消
				</a-button>
			</div>
		</a-drawer>
	</div>
</template>
<script>


export default {
	data() {
		return {
			visible: false,
			title: '添加',
			form: this.$form.createForm(this),
			formEdit: false,
			formData:{}
		};
	},
	watch: {
	},
	methods: {
		showDrawer(record, handle) {
			console.log(record)
			this.visible = true;
			this.$store.dispatch("setRowLight", record.id)
			if (handle === 'add') {
				this.formEdit = false
				this.title = '添加'
			} else if (handle === 'view') {
				this.formEdit = true
				this.title = '查看'
				this.formData=record
			} else if (handle === 'edit') {
				this.formEdit = false
				this.title = '编辑'
			}
			
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