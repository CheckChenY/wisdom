<template>
    <a-modal width="70%" title="地理位置" v-model="visibleshow" @ok="handleOk" @cancel="cancel" cancelText="取消" okText="确定">
        <div id="container" style="height:500px;"></div>
    </a-modal>
</template>
<script>


export default {
    data() {
        return {
            pointSign:'',
            visibleshow:false,
        };
    },
    props:['visible','position'],
    watch: {
        visible(){
            var that=this
            this.pointSign=this.position
            this.visibleshow=this.visible
            if(this.visibleshow){
                this.$nextTick(()=>{
                    var map = new BMap.Map("container",{enableMapClick:false});    // 创建Map实例
                    if(this.pointSign){
                        let lng=that.pointSign.split(',')[0]
                        let lat=that.pointSign.split(',')[1]
                        map.centerAndZoom(new BMap.Point(lng, lat), 11);  // 初始化地图,设置中心点坐标和地图级别
                    }else{
                        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
                    }
                    map.enableScrollWheelZoom(true);
                    var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
	                var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
                    map.addControl(top_left_control);        
                    map.addControl(top_left_navigation);    

                    if(that.pointSign){
                        let lng=that.pointSign.split(',')[0]
                        let lat=that.pointSign.split(',')[1]
                        var marker = new BMap.Marker(new BMap.Point(lng, lat));
                        map.clearOverlays()
                        map.addOverlay(marker); 
                    }

                    function showInfo(e){
                        that.pointSign=e.point.lng+','+e.point.lat
                        var marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));
                        map.clearOverlays()
                        map.addOverlay(marker); 
                    }
                    map.addEventListener("click", showInfo);
                })
            }
        },
    },
    created(){
        console.log(this.visible)
    },
    mounted(){
        
    },
    methods: {
        handleOk(){
            this.$emit('getPosition',this.pointSign)
            this.$emit('dialogcancel','')
        },
        cancel(){
            this.$emit('dialogcancel','')
        }
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