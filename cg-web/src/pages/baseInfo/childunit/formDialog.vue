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
                <a-col :span="12" v-show="false">
					<a-form-item>
						<a-input
							v-decorator="[
								'id',
							]"
                            maxLength="20"
						/>
					</a-form-item>
				</a-col>
                <a-col :span="12" v-show="false">
					<a-form-item>
						<a-input
							v-decorator="[
								'oldRole',
							]"
                            maxLength="100"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="账号">
						<a-input
							:disabled="formEdit"
							v-decorator="[
								'userName',
								{
									rules: [
										{
                                            required: true,
                                            message: '请输入账号',
										},
									],
								},
							]"
                            maxLength="255"
                            placeholder="请输入账号"
						/>
					</a-form-item>
				</a-col>
                <a-col :span="12">
                    <a-form-item label="用户名">
						<a-input
							:disabled="formEdit"
							v-decorator="[
								'realName',
								{
									rules: [
										{
										required: true,
										message: '请输入用户名',
										},
									],
								},
							]"
                            maxLength="64"
                            placeholder="请输入用户名"
						/>
					</a-form-item>
				</a-col>
                <a-col :span="12">
                    <a-form-item label="密码">
						<a-input
							:disabled="formEdit"
							v-decorator="[
								'password',
								{
									rules: [
										{
										required: true,
										message: '请输入密码',
										},
									],
								},
							]"
                            maxLength="255"
                            type="password"
                            placeholder="请输入密码"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="角色">
							<a-select 
                                v-decorator="[
                                    'role',
                                    {
                                        rules: [
                                            {
                                            required: true,
                                            message: '请选择角色',
                                            },
                                        ],
                                    },
                                ]"
                                showSearch
                                optionFilterProp="children"
                                :disabled="formEdit"
                                placeholder="请选择角色"
                                >
                                    <a-select-option v-for="(item,index) in parentList" :key="index" :value="item.value">{{item.label}}</a-select-option>
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
// import { insert,findOrgByType,update } from '@/api/company/companyassociation'
import { tableList,addUser,fandRole,insert,editUser } from '@/api/childunit/unit'
import { encryption } from '@/util/util'
import { isvalidatemobile } from '@/util/validate'
export default {
    data() {
        return {
			visible: false,
			title: '添加',
			form: this.$form.createForm(this),
            formEdit: false,
            formData:[],
			relationList:[],
			parentList:[],
			childList:[],
			id:''
        };
    },
    watch: {
	},
	created(){
        // this.findPageList();//获取所有角色
        fandRole().then(res=>{
            // this.roledata
            if(res && res.data && res.data.success){
                let data = res.data.value.content;
                let arr = [];
                data.forEach((item,i)=>{
                    let obj = {};
                    console.log(item)
                    obj.label = item.roleName;
                    obj.value = item.roleCode;
                    arr.push(obj)
                })
                this.parentList = arr;
            }
        })
	},
    methods: {
		handleSubmit(e){
			e.preventDefault();
			this.form.validateFields((error, values) => {
				if(!error){
                    let result = isvalidatemobile(values.userName)
                    console.log(result)
                    if (result[0]) {
                        this.$message.error(result[1])
                        return
                    }
                    const user = encryption({
                        data: values,
                        type: 'Aes',
                        key: 'jintelai12345678',
                        param: ['password']
                    });
                    if(this.title === '编辑'){
                        editUser(user).then(res=>{
                            if(res && res.data && res.data.success){
                                this.visible = false;
                                this.$message.success(res.data.errorMsg?res.data.errorMsg:'编辑成功')
                                this.$emit('onrefs','')
                            }
                        })
                    }else{
                        delete user.oldRole
                        addUser(user).then(res=>{
                            if(res && res.data && res.data.success){
                                this.$message.success(res.data.errorMsg?res.data.errorMsg:'添加成功')
                                this.visible = false;
                                this.$emit('onrefs','')
                            }
                        })
                    }
				}
			});
		},
        showDrawer(record, handle){
            this.visible = true;
            this.$store.dispatch("setRowLight",record.id)
            let _this = this
            delete record.password
            if (handle === 'edit') {
				this.formEdit = false
                this.title = '编辑'
                setTimeout(() => {
                    _this.form.setFieldsValue(record)
                    _this.form.setFieldsValue({'role':record.roleCode})
                    _this.form.setFieldsValue({'oldRole':record.roleCode})
                })
			} else if (handle === 'add') {
				this.formEdit = false
                this.title = '添加'
                this.form.resetFields();
			}
        },
        onClose() {
            this.visible = false;
            this.$store.dispatch("setRowLight",'')
            this.form.resetFields();
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