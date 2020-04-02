<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div class="home_logo">
        <img class="home_logo_img" src="/img/logo.png">
        <!-- <img class="home_sys_name" v-if="!isCollapse" src="/img/name.png"> -->
        <span class="home_sys_name" v-if="!isCollapse">金特莱智慧消防云平台</span>
      </div>
    </div>
    <h1 class="top-bar__title">
      <!-- v-if="showMenu" -->
      <div class="top-bar__item top-bar__item--show">
        <top-menu></top-menu>
      </div>
      <!-- <span class="top-bar__item"
            v-if="showSearch">
        <top-search></top-search>
      </span> -->
    </h1>
    <div class="weather">
      <iframe width="200" scrolling="no" height="60" frameborder="0" allowtransparency="true" src="//i.tianqi.com/index.php?c=code&id=12&color=%23FFFFFF&icon=1&num=1&site=12"></iframe>
    </div>
    <div class="top-bar__right">
      <!-- v-if="showLock" -->
      <el-tooltip effect="dark"
                  content="锁屏"
                  placement="bottom">
        <div class="top-bar__item">
          <top-lock></top-lock>
        </div>
      </el-tooltip>
      <!-- v-if="showFullScren" -->
      <el-tooltip effect="dark"
                  :content="isFullScren?'退出全屏':'全屏'"
                  placement="bottom">
        <div class="top-bar__item">
          <i :class="isFullScren?'y-icon-tuichuquanping':'y-icon-quanping1'"
             @click="handleScreen"></i>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark"
                  content="用户头像"
                  placement="bottom">
        <img class="top-bar__img"
             :src="userInfo.avatar" v-if="userInfo.avatar">
        <div class="top-bar__tou" v-if="!userInfo.avatar">
          <i class="y-icon-yonghutouxiang"></i>
          
        </div>
      </el-tooltip>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userInfo.realName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>
            <router-link to="/">首页</router-link>
          </el-dropdown-item> -->
          <el-dropdown-item>
            <router-link to="/info/index">个人信息</router-link>
          </el-dropdown-item>
          <!-- <el-dropdown-item>
            <a href="https://gitee.com/smallweigit/avue"
               target="_blank">码云地址</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a href="https://github.com/nmxiaowei/avue"
               target="_blank">github</a>
          </el-dropdown-item> -->
          <el-dropdown-item @click.native="logout"
                            divided>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <top-setting></top-setting> -->
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { fullscreenToggel, listenfullscreen, } from "@/util/util";
import topLock from "./top-lock";
import topMenu from "./top-menu";
import topSearch from './top-search';
import topBreadcrumb from "./top-breadcrumb";
import topColor from "./top-color";
import topTheme from "./top-theme";
import topSetting from "./top-setting";
export default {
  components: { topLock, topMenu, topSearch, topBreadcrumb, topColor, topTheme, topSetting },
  name: "top",
  data () {
    return {
      defaultImg: ''
    };
  },
  filters: {},
  created () {
    // gender 0 男  1 女
    // if (!this.userInfo.avatar) {
    //   this.userInfo.avatar = this.userInfo.gender == '1'? this.website.women: this.website.man
    // }
  },
  mounted () {
    listenfullscreen(this.setScreen);
  },
  computed: {
    ...mapState({
      showDebug: state => state.common.showDebug,
      showColor: state => state.common.showColor,
      showTheme: state => state.common.showTheme,
      showLock: state => state.common.showLock,
      showFullScren: state => state.common.showFullScren,
      showCollapse: state => state.common.showCollapse,
      showSearch: state => state.common.showSearch,
      showMenu: state => state.common.showMenu
    }),
    ...mapGetters([
      "userInfo",
      "isFullScren",
      "tagWel",
      "tagList",
      "isCollapse",
      "tag",
      "logsLen",
      "logsFlag",
      "website"
    ]),
  },
  methods: {
    handleScreen () {
      fullscreenToggel()
    },
    setCollapse () {
      this.$store.commit("SET_COLLAPSE");
    },
    setScreen () {
      this.$store.commit("SET_FULLSCREN");
    },
    logout () {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    },
    // 返回首页
    backHome () {
      this.$router.push({
        path: this.$router.$avueRouter.getPath({
          name: "首页",
          src: "/index"
        })
      });
    }
  }
};
</script>

<style lang="scss">
.top-bar__tou{
  position: relative;
  display: inline-block;
  top: 7px;
  margin: 0 10px 0 5px !important;
}
.y-icon-yonghutouxiang{
  font-size: 40px !important;
  line-height: 33px;
}
</style>

