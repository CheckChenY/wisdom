<template>
  <div class="patrol_point">
    <avue-crud
        ref="crud"
        :option="tableOption" 
        :data="data"
        :page="page"
        :table-loading="listLoading"
        @row-save="safepatrolpoint"
        @row-update="updatePoint"
        @current-change="currentChange"
        @search-change="searchChange"
        @selection-change="selectionChange">
        <template slot="empty">
            <avue-empty
                :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
                :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
                >
            </avue-empty>
        </template>
        <template slot="menuLeft">
            <el-button @click="addRow" size="small" plain icon="el-icon-plus" type="primary">手动添加</el-button>
            <el-button @click="delMore" size="small" plain icon="el-icon-delete" type="danger">批量删除</el-button>
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
            >编辑</el-button>
            <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                v-if="scope.row.id"
                @click="delSafepatrolpoint(scope.row)"
            >删除</el-button>
        </template>
    </avue-crud>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { tableOption } from '@/const/fireControlSafe/patrolmanage/patrolPoint'
import { safepatrolpoint, safepatrolpointPage, info,
  delSafepatrolpoint, delBatchSafePatrolPoint } from '@/api/fireControlSafe/patrolManage/patrolPoint'
import { getDict } from '@/api/unit/dict'
import {
    fetchTree,
    fetchFloorList,
} from '@/api/unit/floor'

export default {
  name: "patrolPoint",
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
      ids: [],
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
    this.safepatrolpointPage(this.page)
    this.tableOption.column.orgId = this.userInfo.orgId
    this.getDict()
    this.getBuildingTree()
  },
  mounted() {
    this.tableOption.column[5].change = ({value}) =>{
      if(value){
        info(value).then(res => {
          if (res && res.data && res.data.code === '0') {
          }else{
            this.$message({
              type:'error',
              message:'该巡查卡不存在'
            })
          }
        })
      }
    }
    this.tableOption.column[6].change = (res) => {
      console.log(res)
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
      fetchFloorList().then(res=>{
        this.tableOption.column[7].dicData=[]
        if(res && res.data){
          res.data.data.forEach(s=>{
            this.tableOption.column[7].dicData.push({
              label:s.floorCode,
              value:s.id
            })
          })
        }
      })
    },
    // 添加修改重点部位
    updatePoint (row, done, loading) {
      safepatrolpoint(row).then(res => {
        if (res && res.data && res.data.code ==='0') {
          this.safepatrolpointPage(this.page)
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
    // 重点部位搜索
    searchChange (params) {
      this.page.currentPage=1
      this.searchParams.page=1
      this.searchParams = params
      this.safepatrolpointPage(this.page, params)
    },
    // 多选数据
    selectionChange (list) {
      for (let i = 0, len = list.length; i < len; i++) {
        this.ids.push(list[i].id)
      }
    },
    //添加行
    addRow(){
      this.$refs.crud.rowAdd();
    },
    // 批量删除
    delMore() {
      delBatchSafePatrolPoint({ids:this.ids.join(',')}).then(res => {
        if (res && res.data && res.data.code === '0') {
          this.$message({
            type:'success',
            message:"删除成功"
          })
          this.safepatrolpointPage(this.page)
        } else {
          this.$message({
            type:'error',
            message:"删除失败"
          })
        }
      })
    },
    rowCell(row, index) {
      this.$refs.crud.rowEdit(row, index);
    },
    // 单个删除
    delSafepatrolpoint (param) {
      delSafepatrolpoint(param.id).then(res => {
        if (res && res.data && res.data.code === '0') {
          this.$message({
            type:'success',
            message:"删除成功"
          })
          this.safepatrolpointPage(this.page)
        } else {
          this.$message({
            type:'error',
            message:"删除失败"
          })
        }
      })
    },
    // 添加巡查点
    safepatrolpoint (row, done, loading) {
      info(row.cardCode).then(res => {
        if (res && res.data && res.data.code === '0') {
          let obj = res.data.data
          obj.patrolPointName = row.patrolPointName
          obj.patrolPointType = row.patrolPointType
          obj.buildingId = row.buildingId
          obj.floorId = row.floorId
          obj.location = row.location
          
          safepatrolpoint(obj).then(relt => {
            if (relt && relt.data && relt.data.code ==='0') {
              this.safepatrolpointPage(this.page)
              this.$message({
                type:'success',
                message:"保存成功"
              })
            } else {
              this.$message({
                type:'error',
                message: relt && relt.data && relt.data.data ? relt.data.data : '失败'
              })
            }
            done()
          }).catch(() => {
            loading()
          })
        } else {
          loading()
          this.$message({
            type:'error',
            message:'该巡查卡不存在'
          })
        }
        
      }).catch(() => {
        loading()
      })
    },
    // 获取重要部位数据
    safepatrolpointPage (page, params) {
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
    currentChange (val) {
      this.page.currentPage = val
      this.safepatrolpointPage(this.page, this.searchParams)
    },
    //查看详情
    handleShow(row, index) {
        this.$refs.crud.rowView(row, index);
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
// .patrol_point{
  
// }
</style>
