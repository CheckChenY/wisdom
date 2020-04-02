<template>
     <a-layout>
        <a-layout-header>
            <span>待办事项</span>
            <a-popover placement="bottom">
                <template slot="content">
                    <a-list size="small">
                        <a-list-item>
                            <router-link target="_blank" tag="a" rel="noopener noreferrer" to="warnscan">
                                警情处理
                            </router-link>
                        </a-list-item>
                        <a-list-item>
                            <router-link target="_blank" tag="a" rel="noopener noreferrer" to="patrolmanage">
                                巡查记录
                            </router-link>
                        </a-list-item>
                        <a-list-item>
                            <router-link target="_blank" tag="a" rel="noopener noreferrer" to="hiddenmanage">
                                隐患管理
                            </router-link>
                        </a-list-item>
                    </a-list>
                </template>
                <a-icon type="more" />
            </a-popover>

        </a-layout-header>
        <a-layout-content class="content_left" style="height:300px;overflow:scroll">
            <div>
                <a-tabs defaultActiveKey="1" @change="tabChange" size="small">
                <a-tab-pane tab="待处理" key="1">
                    <tab1 :tabnum="tabnum"></tab1>
                </a-tab-pane>
                <a-tab-pane tab="已处理" key="2" forceRender>
                    <tab2 :tabnum="tabnum"></tab2>
                </a-tab-pane>
                </a-tabs>
            </div>
        </a-layout-content>
    </a-layout>
</template>
<script>
import tab1 from './todo/deal/index'
import tab2 from './todo/record/index'
export default {
    components:{
        tab1,
        tab2,
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