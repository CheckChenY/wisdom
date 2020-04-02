<template>
    <a-form :form="form1" @submit="handleSubmit" class="changepass_index">
        <a-form-item
            style="display:flex;"
            label="新密码"
        >
            <a-input
            v-decorator="[
                'newPassword',
                {
                    rules: [{ required: true, message: '请输入新密码!', whitespace: true }],
                },
            ]"
            maxLength="255"
            type="password"
            placeholder="新密码"
            />
        </a-form-item>
        <a-form-item
            style="display:flex;"
            label="旧密码"
        >
            <a-input
            v-decorator="[
                'oldPassword',
                {
                    rules: [{ required: true, message: '请旧密码!', whitespace: true }],
                },
            ]"
            maxLength="255"
            type="password"
            placeholder="旧密码"
            />
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit" :disabled="disabled">提交</a-button>
        </a-form-item>
    </a-form>
</template>
<script>
import { encryption } from '@/util/util'
import { changePasswordApp } from "@/api/user"
export default {
    name: "register",
    components: {
    },
    data () {
        return {
            disabled: false,
        };
    },
    created () { 
    },
    beforeCreate() {
        this.form1 = this.$form.createForm(this, { name: 'register' });
    },
    destoryed(){
    },
    methods: {
        handleSubmit(e){
            e.preventDefault();
            this.form1.validateFields((err, values) => {
                if (!err) {
                    let user = encryption({
                        data: values,
                        type: 'Aes',
                        key: 'jintelai12345678',
                        param: ['newPassword']
                    });
                    user = encryption({
                        data: user,
                        type: 'Aes',
                        key: 'jintelai12345678',
                        param: ['oldPassword']
                    });
                    this.disabled = true
                    changePasswordApp(user).then(res=>{
                        this.disabled = false
                        console.log(res.data)
                        if(res && res.data && res.data.success){
                            this.form1.resetFields()
                            this.$message.success('修改成功')
                        }else{
                            this.$message.error(res.data.errorMsg)
                        }
                    })
                }
            });
        },
        submit(obj){
            
        },
    }
}
</script>
<style lang="scss">
.changepass_index{
    display: flex;
    flex-direction: column;
    align-items: center;
    .ant-form-item-label{
        width:220px!important;
    }
    .ant-input{
        width:250px;
    }
    .code_input{
        width:250px;
        input{
            width: inherit;
        }
    }
}
</style>
