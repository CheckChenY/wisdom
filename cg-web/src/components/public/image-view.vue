<template>
  <a-modal :visible="previewVisible" :footer="null" width="800px" @cancel="handleCancel">
      <img width="100%" :src="facilityPhoto" alt="">
  </a-modal>
</template>
<script>
export default {
  name: 'ImageView',
  data() {
    return {
      previewVisible: false,
      facilityPhoto: '',
    }
  },
  created () {
  },
  mounted() {
  },
  methods: {
    showModel (facilityPhoto) {
      this.facilityPhoto = facilityPhoto
      this.previewVisible = true
    },
    // 关闭弹窗
    handleCancel () {
      this.previewVisible = false
      this.$emit("closeImage")
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
