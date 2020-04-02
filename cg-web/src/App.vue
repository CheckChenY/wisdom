<template>
  <div id="app">
    <router-view />
    <warnDialog></warnDialog>
  </div>
</template>
<script>
import warnDialog from '@/components/public/warn-dialog'
export default {
  name: 'App',
  components: {
    warnDialog
  },
  data(){
    return{
    }
  },
  created(){
  },
  mounted(){
  },
  methods:{
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  /* text-align: center; */
  /* color: #2c3e50; */
}
::-webkit-scrollbar { /*滚动条整体样式*/
    width: 6px !important;; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px !important;;
    background: #ffffff !important;;
    cursor: pointer !important;
}
::-webkit-scrollbar-track { /*滚动条里面轨道*/
    /* border-top:1px #ebeef5 solid; */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
