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
							:maxLength="item.maxLength"
							:placeholder="'请输入' + item.title"
							v-if="!item.type || item.type === 'input'"
						/>
						<div @click="item.click" v-if="item.type === 'div'">
							<a-input
								:disabled="true"
								v-decorator="[
									item.dataIndex, {
									rules: item.rules
								}]"
								:placeholder="'请选择' + item.title"
							/>
						</div>
						<a-select
							:disabled="item.disabled"
							showSearch
							@change="item.change"
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
							<a-button v-if="!record.surroundingPhoto"> <a-icon type="upload" />上传</a-button>
							<img v-if="record.surroundingPhoto" style="height:100px;cursor: pointer;" :src="record.surroundingPhoto"/>
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
import { listAssign } from '@/util/util'
import { insertByUser, update, findByDeviceCode } from "@/api/devicemanage/devicemanage/devicelib"
import { findByBuildCode } from "@/api/floor"


export default {
	props:["pointSign"],
    data() {
        return {
			visible: false,
			columns: [],
			title: '添加',
			form: this.$form.createForm(this),
			handle: '',
			uploadKey: '',
			record: {},
			deviceInfo: {},
        };
    },
    watch: {
		pointSign(){
			this.form.setFieldsValue({
				pointSign:this.pointSign
			})
		}
	},
	created () {
	},
	mounted(){
		
	},
    methods: {
        showDrawer(record, handle, columns) {
			this.$store.dispatch("setRowLight",record.id)
			var that=this
			columns[8].click=function(){
				if(!that.form.getFieldsValue().floorId){
					that.$message.error('请选择区域/楼层')
				}else{
					that.$emit('showPoint',record.pointSign)
				}
			}
			if (handle == 'edit') {
				columns[6].disData=[]
				findByBuildCode({buildingCode:record.buildingCode}).then(res => {
					if (res && res.data && res.data.success) {
						res.data.value.forEach(item => {
							let obj = { 
								label: item.floorCode,
								value: item.id, 
								img: item.plan
							}
							columns[6].disData.push(obj);
							if(item.id==record.floorId){
								that.$emit('imgUrl',item.plan)
							}
						})
					}
				})
			}
			columns[5].change=function(buildingId){
				columns[6].disData=[]
				let obj = columns[5].disData.filter(item => item.value === buildingId)[0]
				findByBuildCode({buildingCode:obj.label}).then(res => {
					if (res && res.data && res.data.success) {
						res.data.value.forEach(item => {
							let obj = { 
								label: item.floorCode,
								value: item.id, 
								img: item.plan
							}
							columns[6].disData.push(obj);
						})
					}
				})
			}
			columns[6].change=function(floorId){
				if(floorId){
					columns[6].disData.forEach(s=>{
						if(s.value==floorId){
							that.$emit('imgUrl',s.img)
						}
					})
				}
			}
			this.visible = true;
			this.handle = handle;
			this.columns = columns.filter(item => item.dataIndex != 'operation');
			this.record = record
			setTimeout(() => {
				let abc = this.form.getFieldsValue()
				if (record) {
					listAssign(abc, record)
					this.form.setFieldsValue(abc)
				}
			})
			columns[0].change = (value) => {
				findByDeviceCode({deviceCode:value.target.value}).then(res => {
					if (res.data.value) {
						this.deviceInfo = res.data.value
						this.form.setFieldsValue(res.data.value)
						this.form.setFieldsValue({
							deviceType: this.deviceInfo.type,
							deviceModel: this.deviceInfo.model,
							systemCode: this.deviceInfo.system,
						})
					}
				})
            }
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
			this.$store.dispatch("setRowLight","")
			this.form.resetFields();
			this.visible = false;
        },
		onSumbit () {
			this.form.setFieldsValue({
				deviceType: this.deviceInfo.deviceType,
				deviceModel: this.deviceInfo.deviceModel,
				systemCode: this.deviceInfo.systemCode,
			})
			this.form.validateFields((err, values) => {
				if (this.record) {
					values = Object.assign(this.record,values)
				}
				if (values[this.uploadKey]) {
					values[this.uploadKey] = values[this.uploadKey].fileList[0].response.value.fileName
				}
				if (!err) {
					values = Object.assign(this.deviceInfo, values)
					if (this.handle === 'add') {
						insertByUser(values).then(res => {
							if (res && res.data && res.data.success) {
								this.$message.success('添加成功')
								this.$emit('submit')
							} else {
								this.$message.error(res.data.errorMsg)
							}
							this.visible = false;
						})
					} else if (this.handle === 'edit') {
						update(values).then(res => {
							if (res && res.data && res.data.success) {
								this.$message.success('修改成功')
								this.$emit('submit')
							} else {
								this.$message.error('修改失败')
							}
							this.visible = false;
						})
					}
				}
			});
		},
		handleChange(item) {
			this.uploadKey = item.dataIndex
			let value = this.form.getFieldValue(item.dataIndex)
			if (value && value.fileList && value.fileList.length > 1) {
				value.fileList.shift()
			}
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