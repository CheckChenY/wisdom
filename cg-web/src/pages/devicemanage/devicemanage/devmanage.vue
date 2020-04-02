<template>
    <div>
        <a-tabs defaultActiveKey="1" @change="onTabChange">
            <a-tab-pane tab="设备库" key="1">
                <devicelib :tabnum="tabnum"></devicelib>
            </a-tab-pane>
            <a-tab-pane tab="摄像头库" key="2">
                <caremalib :tabnum="tabnum"></caremalib>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import devicelib from './devicelib'
import caremalib from './cameralib/caremalib'
export default {
    components:{
        devicelib,
        caremalib
    },
    data () {
        return {
            tabnum:1
        }
    },
    methods:{
        onTabChange(key) {
            this.tabnum=key
            console.log(key);
        }
    }
    
}
</script>