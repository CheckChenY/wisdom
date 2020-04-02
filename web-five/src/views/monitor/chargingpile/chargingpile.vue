<template>
  <div class="fire_alarm">
    <basic-container>
      <avue-tabs :option="option" @change="handleChange"></avue-tabs>
      <span v-if="type.prop==='tab2'">
        <statisti-analysis :datay="echartsdatay" :datax="echartsdatax" :elshownum="elshownum"></statisti-analysis>
      </span>
      <span v-else-if="type.prop==='tab1'">
        <avue-crud ref="crud"
          :page=page
          :data="tableData"
          :table-loading="tableLoading"
          :option="tableOption"
          @refresh-change="refreshChange"
          @search-change="searchChange"
          @current-change="currentChange"
          @size-change="sizeChange"
        >
          <template slot="empty">
              <avue-empty
              :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
              :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
              >
            </avue-empty>
          </template>
          <template slot="search">
            <el-form-item label="设备类型">
              <el-input v-model="search.slot"
               @focus="inputClick(search.slot)" readonly
              placeholder="请选择设备类型" size="small"/>
              <!-- <avue-form v-model="search.slot" :option="equipmentOption"></avue-form> -->
            </el-form-item>
          </template>
          <template slot-scope="scope"
                    slot="menu">
            <el-button size="mini"
                  type="info"
                  plain
                  icon="el-icon-view"
                  @click="handleShow(scope.row,scope.index)">查看
            </el-button>
            <el-button size="mini"
                  icon="el-icon-setting"
                  @click="handleShowOperation(scope.row,scope.index)"
                  type="warning"
                  plain>远程操作
            </el-button>
          </template>
        </avue-crud>
        <!-- 设备类型弹窗 -->
        <div class="deivce_alert">
          <el-dialog
            title="请选择"
            :visible.sync="dialogVisible"
            width="60%"
            :before-close="handleClose"
            class="alert_box"
          >
            <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <el-tree
              :data="equipmentData"
              :props="defaultProps"
              ref="typeref"
              show-checkbox
              node-key="id"
              :check-strictly="true"
              :highlight-current="true"
              :filter-node-method="filterNode"
              @check-change="handleNodeClick"
              :default-checked-keys="[treepanId]"
              @node-click="nodeClick"
            ></el-tree>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </span>
    </basic-container>
    <device-detail-dialog 
    @handleClose="handleClose" 
    v-if="deviceDetailShow"
    :setPropsId="setData"
    ></device-detail-dialog>
    <remote-operation @handleClose="remoteOperationClose" v-if="remoteOperationShow"></remote-operation>
  </div>
</template>
<script>

import chargingpile from './chargingpile.js'
export default chargingpile
</script>
<style lang="scss">
  .fire_alarm{
  .data_show_div{
    .data_show{
      .item {
        border: 1px #eee solid;
        border-radius: 5px;
      }
    }
  }
}
</style>