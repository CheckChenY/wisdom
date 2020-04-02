<template>
  <a-drawer class="uploadmsg_dialog" 
    :visible="previewVisible" 
    width="500px" 
    title="批量导入完成"
    @close="handleCancel">
    <div style="padding-bottom:8px;">
      <a-tag color="#5cdd00">已成功导入{{snum}}条</a-tag>
      <a-tag color="#ffbb2a">添加失败{{dnum}}条</a-tag>
      <a-tag color="#fd3e3c">注册失败{{rfnum}}条</a-tag>
    </div>
    <div class="msg_title">添加失败信息</div>
    <a-table
      :columns="columns"
      :dataSource="defeated"
      :pagination="false"
      :scroll="{ y: 320 }"
      size="small"
    />
    <div class="msg_title">注册失败信息</div>
    <a-table
      :columns="columns"
      :dataSource="registerFall"
      :pagination="false"
      :scroll="{ y: 320 }"
      size="small"
    />
    <div class="msg_title">
      <a-button type="primary" @click="copy">复制</a-button>
    </div>
  </a-drawer>
</template>
<script>
const columns = [{
  title: '设备识别码',
  dataIndex: 'deviceCode',
  width: 150,
},{
  title: '设备ID',
  dataIndex: 'deviceId',
  width: 150,
}]
export default {
  name: 'ImageView',
  data() {
    return {
      previewVisible: false,
      msgObj: {},
      columns,
      registerFall: [],
      defeated: [],
      rfnum: 0,
      dnum: 0,
      snum: 0,
    }
  },
  created () {
  },
  watch: {
    previewVisible () {
      this.rfnum = this.msgObj.registerFall.length
      this.dnum = this.msgObj.defeated.length
      this.snum = this.msgObj.succeed.length
      this.registerFall = this.msgObj.registerFall
      this.defeated = this.msgObj.defeated
    }
  },
  mounted() {
  },
  methods: {
    // 关闭弹窗
    handleCancel () {
      this.previewVisible = false
    },
    copy () {
      let rfstring = JSON.stringify(this.registerFall)
      rfstring = rfstring.replace(/deviceCode/g,"设备识别码")
      rfstring = rfstring.replace(/deviceId/g,"设备ID")
      let destring = JSON.stringify(this.defeated)
      destring = destring.replace(/deviceCode/g,"设备识别码")
      destring = destring.replace(/deviceId/g,"设备ID")
      let copystring = "添加失败信息：" + destring + "   注册失败信息：" + rfstring
      this.$CopyText(copystring,() => {
        this.$message.success('复制成功')
      }, () => {
        this.$message.error('复制失败')
      })
    }
  }
}
</script>
<style lang="scss">
.uploadmsg_dialog{
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
.msg_title{
  font-size: 15px;
  margin: 10px 0;
  font-weight: bold;
}
</style>
