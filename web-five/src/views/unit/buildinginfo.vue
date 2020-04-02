<template>
  <div class="app-container calendar-list-container base_info">
    <basic-container>
      <avue-tabs :option="option" @change="handleTabChange"></avue-tabs>
      <span v-if="type.prop==='tab1'">
        <building-list v-if="buildingListShow"
                      @buildingAdd="createBuilding"
                      @buildingShow="openBuildDetail"></building-list>
        <add-building v-if="addBuildingShow"
                      :handleType="handleTp"
                      :buildId="buildingId"
                      @addClose="openBuildList"></add-building>
        <building-detail v-if="buildingDetailShow"
                        :buildId="buildingId"
                        @addClose="openBuildList"></building-detail>
      </span>
      <span v-else-if="type.prop==='tab2'">
        <floor-list></floor-list>
      </span>
    </basic-container>
  </div>
</template>
<script>
import buildingList from '@/components/unit/buildingList'
import addBuilding from '@/components/unit/addBuilding'
import buildingDetail from '@/components/unit/buildingDetail'
import floorList from '@/components/unit/floorList'
export default {
  name: "baseinfo",
  components: {
    'building-list': buildingList,
    'add-building': addBuilding,
    'building-detail': buildingDetail,
    'floor-list': floorList,
  },
  data() {
    return {
      type: {},
      option: {
        column: [{
          // icon:'el-icon-info',
          label: '建筑信息',
          prop: 'tab1',
        }, {
          // icon:'el-icon-warning',
          label: '楼层/区域信息',
          prop: 'tab2',
        }]
      },
      buildingListShow: true,
      addBuildingShow: false,
      buildingDetailShow: false,
      handleTp: '',
      buildingId: '',
    }
  },
  created() {
    this.type = this.option.column[0]
  },
  watch: {
  },
  computed: {
  },
  mounted() {
    setTimeout(() => {
      this.filter()
    })
  },
  methods: {
    // 选择页签
    handleTabChange(column) {
      this.type = column
      console.log('column', column)
      if (column.prop == 'tab1') {
        this.componentChange('buildingListShow')
      }
    },
    // 新建建筑信息
    createBuilding (id) {
      if (id) {
        this.handleTp = 'update'
        this.buildingId = id.buildId
      } else {
        this.handleTp = 'create'
      }
      this.componentChange('addBuildingShow')
    },
    // 建筑列表页面打开
    openBuildList () {
      this.componentChange('buildingListShow')
    },
    // 建筑详情页面打开
    openBuildDetail (id) {
      this.buildingId = id.buildId
      this.componentChange('buildingDetailShow')
    },
    // 切换组件
    componentChange (comp) {
      this.buildingListShow = false
      this.addBuildingShow = false
      this.buildingDetailShow = false
      this[comp] = true
    },
    // 去除h5中 &nbsp;
    filter () {
      let tab0 = document.getElementById('tab-0')
      tab0.innerHTML = tab0.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
      let tab1 = document.getElementById('tab-1')
      tab1.innerHTML = tab1.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
    },
  }
}
</script>
<style lang="scss">
// .base_info{
// }
</style>
