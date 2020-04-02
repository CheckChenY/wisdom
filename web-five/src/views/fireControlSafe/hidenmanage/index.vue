<template>
    <div class="app-container calendar-list-container base_info">
      <basic-container>
        <avue-tabs :option="option" @change="handleTabChange"></avue-tabs>
        <!-- tab1 -->
        <span v-if="type.prop==='tab1'">
            <hiden-deal></hiden-deal>
        </span>
        <span v-if="type.prop==='tab2'">
            <hiden-record></hiden-record>
        </span>
      </basic-container>
    </div>
  </template>
  <script>
//   import { dealOption, keyOption } from '@/const/fireControlSafe/patrolmanage/patrolmanage'
  import Deal from '@/components/hidenmanage/deal'
  import Record from '@/components/hidenmanage/record'
  export default {
    components:{
        'hiden-deal':Deal,
        'hiden-record':Record,
    },
    data() {
      return {
        type: {},
        option: {
          column: [{
            // icon:'el-icon-info',
            label: '隐患处理',
            prop: 'tab1',
          }, {
            // icon:'el-icon-warning',
            label: '隐患处理记录',
            prop: 'tab2',
          }]
        },
      }
    },
    created() {
        this.type=this.option.column[0]
    },
    watch: {
    },
    computed: {
      
    },
    mounted() {
    },
    methods: {
        // 选择页签
        handleTabChange(column) {
            this.type = column
        },
    }
  }  
</script>
