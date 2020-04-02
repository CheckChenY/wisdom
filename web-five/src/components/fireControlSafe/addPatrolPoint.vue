<template>
  <div class="add_patrol_point">
    <avue-crud
        ref="crud"
        :option="tableOption" 
        :data="data"
        :page="page"
        :table-loading="listLoading"
        @search-change="searchChange"
        @search-reset="searchReset"
        @current-change="currentChange"
        @selection-change="selectionChange">
        <template slot="empty">
            <avue-empty
                :image="timeout?'/img/bg/404.svg':'/img/empty.png'"
                :desc="timeout?'请求超时,请稍后重试······':'暂无数据'"
                >
            </avue-empty>
        </template>
    </avue-crud>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { tableOption } from '@/const/fireControlSafe/patrolmanage/addPatrolPoint'
import { safepatrolpointPage } from '@/api/fireControlSafe/patrolManage/patrolPoint'
import { getDict } from '@/api/unit/dict'
import {
    fetchTree,
    fetchFloorList,
} from '@/api/unit/floor'

export default {
  name: "addPatrolPoint",
  props:["paramdata"],
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
      searchParams: {
        taskBindingState: 2
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
    this.safepatrolpointPage(this.page, this.searchParams)
    this.getDict()
    this.getBuildingTree()
  },
  mounted() {
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
    // 多选数据
    selectionChange (list) {
      let ids = []
      for (let i = 0, len = list.length; i < len; i++) {
        ids.push(list[i].id)
      }
      this.$set(this.paramdata, 'ids', ids.join(','))
    },
     // 获取重要部位数据
    safepatrolpointPage (page, params) {
      this.listLoading = true;
      safepatrolpointPage(Object.assign({
        page: page.currentPage,
        limit: page.pageSize
      }, params)).then(response => {
        this.data = response.data.data;
        this.page.total = response.data.total
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
// .add_patrol_point{
  
// }
</style>
