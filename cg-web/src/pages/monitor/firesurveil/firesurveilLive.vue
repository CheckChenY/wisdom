<template>
    <div class="form_dialog">
        <a-drawer
            title="实时视频"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
            :width="900"
            >
            <videoCom :url="src" style="height:500px"></videoCom>
        </a-drawer>
    </div>
</template>
<script>
import moment from 'moment';
import { rtmp } from "@/api/warncenter/warnpublic"
import videoCom from "@/components/public/video-com.vue";
export default {
    components:{
        videoCom
    },
    data() {
        return {
            visible: false,
            record: {},
            src: ''
        };
    },
    created(){
    },
    methods: {
        showDrawer(record) {
            this.visible = true;
            this.record = record
            this.getData()
        },
        onClose() {
            this.visible = false;
        },
        getData() {
            rtmp({deviceCameraId: this.record.id}).then(video => {
                console.log(video);
                if (video && video.data && video.data.success) {
                    this.src = video.data.value
                } else {
                    this.$message.error(video.data.errorMsg)
                }
            })
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