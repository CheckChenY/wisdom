<template>
    <div>
        <a-row class="device_img">
            <a-col :span="18">
                <div class="img_title">设备可视化</div>
                <div class="img_content">
                <DevicePosition
                    v-if="pointSign"
                    :offsetY="0"
                    :offsetX="0"
                    :planFloor="planFloor"
                    :pointSign="pointSign"
                    :pointClick="false"></DevicePosition>
                </div>
            </a-col>
            <a-col :span="6">
                <div class="img_title">设备现场图</div>
                <div class="img_content">
                    <img :src="surroundingPhoto">
                </div>
                <div class="view_button">
                    <a-button @click="showImg(surroundingPhoto)">查看大图</a-button>
                </div>
            </a-col>
        </a-row>
        <ImageView ref="ImageView"></ImageView>
    </div>
</template>
<script>
import DevicePosition from '@/components/public/device-position'
import ImageView from '@/components/public/image-view'
import { findDevicePictureCamera } from '@/api/monitor/monitor'
export default {
    props: ["paramData"],
    components: {
        DevicePosition,
        ImageView,
    },
    data () {
        return {
           planFloor: '',
           pointSign: '',
           surroundingPhoto: ''
        };
    },
    watch:{
        'paramData.deviceId':function(val, oval){
            this.findDevicePictureCamera(val)
        }
    },
    created () { 
        this.findDevicePictureCamera(this.paramData.deviceId)
    },
    mounted () {
    },
    computed: {
    },
    beforeCreate() {
    },
    destoryed(){
    },
    methods: {
        showImg (url) {
            this.$refs.ImageView.showModel(url)
        },
        findDevicePictureCamera (id) {
            findDevicePictureCamera({deviceId:id}).then(res => {
                if (res && res.data && res.data.success) {
                    this.planFloor = this.$imgUrl + res.data.value.floorPicture
                    this.pointSign = res.data.value.pointSign
                    this.surroundingPhoto = this.$imgUrl + res.data.value.surroundingPhoto
                }
            })
        }
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
