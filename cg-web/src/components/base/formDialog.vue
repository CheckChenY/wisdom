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
					v-show="!item.display"
					v-for="(item,index) in columns" :key="index">
					<a-form-item :label="item.title">
						<a-input
							:disabled="item.disabled"
							v-decorator="[
								item.dataIndex, {
								rules: item.rules
							}]"
							@change="item.change"
							:placeholder="'请输入' + item.title"
							v-if="!item.type || item.type === 'input'"
						/>
						<a-input-number
							:disabled="item.disabled"
							v-decorator="[
								item.dataIndex, {
								rules: item.rules
							}]"
							@change="item.change"
							:placeholder="'请输入' + item.title"
							v-if="item.type === 'number'"
							style="width: 100%"
						/>
						<a-select
							:disabled="item.disabled"
							@change="item.change"
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
						<a-switch :disabled="item.disabled" 
							v-decorator="[item.dataIndex, { valuePropName: 'checked' }]" 
							v-if="item.type === 'switch'"/>
						<a-radio-group
							:disabled="item.disabled"
							v-decorator="[
								item.dataIndex,
								{ rules: item.rules },
								]"
								v-if="item.type === 'radio'"
							>
							<a-radio :value="s.value" v-for="(s, i) in item.disData" :key="i">
								{{s.label}}
							</a-radio>
						</a-radio-group>
						<a-checkbox-group
							:disabled="item.disabled"
							v-decorator="[
									item.dataIndex,
									{ rules: item.rules },
								]"
								v-if="item.type === 'checkbox'"
							>
							<a-checkbox :value="s.value" v-for="(s, i) in item.disData" :key="i">
								{{s.label}}
							</a-checkbox>
						</a-checkbox-group>
						<a-upload
							:disabled="item.disabled"
							v-decorator="[
								item.dataIndex,
								{ rules: item.rules }
							]"
							name="file"
							action="/pub/open/file/addFile"
							@change="handleChange(item)"
							v-if="item.type === 'upload'"
							>
							<a-button v-if="!record[item.dataIndex]"> <a-icon type="upload" />上传</a-button>
							<img v-if="record[item.dataIndex]" style="height:100px;cursor: pointer;" :src="record[item.dataIndex]"/>
						</a-upload>
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
import { listAssign, deepClone } from '@/util/util'
import { debuglog } from 'util';
import { setTimeout } from 'timers';

export default {
    data() {
        return {
			visible: false,
			columns: [],
			title: '添加',
			form: this.$form.createForm(this),
			handle: '',
			uploadKey: '',
			record: {},
        };
    },
    watch: {
	},
	created () {
	},
    methods: {
        showDrawer(record, handle, columns) {
			this.visible = true;
			this.handle = handle;
			this.columns = columns.filter(item => item.dataIndex != 'operation');
			this.record = deepClone(record)
			this.$store.dispatch("setRowLight",record.id)
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
			} else if (handle === 'view') {
				this.columns.forEach(s=>{
					s.disabled=true
				})
				this.title = '查看'
			} else if (handle === 'edit') {
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
			this.$store.dispatch("setRowLight",'')
			this.visible = false;
        },
		onSumbit () {
			this.form.validateFields((err, values) => {
				if (this.record) {
					values = Object.assign(this.record, values)
				}
				if (values[this.uploadKey]) {
					values[this.uploadKey] = values[this.uploadKey].fileList[0].response.value.fileName
				}
				if (!err) {
					console.log(values)
					this.$emit('submit', values, this.handle)
					this.visible = false;
				}
			});
		},
		handleChange(item) {
			this.uploadKey = item.dataIndex
			let value = this.form.getFieldValue(item.dataIndex)
			if (value && value.fileList && value.fileList.length > 1) {
				value.fileList.shift()
			}
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