<template>
    <div>
        <a-tabs defaultActiveKey="1" @change="onTabChange">
            <a-tab-pane tab="注册信息" key="1">
                <tab1></tab1>
            </a-tab-pane>
            <a-tab-pane tab="其他信息" key="2">
                <tab2></tab2>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import tab1 from './tab1'
import tab2 from './tab2'
export default {
    components:{
        tab1,
        tab2
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