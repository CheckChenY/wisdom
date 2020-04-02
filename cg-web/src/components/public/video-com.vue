<template>
  <div class="videoCom_box" style="width: 100%; height: 100%;">
    <!-- <video id="my-video" controls preload="auto" poster="../../../public/img/icon_light.png" style="width:100%;height:100%;" class="video-js vjs-default-skin">
      <source :src="url" type="application/x-mpegURL">
    </video> -->
    <div id="video" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
// import videojs from 'video.js'
// import 'videojs-contrib-hls'

var player;
// http://39.108.213.89:8091/hls/c844150006c9.m3u8
export default {
  name: "videoCom",
  props:['url'],
  components: {
  },
  data() {
    return {
    };
  },
  created() {
  },
  watch:{
    url(val){
      this.url=val
      this.startPlay()
    }
  },
  computed: {},
  mounted() {
    this.startPlay()
  },
  methods: {
    startPlay(){
      setTimeout(()=>{
        var videoObject = {
          container: '#video', //容器的ID或className
          variable: 'player',//播放函数名称
          poster:'material/poster.jpg',//封面图片
          autoplay:true,
          debug:true,
          //flashplayer:true,
          video: [//视频地址列表形式
            [this.url, '', '中文标清', 0],
          ]
        };
        var player = new ckplayer(videoObject)
        console.log(player)
      },500)
    }
  }
};
</script>
<style lang="scss" scoped>
</style>