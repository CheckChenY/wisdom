<template>
  <div class="el-dialog__wrapper facilityPhoto_dialog" style="z-index: 2054;">
    <div role="dialog" aria-modal="true" aria-label="dialog" class="el-dialog" style="margin-top: 15vh;z-index: 2054;">
      <div class="el-dialog__header">
        <span class="el-dialog__title"></span>
        <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="closeImg">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </div>
      <div class="el-dialog__body">
        <div class="avue-dialog">
          <img width="100%" :src="facilityPhoto" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ImageView',
  props: {
    // 图片地址
    facilityPhoto: {
      type: String,
    },
  },
  data() {
    return {
    }
  },
  created () {
  },
  mounted() {
  },
  methods: {
    // 关闭弹窗
    closeImg () {
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
