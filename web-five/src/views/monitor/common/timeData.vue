<template>
  <div>
    <el-date-picker
      v-model="timevalue"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      @change="timeChange"
    ></el-date-picker>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "timeData_index",
  components: {},
  props: ["timevalues"],
  data() {
    return {
      timevalue: this.timevalues,
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value5: ""
    };
  },
  watch: {
    timevalues: function(val, oldVal) {
      // console.log(val);
      if(val==""){
        this.timevalue=val;
      }
    }
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    timeChange(data) {
      // console.log(data);
      this.$emit("changeValues", this.timevalue);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>