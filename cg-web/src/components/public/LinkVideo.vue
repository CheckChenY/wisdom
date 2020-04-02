<template>
    <div style="width:100%;height:100%;">
        <div style="margin-bottom:10px;font-size:16px;" v-if="videoList.length && show">来自：<span style="color:#409eff;">{{this.deviceName}} — {{this.location}}</span>
        </div>
        <div style="display: flex;justify-content: center;height:400px;" v-if="(!loading) && videoList.length">
            <videoCom :url="src"></videoCom>
        </div>
        <div style="display: flex;justify-content: center;" v-if="videoListIsNull">
            <div style="width:90%;height:400px;text-align: center;line-height:400px;background: #000;color:#fff;">
                抱歉！暂无关联视频
            </div>
        </div>
        <div style="width:100%;height:400px;display: flex;justify-content: center;align-items: center;" v-if="loading">
            <a-icon type="loading" style="font-size: 30px;"/>
        </div>
        <div style="height:100px;margin-top:20px;" v-if="videoList.length">
            <ul style="overflow: hidden;overflow-x: auto;white-space: nowrap;margin:5px auto;padding-bottom:5px;">
                <li class="video_list" v-for="(video, i) in videoList" :key="i" @click="selectVideo(video)">
                    {{video.deviceName}}{{video.location}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {device, rtmp} from "@/api/warncenter/warnpublic"
    import videoCom from "@/components/public/video-com.vue";

    export default {
        name: "LinkVideo",
        components: {
            videoCom,
        },
        // props: ['record'],
        data() {
            return {
                videoList: [],
                src: '',
                deviceName: '',
                location: '',
                show: false,
                omyvideo: '',
                videoListIsNull: false,
                loading: true,
                record:{}
            };
        },
        created() {
            // this.getCameras(this.deviceLinkCameraId)
        },
        watch: {},
        mounted() {
        },
        methods: {
            getCameraList(record){
                console.log(record)
                this.record=record
                this.show=false
                this.videoList=[]
                this.videoListIsNull=false
                this.loading=true
                this.getData()
            },
            getData() {
                var that = this;
                device({deviceId: this.record.deviceId}).then(res => {
                    that.show = false;
                    that.loading = false;
                    if (res && res.data && res.data.success) {
                        if (res.data.value.length) {
                            that.show = true;
                            that.videoListIsNull = false;
                            that.videoList = res.data.value;
                            that.deviceName = res.data.value[0].deviceName;
                            that.location = res.data.value[0].location;
                            rtmp({deviceCameraId: res.data.value[0].id}).then(video => {
                                console.log(video);
                                if (video && video.data && video.data.success) {
                                    that.src = video.data.value
                                } else {
                                    that.$message.error(video.data.errorMsg)
                                }
                            })
                        } else {
                            that.videoList = [];
                            that.videoListIsNull = true;
                        }
                    }
                })
            },
            selectVideo(video) {
                this.show = true;
                this.deviceName = video.deviceName;
                this.location = video.location;
                this.loading = true;
                rtmp({deviceCameraId: video.id}).then(res => {
                    if (res && res.data && res.data.success) {
                        this.loading = false;
                        this.src = res.data.value;
                    }
                })
                // console.log(video)
                // this.show=true
                // this.deviceName=video.deviceName
                // this.location=video.location
                // this.loading=true
                // camerahls(video.deviceId).then(res=>{
                //     if(res && res.data && res.data.code==='0'){
                //         this.loading=false
                //         // this.omyvideo.stop()
                //         console.log(res.data.data)
                //         this.src=res.data.data
                //         // this.omyvideo.play()
                //     }
                // })
            }
        }
    };
</script>
<style lang="scss">
    .video_list {
        height: 80px;
        width: 200px;
        margin: 0 10px;
        display: inline-block;
        background: #409eff;
        list-style: none;
        cursor: pointer;
        line-height: 80px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        letter-spacing: 1px;
    }
</style>