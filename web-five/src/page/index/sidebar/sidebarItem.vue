<template>
  <div class="menu-wrapper">
    <el-submenu
      :class="{'el-submenu__title_select': (-2 == selectIndex || defaultTitle.indexOf(indexItem[pathKey]) != -1)}"
      index="-2"
    >
      <template slot="title">
        <i class="y-icon-home" @click="open(indexItem);openSunmenu(-2)"></i>
        <span
          slot="title"
          :class="{'el-menu--display':collapse}"
          @click="open(indexItem);openSunmenu(-2)"
        >{{indexItem.label}}</span>
      </template>
    </el-submenu>
    <template v-for="(item,index) in menu">
      <el-submenu
        :index="filterPath(item[labelKey],index)"
        :key="item[labelKey]"
        :class="{'el-submenu__title_select': (index == selectIndex || defaultTitle.indexOf(item[pathKey]) != -1)}"
      >
        <template slot="title">
          <i :class="item[iconKey]" @click="openSunmenu(index)"></i>
          <span
            slot="title"
            :class="{'el-menu--display':collapse}"
            @click="openSunmenu(index)"
          >{{item[labelKey]}}</span>
        </template>
        <template v-for="(child,cindex) in item[childrenKey]">
          <el-menu-item
            :class="{'siderbar-active':nowTagValue==child[pathKey]}"
            :index="filterPath(child[pathKey],cindex)"
            @click="open(child)"
            v-if="validatenull(child[childrenKey])"
            :key="child[labelKey]"
          >
            <i :class="[child[iconKey], 'icon_menu']"></i>
            <span slot="title">{{child[labelKey]}}</span>
          </el-menu-item>
          <sidebar-item
            v-else
            :menu="child"
            :key="cindex"
            :props="props"
            :screen="screen"
            :collapse="collapse"
          ></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { validatenull } from "@/util/validate";
import { mapGetters } from "vuex";
import config from "./config.js";
export default {
  name: "sidebarItem",
  data() {
    return {
      config: config,
      selectIndex: -1,
      defaultTitle: "",
      indexItem: {
        id: 1,
        label: "首页",
        path: "/index",
        component: "page/jtl",
        icon: "y-icon-home",
        mate: {},
        children: []
      }
    };
  },
  props: {
    menu: {
      type: Array
    },
    screen: {
      type: Number
    },
    props: {
      type: Object,
      default: () => {
        return {};
      }
    },
    collapse: {
      type: Boolean
    }
  },
  created() {
    this.defaultTitle = this.$router.$avueRouter.getValue(this.$route);
    this.selectIndex = -1;
  },
  mounted() {
    // console.log(this.menu)
  },
  watch: {
    $route() {
      this.defaultTitle = this.$router.$avueRouter.getValue(this.$route);
      this.selectIndex = -1;
    }
  },
  computed: {
    labelKey() {
      return this.props.label || this.config.propsDefault.label;
    },
    pathKey() {
      return this.props.path || this.config.propsDefault.path;
    },
    iconKey() {
      return this.props.icon || this.config.propsDefault.icon;
    },
    childrenKey() {
      return this.props.children || this.config.propsDefault.children;
    },
    nowTagValue() {
      return this.$router.$avueRouter.getValue(this.$route);
    },
    ...mapGetters(["isCollapse"])
  },
  methods: {
    validatenull(val) {
      return validatenull(val);
    },
    filterPath(path, index) {
      return path == null ? index + "" : path;
    },
    open(item) {
      if (this.screen <= 1) this.$store.commit("SET_COLLAPSE");
      this.$router.push({
        path: this.$router.$avueRouter.getPath({
          name: item[this.labelKey],
          src: item[this.pathKey]
        }),
        query: item.query
      });
      // sessionStorage.setItem("menuId", item.id);
    },
    openSunmenu(index) {
      this.defaultTitle = "";
      if (this.selectIndex == index) {
        this.selectIndex = -1;
      } else {
        this.selectIndex = index;
      }
    }
  }
};
</script>
<style lang="scss">
//刷新激活状态
.siderbar-active {
  i,
  span {
    color: #fff;
  }
}
.menu-wrapper {
  [class^="y-icon-"] {
    margin-right: 5px;
    width: 24px;
  }
}
.icon_menu {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  color: #909399 !important;
}
</style>

