<template>
  <div class="app-container calendar-list-container patrol_manage">
    <basic-container>
      <avue-tabs :option="option" @change="handleTabChange"></avue-tabs>
      <span v-if="type.prop==='tab1'">
        <patrol-point></patrol-point>
      </span>
      <span v-else-if="type.prop==='tab2'">
        <task-config></task-config>
      </span>
      <span v-else-if="type.prop==='tab3'">
        <task-manage></task-manage>
      </span>
      <span v-else-if="type.prop==='tab4'">
        <inspection-records></inspection-records>
      </span>
    </basic-container>
  </div>
</template>
<script>
import taskConfig from '@/components/fireControlSafe/taskConfig'
import taskManage from '@/components/fireControlSafe/taskManage'
import patrolPoint from '@/components/fireControlSafe/patrolPoint'
import inspectionRecords from '@/components/fireControlSafe/inspectionRecords'
import { mapGetters } from "vuex";
export default {
  name: "patrolmanage",
  components: {
    "task-manage": taskManage,
    "task-config": taskConfig,
    'patrol-point': patrolPoint,
    'inspection-records':inspectionRecords
  },
  data() {
    return {
      type: {},
      option: {
        column: [{
          // icon:'el-icon-info',
          label: '巡查点管理',
          prop: 'tab1',
        }, {
          // icon:'el-icon-warning',
          label: '巡查任务配置',
          prop: 'tab2',
        }, {
          // icon:'el-icon-warning',
          label: '巡查任务管理',
          prop: 'tab3',
        }, {
          // icon:'el-icon-warning',
          label: '巡查记录',
          prop: 'tab4',
        }]
      },
    }
  },
  created() {
    this.type = this.option.column[0]
  },
  watch: {
  },
  computed: {
    ...mapGetters([
      "userInfo",
    ]),
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
      // if (column.prop == 'tab1') {
      // }
    },
    // 去除h5中 &nbsp;
    filter () {
      let tab0 = document.getElementById('tab-0')
      tab0.innerHTML = tab0.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
      let tab1 = document.getElementById('tab-1')
      tab1.innerHTML = tab1.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
      let tab2 = document.getElementById('tab-2')
      tab2.innerHTML = tab2.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
      let tab3 = document.getElementById('tab-3')
      tab3.innerHTML = tab3.innerHTML.replace(/<i><\/i>&nbsp;/ig, "")
    },
  }
}  
</script>
<style lang="scss">
.patrol_manage{

}
</style>
