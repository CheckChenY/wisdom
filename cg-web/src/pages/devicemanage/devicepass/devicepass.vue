<template>
    <div style="height:500px;padding: 72px 400px;">
        <a-form :form="form" @submit="handleSubmit">
            <a-form-item label="远程操作验证码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-input
                    v-model="form.orderPassword"
                    placeholder="请输入验证码"
                    maxLength="45"
                />
            </a-form-item>
            <a-form-item label="修改阈值验证码" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-input
                    v-model="form.thresholdPassword"
                    placeholder="请输入验证码"
                    maxLength="45"
                />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">
                    提 交
                </a-button>
            </a-form-item>
        </a-form>
        
    </div>
</template>

<script>
import { insert, update, findByCompanyId } from "@/api/devicemanage/devicepass/devicepass"
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
export default {
    created(){
        this.findByCompanyId()
    },
    data () {
        return {
            checkNick: false,
            formItemLayout,
            formTailLayout,
            form: {},
        }
    },
    methods:{
        handleSubmit() {
            if (this.form.id) {
                update(this.form).then(res => {
                    if (res && res.data && res.data.success) {
                        this.$message.success('修改成功')
                        this.findByCompanyId()
                    } else {
                        this.$message.error('修改失败')
                    }
                })
            } else {
                insert(this.form).then(res => {
                    if (res && res.data && res.data.success) {
                        this.$message.success('添加成功')
                        this.findByCompanyId()
                    } else {
                        this.$message.error('添加失败')
                    }
                })
            }
        },
        findByCompanyId () {
            findByCompanyId().then(res => {
                if (res && res.data && res.data.success) {
                    this.form = res.data.value
                }
            })
        }
    }
}
</script>