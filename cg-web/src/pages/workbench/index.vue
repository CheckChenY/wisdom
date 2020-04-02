<template>
    <div class="jtl">
        <MenuHeader></MenuHeader>
        <div style="display: flex;">
            <MenuLeft></MenuLeft>
            <div class="content">
                <div class="icons-list" style="position: fixed;top:50%;right:0;z-index:10000000000000000000000000000000000;">
                    <!-- <a-popover> -->
                    <div style="width:60px;height:60px;text-align:right">
                             <!-- @mouseleave="onMouseleaveImg" -->
                        <a-popover placement="left" @mouseenter="onMouseenterImg"
                                                    @mouseleave="onMouseleaveImg"
                        >
                            <template slot="content">
                                <!-- <a-button> -->
                                    <router-link target="_blank" tag="a" rel="noopener noreferrer" to="workplatform">
                                        <i class="icon-gongzuotai" style="font-size:24px;"></i>
                                    </router-link>
                                <!-- </a-button> -->
                            </template>
                            <!-- <template slot="title">
                                <span>Title</span>
                            </template> -->
                            <img :src="srcImgUrl" style="=width:40px;height:60px;" />
                            <!-- <a-button>Left</a-button> -->
                        </a-popover>
                    </div>
                </div>
                <div class="cont_child">
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MenuHeader from '@/components/MenuHeader'
import MenuLeft from '@/components/MenuLeft'
export default {
    name:'workbench',
    components:{
        MenuHeader:MenuHeader,
        MenuLeft:MenuLeft
    },
    data(){
    return{
        srcImgUrl:require('../../assets/logo/paner.png')
    }
  },
  watch:{
  },
  created(){
  },
  mounted(){
      },
  methods:{
        onMouseenterImg(){
            this.srcImgUrl = require('../../assets/logo/panerFlag.png')
        },
        onMouseleaveImg(){
            setTimeout(()=>{
                this.srcImgUrl = require('../../assets/logo/paner.png')
            },3000)
        }
  }
}
</script>
<style lang="scss">
.jtl{
    .content{
        position: fixed;
        top:70px;
        left:250px;
        right:0;
        bottom:0;
        background:#f1f1f1;
        .cont_child{
            padding:10px;
            margin: 10px;
            max-height: 840px;
            overflow-y: scroll;
            background:#fff;
        }
    }
}
</style>