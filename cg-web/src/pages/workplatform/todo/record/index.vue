<template>
  <div>
    <a-tabs defaultActiveKey="1" @change="tabChange" size="small">
      <a-tab-pane tab="警情" key="1">
          <warnrecord :tabnum="tabnum"></warnrecord>
      </a-tab-pane>
      <a-tab-pane tab="巡查" key="2" forceRender>
          <patrol :tabnum="tabnum"></patrol>
      </a-tab-pane>
      <a-tab-pane tab="隐患" key="3" forceRender>
          <danger :tabnum="tabnum"></danger>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import warnrecord from './warnrecord'
import danger from './danger/index'
import patrol from './patrol/patrol'
export default {
    components:{
        warnrecord,
        danger,
        patrol,
    },
    data() {
        return {
            tabnum:1
        };
    },
    methods: {
        tabChange(key) {
            this.tabnum=key
        },
    },
};
</script>