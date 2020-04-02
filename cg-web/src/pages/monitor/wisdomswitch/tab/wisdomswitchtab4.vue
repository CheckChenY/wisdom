<template>
    <div>
        <LinkVideo ref="childComponent" :record="record"/>
    </div>
</template>
<script>
import LinkVideo from "@/components/public/LinkVideo.vue"
export default {
    props: ["paramData","tabnum"],
    components: {
        LinkVideo,
    },
    data () {
        return {
            record: '',
        };
    },
    watch: {
        tabnum(){
            if(this.tabnum==4){
                console.log('视频')
                this.$refs.childComponent.getCameraList(this.paramData)
            }
        }
    },
    created () {
        
    },
    mounted () {
        this.$refs.childComponent.getCameraList(this.paramData)
    },
    computed: {
    },
    beforeCreate() {
    },
    destoryed(){
    },
    methods: {
    }
}
</script>
<style lang="scss">
.device_img{
    height: 400px;
    overflow: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    .img_title{
        font-size: 17px;
        padding-left: 20px;
    }
    .img_content{
        padding: 0px 20px;
        img{
            width: 100%;
        }
    }
    .view_button{
        text-align: center;
        margin-top: 20px;
    }
}
</style>
