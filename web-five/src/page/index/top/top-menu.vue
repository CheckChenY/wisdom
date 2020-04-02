<template>
  <div class="top-menu">
    <el-menu :default-active="activeIndex"
             mode="horizontal"
             text-color="#333">
      <!-- <template v-for="(item,index) in items">
        <el-menu-item :index="item.parentId+''"
                      @click.native="openMenu(item)"
                      :key="index">
          <template slot="title">
            <i :class="item.icon"></i>
            <div class="notify" v-if="index != 0">
              <span class="heartbit"></span>
              <span class="point"></span>
            </div>
          </template>
        </el-menu-item>
      </template> -->
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "top-menu",
  data () {
    return {
      activeIndex: "0",
      items: [
        {
          icon: 'y-icon-arrow-left-circle',
          parentId: 0
        },
        {
          label: "消息",
          // href: "/index",
          icon: 'y-icon-tongjifenxi',
          parentId: 1
        },
        {
          label: "邮件",
          icon: 'y-icon-email',
          // href: '/fymk/fydj',
          parentId: 2
        },
        {
          label: "提醒",
          icon: 'y-icon-lingdang',
          // href: "",
          parentId: 3
        }
      ]
    };
  },
  created () {},
  computed: {
    ...mapGetters(["tagCurrent", "menu", "isCollapse"])
  },
  methods: {
    openMenu (item) {
      if (item.parentId == 0) {
        if (this.isCollapse) {
          item.icon = "y-icon-arrow-left-circle";
        } else {
          item.icon = "y-icon-menu-outline";
        }
        this.$store.commit("SET_COLLAPSE");
        return;
      }
      this.$store.dispatch("GetMenu", 0).then((data) => {
        if (data.length === 0) return
        this.$router.addRoutes(this.$router.$avueRouter.formatRoutes(data, true))
        let itemActive,
          childItemActive = 0;
        if (item.href) {
          itemActive = item;
        } else {
          if (this.menu[childItemActive].length == 0) {
            itemActive = this.menu[childItemActive];
          } else {
            itemActive = this.menu[childItemActive].children[childItemActive];
          }
        }
        this.$router.push({
          path: this.$router.$avueRouter.getPath({
            name: itemActive.label,
            src: itemActive.href
          })
        });
      });
    }
  }
};
</script>