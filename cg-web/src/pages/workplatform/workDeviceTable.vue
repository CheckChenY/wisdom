<template>
    <div>
        <a-row>
            <a-col :span="24">
                <a-layout-header>
                    <span>设备监控总览</span>
                </a-layout-header>
                <a-layout>
                    <a-layout-content>
                        <div class="content_left">
                            <a-row>
                                <a-col :span="24" >
                                    <a-tabs v-model="activeKey"
                                        @change="onChangeTab">
                                        <a-tab-pane tab="异常设备" key="1" :activeKey="activeKey">
                                            <Abnormal />
                                        </a-tab-pane>
                                        <a-tab-pane tab="正常设备" key="2" :activeKey="activeKey">
                                            <Normal />
                                        </a-tab-pane>
                                        <a-tab-pane tab="摄像头设备" key="3" :activeKey="activeKey">
                                            <Videos />
                                        </a-tab-pane>
                                        <a-button slot="tabBarExtraContent">
                                            <router-link target="_blank" tag="a" rel="noopener noreferrer" to="currentdata">更多</router-link>
                                        </a-button>
                                        
                                    </a-tabs>
                                </a-col>
                            </a-row>
                        </div>
                    </a-layout-content>
                </a-layout>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import Abnormal from './workTableTab/abnormal';
import Normal from './workTableTab/normal';
import Videos from './workTableTab/videos';
export default {
    name:'workDeviceTable',
    components:{
        Abnormal:Abnormal,
        Normal:Normal,
        Videos:Videos
    },
    data(){
        return{
            activeKey:'1',
        }
    },
    watch:{

    },
    created(){

    },
    mounted(){
    },
    methods:{
        onChangeTab(item){
            this.activeKey = item
            console.log(item)
        }
    }
}
</script>
<style lang="scss">
    .content_left{
        border:1px #ebeef5 solid;
        background-color: #ffffff;
        margin: 10px;
        padding: 2px;
    }
</style>