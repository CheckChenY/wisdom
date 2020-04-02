<template>
    <div>
        <a-tabs defaultActiveKey="1" @change="onTabChange">
            <a-tab-pane tab="型号字典" key="1">
                <tab1></tab1>
            </a-tab-pane>
            <a-tab-pane tab="数据字典" key="2">
                <tab2></tab2>
            </a-tab-pane>
            <a-tab-pane tab="状态字典" key="3">
                <tab3></tab3>
            </a-tab-pane>
            <a-tab-pane tab="报警类型字典" key="4">
                <tab4></tab4>
            </a-tab-pane>
            <a-tab-pane tab="操作指令字典" key="5">
                <tab5></tab5>
            </a-tab-pane>
            <a-tab-pane tab="阈值字典" key="6">
                <tab6></tab6>
            </a-tab-pane>
            <!-- <a-tab-pane tab="厂商字典" key="7">
                <tab7></tab7>
            </a-tab-pane> -->
            <a-tab-pane tab="设备字典" key="8">
                <tab8></tab8>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import tab1 from './tab1'
import tab2 from './tab2'
import tab3 from './tab3'
import tab4 from './tab4'
import tab5 from './tab5'
import tab6 from './tab6'
import tab7 from './tab7'
import tab8 from './tab8'
export default {
    components:{
        tab1,
        tab2,
        tab3,
        tab4,
        tab5,
        tab6,
        tab7,
        tab8,
    },
    data () {
        return {
        }
    },
    methods:{
        onTabChange(key) {
            console.log(key);
        }
    }
    
}
</script>