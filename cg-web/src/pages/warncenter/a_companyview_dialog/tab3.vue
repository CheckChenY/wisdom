<template>
    <div style="display: flex;justify-content: space-between;" v-if="tabshow">
        <div style="width:100%;">
            <p style="margin-bottom:10px;">设备可视化</p>
            <DevicePosition
                v-if="loading"
                domTop="260"
                domWidth='1000'
                :offsetY="offsetY"
                :offsetX="offsetX"
                :planFloor="floorPicture"
                :pointSign="pointSign"
                :pointClick="false"
            ></DevicePosition>
        </div>
        <div style="width:300px;margin-left:20px;">
            <p style="margin-bottom:10px;">设备现场图</p>
            <img style="width:100%;" :src="surroundingPhoto" v-if="surroundingPhoto">
            <div style="height:100px;" v-if="!surroundingPhoto"></div>
            <a-button type="primary" style="margin-left:70px;margin-top:30px;" v-if="surroundingPhoto" @click="watchBigImg">查看大图</a-button>
        </div>
        <imageView ref="ImageView"/>
    </div>
</template>
<script>
import { findAlarmPicture } from '@/api/warncenter/warnpublic'
import imageView from "@/components/public/image-view";
import DevicePosition from "@/components/public/device-position";
export default {
    props:['warnnum','visible','record'],
    components:{
        DevicePosition,
        imageView
    },
    watch:{
        visible(){
            this.tabshow=this.visible
        },
        warnnum(){
            if(this.warnnum==3){
                this.tabshow=true
                this.getData()
            }else{
                this.tabshow=false
            }
        }
    },
    mounted(){
        this.getData()
    },
    data(){
        return{
            offsetY:0,
            offsetX:0,
            floorPicture:'',
            pointSign:'50,50',
            tabshow:true,
            surroundingPhoto:'',
            loading:false
        }
    },
    methods:{
        watchBigImg(){
            this.$refs.ImageView.showModel(this.surroundingPhoto)
        },
        getPoinValue(a){
            console.log(a)
        },
        getData(){
            this.loading=false
            findAlarmPicture({param:this.record.id}).then(res=>{
                if(res && res.data && res.data.success){
                    this.loading=true
                    this.pointSign=res.data.value.pointSign
                    this.surroundingPhoto=this.$imgUrl+res.data.value.surroundingPhoto
                    this.floorPicture=this.$imgUrl+res.data.value.floorPicture
                }
            })
        },
    }
}
</script>