<template>
    <div class="work_platform">
        <MenuHeader></MenuHeader>
        <div style="display: flex;">
            <div class="content">
                <div class="cont_child">
                    <a-row class="cont_row">
                        <a-col :span="16">
                            <WorkBaseInfo />
                        </a-col>
                        <a-col :span="8">
                           <todo></todo>
                        </a-col>
                    </a-row>
                    <a-row class="cont_row">
                        <a-col :span="16">
                            <workWaringLine />
                        </a-col>
                        <a-col :span="8">
                            <quickoperat></quickoperat>
                        </a-col>
                    </a-row>
                    <a-row class="cont_row">
                        <a-col :span="16">
                            <WorkDeviceTable />
                        </a-col>
                        <a-col :span="8">
                            <a-layout>
                                <a-layout-header>
                                    <span>警情与通知</span>
                                    <!-- <a-icon type="more" /> -->
                                    <a-popover placement="bottom">
                                        <template slot="content">
                                            <a-list size="small">
                                                <a-list-item>
                                                    <router-link target="_blank" tag="a" rel="noopener noreferrer" to="warninfo">
                                                        警情信息
                                                    </router-link>
                                                </a-list-item>
                                                <a-list-item>
                                                    <router-link target="_blank" tag="a" rel="noopener noreferrer" to="message">
                                                        消息查看
                                                    </router-link>
                                                </a-list-item>
                                            </a-list>
                                        </template>
                                        <a-icon type="more" />
                                    </a-popover>
                                </a-layout-header>
                                <a-layout-content>
                                    <alertnotice></alertnotice>
                                </a-layout-content>
                            </a-layout>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MenuHeader from './MenuHeader'
import WorkBaseInfo from './workBaseInfo'
import WorkWaringLine from './workWaringLine'
import WorkDeviceTable from './workDeviceTable'
import todo from './todo'
import quickoperat from './quickoperat'
import alertnotice from './alertnotice'
export default {
    name:'workbench',
    components:{
        MenuHeader:MenuHeader,
        WorkBaseInfo:WorkBaseInfo,
        WorkWaringLine:WorkWaringLine,
        WorkDeviceTable:WorkDeviceTable,
        todo,
        quickoperat,
        alertnotice
    },
    data(){
    return{
            visible: false,
        }
    },
    watch:{
    },
    created(){
    },
    mounted(){
    },
    methods:{
    }
}
</script>
<style lang="scss">
.work_platform{
    .content{
        position: fixed;
        top:70px;
        left:0px;
        right:0;
        bottom:0;
        background:#f1f1f1;
        .cont_child{
            padding:10px;
            margin: 10px;
            max-height: 840px;
            overflow-y: scroll;
            background:#fff;
            .cont_row{
                .ant-layout-header {
                    background: #fff;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 16px;
                    font-weight: bold;
                }
                .ant-layout{
                    background: #fff;
                }
            }
        }
    }
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
        padding: 8px 8px;
    }
    .platform_cont{
        height: 300px;
        overflow: auto;
    }
}
</style>