<template>
  <div class="screen_index">
    <head-top></head-top>
    <el-row class="body_row">
      <el-col :span="8">
        <div class="rect">
          <basicInfo></basicInfo>
        </div>
        <div class="rect">
          <alertType></alertType>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="rect">
          <devicemap></devicemap>
        </div>
      </el-col>
    </el-row>
    <el-row class="body_row">
      <el-col :span="12">
        <div class="rect">
          <electricityCurve></electricityCurve>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="rect">
          <alertList></alertList>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import header from "./header"
import basicInfo from './leftSide/basicInfo'
import alertType from './leftSide/alertType'
import electricityCurve from './leftSide/electricityCurve'
import alertList from './rightSide/alertList'
import devicemap from './rightSide/devicemap'

export default {
  name: "screen",
  components: {
    "head-top": header,
    basicInfo,
    alertType,
    electricityCurve,
    alertList,
    devicemap,
  },
  data() {
    return {
    };
  },
  computed: {},
  created() {
  },
  mounted() {},
  methods: {
  }
};
</script>
<style lang="scss">
$color: #fff;
.screen_index {
  background: #000;
  background-image: url("/img/screen/indexback.png");
  height: 100%;
  overflow: -moz-scrollbars-none;
  .body_row{
    margin: 0px 20px;
  }
}
</style>
