<template>
  <div class="task_manage_table">
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
        <template slot="patrolPhotoForm" slot-scope="scope">
            <img v-if="scope.row.patrolPhoto" :src="scope.row.patrolPhoto" class="avatar">
          </template>
        <template slot-scope="scope" slot="menu">
            <el-button @click="handleShow(scope.row,scope.index)" type="info" plain size="small">
              <i class="el-icon-view"></i>查看
            </el-button>
        </template>
    </avue-crud>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { tableOption } from '@/const/fireControlSafe/patrolmanage/taskManageTable'
import { safepatrolpointPage,safepointrecordPage } from '@/api/fireControlSafe/patrolManage/patrolPoint'
import { batchConfigPoint } from '@/api/fireControlSafe/patrolManage/taskConfig'
import addPatrolPoint from '@/components/fireControlSafe/addPatrolPoint'
import { getDict } from '@/api/unit/dict'
import {
    fetchTree,
    fetchFloorList,
} from '@/api/unit/floor'
let indexObj = 0,
  arrayObj = []

export default {
  name: "taskManageTable",
  components: {
    addPatrolPoint,
  },
  props:["paramdata"],
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
        patrolTaskId: this.paramdata && this.paramdata.id ? this.paramdata.id: '',
      },
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
    console.log(this)
    this.safepatrolpointPage(this.page, this.searchParams)
    this.getDict()
    this.getBuildingTree()
  },
  mounted() {
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
    //查看详情
    handleShow(row, index) {
      this.$refs.crud.rowView(row, index);
    },
    // 添加巡查点
    batchConfigPoint (row, done, loading) {
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
    // 巡查点巡查列表
    safepatrolpointPage (page, params) {
      if (!params.patrolTaskId) {
        return
      }
      this.listLoading = true;
      safepointrecordPage(Object.assign({
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
                    arrayObj = this.tableOption.column[6].dicData
                    this.callSelfFloor()
                }
            }
        })
    },
    // 递归遍历建筑
    callSelfFloor() {
      if (arrayObj[indexObj]) {
        this.getFloorAllTree(arrayObj[indexObj].value).then(() => {
          indexObj++
          if (indexObj > arrayObj.length) {
            arrayObj = []
            indexObj = 0
            return
          }
          this.callSelfFloor()
        })
      }
    },
    // 获取全部楼层
    getFloorAllTree(id) {
      return new Promise((resolve, reject) => {
        fetchFloorList({
          buildingId: id,
          limit: 200,
        }).then(res => {
          if (res && res.data && res.data.data) {
            let data = res.data.data
            for (let i = 0, len = data.length; i < len; i++) {
              let dict = {
                value: data[i].id,
                label: data[i].floorCode,
              }
              if (this.tableOption.column[7].dicData.indexOf(dict) == -1) {
                this.tableOption.column[7].dicData.push(dict)
              }
            }
            resolve()
          } else {
            reject()
          }
        })
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
// .task_manage_table{
  
// }
</style>
