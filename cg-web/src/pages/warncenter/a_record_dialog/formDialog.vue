<template>
    <div class="form_dialog">
        <a-drawer
            width='1000px'
            title="记录详情"
            :visible="visible"
            destroyOnClose
            @close="handleCancel">
            <a-tabs @change="onTabChange" :activeKey="activeKey" style="margin-top:-10px;">
                <a-tab-pane tab="警情信息" key="1">
                    <tab1 :warnnum="activeKey" :visible="visible" :record="record"></tab1>
                </a-tab-pane>
                <a-tab-pane tab="报警数据" key="2">
                    <tab2 :warnnum="activeKey" :record="record"></tab2>
                </a-tab-pane>
                <a-tab-pane tab="状态跟踪" key="3">
                    <tab3 :warnnum="activeKey" :record="record"></tab3>
                </a-tab-pane>
                <a-tab-pane tab="相关图片" key="4">
                    <tab4 :warnnum="activeKey" :visible="visible" :record="record"></tab4>
                </a-tab-pane>
                <a-tab-pane tab="联动记录" key="5">
                    <tab5 :warnnum="activeKey" :record="record"></tab5>
                </a-tab-pane>
            </a-tabs>
        </a-drawer>
    </div>
</template>
<script>
// import { addFile } from "@/api/public"
import { uploadDeviceFile,addFile } from '@/api/devicemanage/deviceupgrade'
import tab1 from './tab1'
import tab2 from './tab2'
import tab3 from './tab3'
import tab4 from './tab4'
import tab5 from './tab5'
export default {
    props:["dialogShow","record"],
    components:{
        tab1,
        tab2,
        tab3,
        tab4,
        tab5,
    },
    data() {
        return {
            visible:false,
            activeKey:'1'
        };
    },
    watch: {
        dialogShow(){
            if(this.dialogShow){
                this.activeKey='1'
                this.$store.dispatch("setRowLight", this.record.id)
                this.visible=true
            }else{
                this.visible=false
            }
        }
    },
    created(){
        
    },
    methods: {
        onTabChange(key){
            this.activeKey=key
        },
        handleCancel(){
            this.$emit('cancel','')
            this.$store.dispatch("setRowLight", '')
        },
    },
};
</script>