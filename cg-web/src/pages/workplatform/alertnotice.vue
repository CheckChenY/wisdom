<template>
  <div>
    <a-tabs defaultActiveKey="1" @change="tabChange">
      <a-tab-pane tab="未读消息" key="1">
        <alertnotice :tabnum="tabnum"></alertnotice>
      </a-tab-pane>
      <a-tab-pane tab="已读消息" key="2" forceRender>
        <inforead :tabnum="tabnum"></inforead>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import alertnotice from './alertnotice/infoview'
import inforead from './alertnotice/inforead'
export default {
  components:{
        alertnotice,
        inforead,
    },
  data() {
    return {
      tabnum: 1,
    };
  },
  methods: {
    tabChange(key) {
      this.tabnum = key
    },
  },
};
</script>