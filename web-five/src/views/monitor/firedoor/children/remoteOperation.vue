<template>
  <div class="device_dialog">
    <el-dialog
      title="远程操作反馈与记录"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <basic-container>
        <avue-tabs :option="option" @change="handleTabChange"></avue-tabs>   
        <span v-if="type.prop==='tab1'">
          <el-container class="contain_scroll is-vertical">
            <el-main>
              <el-row>
                <el-col class="c_remote_left_instructions" :span="4">
                    <span class="c_remote_left_word">上报时间：</span>
                </el-col>
                <el-col class="c_remote_left_word" :span="20">
                        <span class="c_remote_left_word_span" v-for="item in data.radioList" :key="item.id">
                            <el-radio v-model="radio" :label="item.label">{{item.value}}</el-radio>
                        </span>
                        <el-input
                          type="textarea"
                          :rows="2"
                          placeholder="请输入内容"
                          v-model="textarea">
                        </el-input>
                </el-col>
              </el-row>
              <el-row class="c_remote_top_instructions">
                <el-col class="c_remote_left_instructions" :span="4">
                  远程操作：
                </el-col>
                <el-col :span="20">
                  <el-button size="medium" plain>自检</el-button>
                  <el-button plain size="medium">消声</el-button>
                  <el-button plain size="medium">复位</el-button>
                  <el-button plain size="medium">断电</el-button>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </span>
        <span v-else-if="type.prop==='tab2'">
          <basic-container class="status_record">
            <avue-crud ref="crud"
                      :page="page"
                      class="status_record"
                      :data="tableData"
                      :table-loading="tableLoading"
                      @current-change="currentChange"
                      @search-change="searchChange"
                      @search-reset="searchReset"
                      :option="tableOption">
                      <template slot="search">
                        <div class="status_div_search">
                          <el-date-picker
                            v-model="search.createTimeStart"
                            type="date"
                            size="small"
                            class="status_date_pick"
                            placeholder="开始日期">
                          </el-date-picker>
                          <el-date-picker
                            v-model="search.createTimeEnd"
                            type="date"
                            size="small"
                            class="status_date_pick"
                            placeholder="结束日期">
                          </el-date-picker>
                        </div>
                      </template>
                      <template slot="empty">
                        <avue-empty
                          :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
                          :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
                          >
                        </avue-empty>
                      </template>
            </avue-crud>
          </basic-container>
        </span>
      </basic-container>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import remoteOperation from './remoteOperation.js'
export default remoteOperation
</script>
<style lang="scss">
@import './remoteOperation.scss'
</style>

