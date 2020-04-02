<template>
  <a-modal class="loadpop_dialog" :visible="previewVisible" :footer="null" width="800px" @cancel="handleCancel">
    <div style="height:500px;line-height:500px;text-align:center;">
      <a-spin tip="正在导入,请稍后...">
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      </a-spin>
    </div>
  </a-modal>
</template>
<script>
export default {
  name: 'ImageView',
  data() {
    return {
      previewVisible: false,
    }
  },
  created () {
  },
  mounted() {
  },
  methods: {
    showModel () {
      this.previewVisible = true
    },
    // 关闭弹窗
    handleCancel () {
      this.previewVisible = false
    }
  }
}
</script>
<style lang="scss">
.loadpop_dialog{
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
