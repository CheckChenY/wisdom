<template>
    <div>
        <LinkVideo ref="childComponent" :record="record"/>
    </div>
</template>
<script>
import LinkVideo from "@/components/public/LinkVideo.vue"
export default {
    props: ["record","warnnum"],
    components: {
        LinkVideo,
    },
    data () {
        return {
            
        };
    },
    watch: {
        warnnum(){
            if(this.warnnum==4){
                this.$refs.childComponent.getCameraList(this.record)
            }
        }
    },
    created () {
        
    },
    mounted () {
        this.$refs.childComponent.getCameraList(this.record)
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
