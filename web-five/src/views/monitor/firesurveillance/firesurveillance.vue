<template>
  <div class="fire_surveillance">
    <basic-container>
      <avue-tabs :option="option" @change="handleTabChange"></avue-tabs>
      <span v-if="type.prop==='tab1'">
        <avue-crud
          ref="crud"
          :page="page"
          class="fire_device"
          :data="tableData"
          :table-loading="tableLoading"
          :option="tableOption"
          @current-change="currentChange"
          @refresh-change="refreshChange"
          @size-change="sizeChange"
          @search-reset="searchReset"
          @search-change="searchChange"
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
              <el-input
                v-model="search.slot"
                @focus="inputClick(search.slot)"
                readonly
                placeholder="请选择设备类型"
                size="small"
              />
              <!-- <avue-form v-model="search.slot" :option="equipmentOption"></avue-form> -->
            </el-form-item>
          </template>

          <template slot-scope="scope" slot="menu">
            <el-button
              size="mini"
              type="info"
              plain
              icon="el-icon-view"
              @click="handleShow(scope.row,scope.index)"
            >查看</el-button>
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
      <span v-else-if="type.prop==='tab2'">
        <statisti-analysis :datay="echartsdatay" :datax="echartsdatax" :elshownum="elshownum"></statisti-analysis>
      </span>
    </basic-container>
    <device-detail-dialog @handleClose="handleClose" v-if="deviceDetailShow" :setPropsId="setData"></device-detail-dialog>
  </div>
</template>

<script>
import firesurveillance from "./firesurveillance.js";
export default firesurveillance;
</script>

<style lang="scss">
@import "./firesurveillance.scss";
</style>
