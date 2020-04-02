<template>
  <div class="avue-logo">
    <transition name="fade">
      <span v-if="keyCollapse"
            class="avue-logo_subtitle"
            key="0">
        <!-- {{website.logo}} -->
        <img class="avue-logo_logo" :src="logo"/>
      </span>
    </transition>
    <transition-group name="fade">
      <template v-if="!keyCollapse">
        <img class="avue-logo_logo" key="0" :src="logo"/>
        <span class="avue-logo_title"
              key="1">{{indexTitle}} </span>
      </template>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getObj } from '@/api/unit/baseinfo'
export default {
  name: "logo",
  data () {
    return {
      logo: require('../../../public/img/logo/meun.png'),
      indexTitle: ''
    }
  },
  created () {
    this.getBaseInfo()
  },
  computed: {
    ...mapGetters(["website", 'keyCollapse'])
  },
  methods: {
    // 获取基础信息详情
    getBaseInfo () {
      getObj().then(res => {
        if (res && res.data && res.data.code === '0') {
          this.indexTitle = res.data.data.orgName
          if (res.data.data.logo) 
            this.logo =  res.data.data.logo
        }
      })
    },
  }
};
</script>

<style lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.avue-logo {
  // position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 95px;
  // line-height: 50px;
  text-align: center;
  background-color: #272c33;
  font-size: 20px;
  overflow: hidden;
  box-sizing: border-box;
  // box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: rgba(255, 255, 255, 0.8);
  z-index: 1024;
  &_title {
    display: block;
    text-align: center;
    font-weight: 300;
    font-size: 15px;
    position: relative;
    bottom: 12px;
  }
  &_logo{
    width: 60px;
    height: 60px;
    border-radius: 100%;
  }
  &_subtitle {
    display: block;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
}
</style>