<template>
  <div class="form_search">
		<a-form :form="form" layout="inline" @submit="handleSearch" v-if="columns && columns.length > 0">
			<a-row>
				<a-col :span="label?label:6" 
					v-show="!item.display"
					v-for="(item,index) in columns" :key="index">
					<a-form-item :label="item.title">
						<a-input
							v-decorator="[item.dataIndex]"
							:placeholder="'请输入' + item.title"
							v-if="!item.type || item.type === 'input'"
						/>
						<a-select
							v-decorator="[item.dataIndex]"
							:placeholder="'请选择' + item.title"
							@change="item.change"
							showSearch
							optionFilterProp="children"
							style="width:194px"
							v-if="item.type === 'select'"
							>
							<a-select-option :value="s.value" v-for="(s, i) in item.disData" :key="i">
								{{s.label}}
							</a-select-option>
						</a-select>
						<a-date-picker
							v-decorator="[item.dataIndex]"
							:placeholder="'请选择' + item.title"
							v-if="item.type === 'date'"
							/>
						<a-time-picker v-decorator="[item.dataIndex]"
							:placeholder="'请选择' + item.title"
							v-if="item.type === 'time'">
						</a-time-picker>
					</a-form-item>
				</a-col>
				<a-col :span="3">
					<a-button type="primary" html-type="submit">
						查 询
					</a-button>
					<a-button :style="{ marginLeft: '8px' }" @click="handleReset">
						清 空
					</a-button>
				</a-col>
			</a-row>
		</a-form>
  </div>
</template>
<script>
export default {
	props: ['columns', 'label'],
    data() {
        return {
			form: this.$form.createForm(this),
        };
    },
    watch: {
	},
    methods: {
		handleSearch(e) {
            e.preventDefault();
			let values = this.form.getFieldsValue()
			this.$emit('search', values)
		},
		handleReset() {
            this.form.resetFields();
        },
    },
};
</script>
<style lang='scss'>
.form_search{
    margin-bottom: 8px;
}
</style>