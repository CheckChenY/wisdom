<template>
  <div class="header">
    <div class="head_center">
      <img class="head_logo" src="/img/logo.png"/>
      <span class="head_title">智慧用电监管云平台</span>
    </div>
    <div class="right_icon">
      <span class="y-icon-tuichu header_icon">
        <span class="signout" style="cursor: pointer" @click="loginOut">退出</span>
      </span>
      <span class="y-icon-menu-outline header_icon" style="cursor: pointer" @click="toManager"></span>
    </div>
  </div>
</template>

<script>
import eventBus from './enentBus.js'
export default {
  name: "header",
  components: {
  },
  data () {
    return {
      tabNum:1,
    };
  },
  computed: {
  },
  created () {
  },
  mounted () {
    eventBus.$on("nowTab",(data)=>{
      if(data=='tab1'){
        this.tabNum=1
      }else if(data=='tab2'){
        this.tabNum=2
      }else if(data=='tab3'){
        this.tabNum=3
      }else{
        this.tabNum=4
      }
      console.log(this.tabNum)
    })
  },
  methods: {
    toManager(){
      this.$router.push({ path: "/" });
    },
    selectTab (item) {
      this.$emit("change", item)
    },
    loginOut(){
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    }
  }
};
</script>

<style lang="scss">
$color: #02f6fc;
.header{
  height: 75px;
  line-height: 75px;
  background: url('/img/screen/title.png') no-repeat;
  background-size:100% 75px;
  .head_center{
    display: flex;
    justify-content: center;
    align-items: center;
    .head_title{
      font-size: 30px;
      color: $color;
    }
    .head_logo{
      height: 30px;
    }
  }
  .right_icon{
    position: absolute;
    display: flex;
    top: -13px;
    right: 40px;
    .header_icon{
      position: relative;
      display: flex;
      flex: 1;
      justify-content: center;
      font-size: 25px !important;
      color: $color;
      padding: 0 10px;
      .notice_num{
        position: absolute;
        left: 50px;
        top: 10px;
        font-style:normal;
        font-size: 12px;
        background: $color;
        color: #000;
        height: 14px;
        line-height: 14px;
        width: 14px;
        text-align: center;
        border-radius: 50%;
      }
      .signout{
        font-size: 15px;
        line-height: 75px;
        display: inline-block;
        width: 44px;
        text-align: center;
      }
    }
  }
}

</style>
