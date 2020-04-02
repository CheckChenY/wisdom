<template>
  <div class="task_config_table">
    <avue-crud
        ref="crud"
        :option="tableOption" 
        :data="data"
        :page="page"
        :table-loading="listLoading"
        @row-save="batchConfigPoint"
        @current-change="currentChange"
        @search-change="searchChange"
        @search-reset="searchReset">
        <template slot="empty">
            <avue-empty
                :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
                :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
                >
            </avue-empty>
        </template>
        <template slot="menuLeft" v-if="!isShow">
            <el-button @click="addRow" size="small" plain icon="el-icon-plus" type="primary">配置巡查点</el-button>
        </template>
        <template slot-scope="scope" slot="dialogForm">
           <addPatrolPoint v-if="showpop" :paramdata="scope.row"></addPatrolPoint>
        </template>
        <template slot-scope="scope" slot="menu" v-if="!isShow">
            <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                v-if="scope.row.id"
                @click="delObj(scope.row)"
            >删除</el-button>
        </template>
    </avue-crud>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { tableOption } from '@/const/fireControlSafe/patrolmanage/taskConfigTable'
import { safepatrolpointPage } from '@/api/fireControlSafe/patrolManage/patrolPoint'
import { batchConfigPoint } from '@/api/fireControlSafe/patrolManage/taskConfig'
import addPatrolPoint from '@/components/fireControlSafe/addPatrolPoint'
import { getDict } from '@/api/unit/dict'
import {
    fetchTree,
    fetchFloorList,
} from '@/api/unit/floor'

export default {
  name: "taskConfigTable",
  components: {
    addPatrolPoint,
  },
  props:["paramdata", 'isShow'],
  data() {
    return {
      data:[],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      tableOption: tableOption,
      timeout:false,
      listLoading: false,
      searchParams: {
        patrolTaskId: this.paramdata && this.paramdata.id ? this.paramdata.id: ''
      },
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
    this.safepatrolpointPage(this.page, this.searchParams)
    this.getDict()
    this.getBuildingTree()
  },
  mounted() {
    this.tableOption.column[6].change = (res) => {
      this.getFloorTree(res.value)
    }
  },
  methods: {
    // 字典查询
    getDict () {
      getDict('point_type').then(res => {
        if (res && res.data && res.data.code === '0') {
          this.tableOption.column[4].dicData = res.data.data
        }
      })
    },
    //添加行
    addRow(){
      this.showpop = true
      this.$refs.crud.rowAdd();
    },
    currentChange (val) {
      this.page.currentPage = val
      this.safepatrolpointPage(this.page, this.searchParams)
    },
    // 重点部位搜索
    searchChange (params) {
      this.searchParams = Object.assign(this.searchParams, params)
      this.safepatrolpointPage(this.page, this.searchParams)
    },
    // 清空搜索
    searchReset () {
      this.searchParams = {patrolTaskId: this.searchParams.patrolTaskId}
    },
    // 单个删除
    delObj (param) {
      let obj = {
        ids: param.id.toString(),
        patrolTaskId: this.paramdata.id,
        postType: 1, // 1删除 2 添加
      }
      batchConfigPoint(obj).then(res => {
        if (res && res.data && res.data.code ==='0') {
          this.safepatrolpointPage(this.page, this.searchParams)
          this.$message({
            type:'success',
            message:"删除成功"
          })
        } else {
          this.$message({
            type:'error',
            message: res && res.data && res.data.data ? res.data.data : '删除失败'
          })
        }
      }).catch(() => {
      })
    },
    // 添加巡查点
    batchConfigPoint (row, done, loading) {
      this.showpop = false
      let obj = {
        ids: row.ids,
        patrolTaskId: this.paramdata.id,
        postType: 2, // 1删除 2 添加
      }
      batchConfigPoint(obj).then(res => {
        if (res && res.data && res.data.code ==='0') {
          this.safepatrolpointPage(this.page, this.searchParams)
          this.$message({
            type:'success',
            message:"保存成功"
          })
        } else {
          this.$message({
            type:'error',
            message: res && res.data && res.data.data ? res.data.data : '保存失败'
          })
        }
        done()
      }).catch(() => {
        loading()
      })
    },
    // 获取重要部位数据
    safepatrolpointPage (page, params) {
      if (!params.patrolTaskId) {
        return
      }
      this.listLoading = true;
      safepatrolpointPage(Object.assign({
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
    getBuildingTree() {
        fetchTree({
            limit: 100
        }).then(res => {
            if (res && res.data && res.data.data) {
                let data = res.data.data
                this.$set(this.tableOption.column[6].dicData.splice(0, this.tableOption.column[6].dicData.length))
                if (data.building) {
                    for (let i = 0, len = data.building.length; i < len; i++) {
                        let dict = {
                            value: data.building[i].id,
                            label: data.building[i].buildingCode
                        }
                        this.tableOption.column[6].dicData.push(dict);
                    }
                }
            }
        })
    },
    // 获取楼层
    getFloorTree(id) {
        fetchFloorList({
            buildingId: id,
            limit: 200,
        }).then(res => {
            if (res && res.data && res.data.data) {
                let data = res.data.data
                let floorData = []
                for (let i = 0, len = data.length; i < len; i++) {
                    let dict = {
                        value: data[i].id,
                        label: data[i].floorCode,
                    }
                    floorData.push(dict)
                }
                this.tableOption.column[7].dicData = floorData
            }
        })
    },
  }
};
</script>
<style lang="scss">
// .task_config_table{
  
// }
</style>
