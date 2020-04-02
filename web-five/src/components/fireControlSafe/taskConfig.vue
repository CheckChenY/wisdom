<template>
  <div class="task_config">
    <avue-crud
        ref="crud"
        :option="tableOption" 
        :data="data"
        :page="page"
        :table-loading="listLoading"
        :before-close="beforeClose"
        @row-save="safepatroltask"
        @row-update="updatePoint"
        @current-change="currentChange"
        @search-change="searchChange">
        <template slot="empty">
            <avue-empty
                :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
                :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
                >
            </avue-empty>
        </template>
        <template slot="menuLeft">
            <el-button @click="addRow" size="small" plain icon="el-icon-plus" type="primary">添加任务</el-button>
        </template>
        <template slot-scope="scope" slot="protalListForm">
          <taskConfigTable v-if="showpop" :paramdata="scope.row" :isShow="isShow"></taskConfigTable>
        </template>
        <template slot-scope="scope" slot="menu">
            <el-button
              size="small"
              type="info"
              plain
              icon="el-icon-view"
              @click="handleShow(scope.row,scope.index)"
            >查看</el-button>
            <el-button
                type="warning"
                icon="el-icon-edit"
                size="small"
                @click="rowCell(scope.row,scope.index)"
            >配置巡查点</el-button>
            <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                v-if="scope.row.id"
                @click="delSafepatroltask(scope.row)"
            >删除</el-button>
        </template>
    </avue-crud>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { tableOption } from '@/const/fireControlSafe/patrolmanage/taskConfig'
import { safepatroltaskPage, safepatroltask,
delSafepatroltask } from '@/api/fireControlSafe/patrolManage/taskConfig'
import taskConfigTable from '@/components/fireControlSafe/taskConfigTable'
import { findAllUser } from '@/api/public'

export default {
  name: "taskConfig",
  components: {
    taskConfigTable,
  },
  data() {
    return {
      data:[],
      tableOption: tableOption,
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      timeout:false,
      listLoading: false,
      searchParams: {},
      isShow: false,
      showpop: false,
    };
  },
  watch: {
  },
  computed: {
    ...mapGetters([
      "userInfo",
    ]),
  },
  created() {
    this.safepatroltaskPage(this.page)
    this.tableOption.column.orgId = this.userInfo.orgId
    this.getAllUser()
  },
  mounted() {},
  methods: {
    // 重点部位搜索
    searchChange (params) {
      this.searchParams = params
      this.safepatroltaskPage(this.page, params)
    },
    //添加行
    addRow(){
      this.$refs.crud.rowAdd();
    },
    rowCell(row, index) {
      this.isShow = false
      this.showpop = true
      this.$refs.crud.rowEdit(row, index);
    },
    currentChange (val) {
      this.page.currentPage = val
      this.safepatroltaskPage(this.page, this.searchParams)
    },
    // 单个删除
    delSafepatroltask (param) {
      delSafepatroltask(param.id).then(res => {
        if (res && res.data && res.data.code === '0') {
          this.$message({
            type:'success',
            message:"删除成功"
          })
          this.safepatroltaskPage(this.page)
        } else {
          this.$message({
            type:'error',
            message:"删除失败"
          })
        }
      })
    },
    // 添加巡查点
    safepatroltask (row, done, loading) {
      this.showpop = false
      safepatroltask(row).then(res => {
        if (res && res.data && res.data.code ==='0') {
          this.safepatroltaskPage(this.page)
          this.$message({
            type:'success',
            message:"保存成功"
          })
        } else {
          this.$message({
            type:'error',
            message: res && res.data && res.data.data ? res.data.data : '失败'
          })
        }
        done()
      }).catch(() => {
        loading()
      })
    },
    // 添加修改重点部位
    updatePoint (row, done, loading) {
      delete row.pointCount
      this.showpop = false
      safepatroltask(row).then(res => {
        if (res && res.data && res.data.code ==='0') {
          this.safepatroltaskPage(this.page)
          this.$message({
            type:'success',
            message:"保存成功"
          })
        } else {
          this.$message({
            type:'error',
            message: res && res.data && res.data.msg ? res.data.msg : '失败'
          })
        }
        done()
      }).catch(() => {
        loading()
      })
    },
     // 获取重要部位数据
    safepatroltaskPage (page, params) {
      this.listLoading = true;
      safepatroltaskPage(Object.assign({
        page: page.currentPage,
        limit: page.pageSize
      }, params)).then(res => {
        if (res && res.data && res.data.code === '0') {
          this.data = res.data.data;
          this.page.total = res.data.total
        }
        setTimeout(() => {
          this.listLoading = false;
        }, 2500)
      }).catch(error=>{
        this.listLoading = false
        if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
          this.timeout=true
        }
      })
    },
    //查看详情
    handleShow(row, index) {
      this.isShow = true
      this.showpop = true
      this.$refs.crud.rowView(row, index);
    },
    getAllUser () {
      findAllUser().then(res => {
        if (res && res.data && res.data.code == '0') {
          for (let i = 0, len = res.data.data.length; i < len; i++) {
            let item = {
              label: res.data.data[i].realName,
              value: res.data.data[i].id
            }
            this.tableOption.column[4].dicData.push(item)
          }
        }
      })
    },
    beforeClose () {
      this.showpop = false
    }
  }
};
</script>
<style lang="scss">
// .task_config{
  
// }
</style>
