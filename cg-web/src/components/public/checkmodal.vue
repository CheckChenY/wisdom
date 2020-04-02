<template>
  <a-modal :visible="previewVisible" 
    width="400px" 
    cancelText="取消" 
    okText="确定"
    @ok="handleOk"
    @cancel="handleCancel">
    <a-form
      :form="form"
      >
      <a-form-item label="校验码">
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '请输入校验码!' }],
            }
          ]"
          type="password"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { getMyPassWord } from '@/api/monitor/monitor'
export default {
  name: 'ImageView',
  data() {
    return {
      previewVisible: false,
      handle: '',
      record: {},
      form: this.$form.createForm(this),
    }
  },
  created () {
  },
  mounted() {
    document.onkeydown = (ev) => {
      var event=ev ||event
      if(event.keyCode==13 && this.previewVisible){
        this.handleOk()
      }
    }
  },
  methods: {
    showModal (record, handle) {
      this.previewVisible = true
      this.record = record
      this.handle = handle
    },
    // 关闭弹窗
    handleCancel () {
      this.previewVisible = false
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          let param = {
            thresholdPassword: '',
            orderPassword: ''
          }
          if (this.handle == 'Thresold') {
            param.thresholdPassword = values.password
          } else if (this.handle == 'Remote'){
            param.orderPassword = values.password
          }
          getMyPassWord(param).then(res => {
            if (res && res.data && res.data.success) {
              this.previewVisible = false
              this.$emit("closeModal", this.record, this.handle)
            } else {
              this.$message.error('密码错误,请重新输入！')
            }
            this.form.setFieldsValue({password: null});
          })
        }
      });
    }
  }
}
</script>
<style lang="scss">
.facilityPhoto_dialog{
  .el-dialog__body{
    height: 100%;
    text-align: center;
  }
  .el-dialog__header{
    background-color: #fff;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #909399 !important;
  }
}
</style>
