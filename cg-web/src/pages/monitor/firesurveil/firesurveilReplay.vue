<template>
    <div class="form_dialog">
        <a-drawer
            title="视频回放"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
            :width="900"
            >
            
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    components:{
    },
    data() {
        return {
            visible: false,
        };
    },
    created(){
    },
    methods: {
        showDrawer(record) {
            this.visible = true;
        },
        onClose() {
            this.visible = false;
        },
    },
};
</script>
<style lang='scss'>
.form_dialog{
    .table-operations {
        text-align: left;
        margin-bottom: 16px;
    }

    .table-operations > button {
        margin-right: 8px;
    }
}
</style>