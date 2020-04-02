<template>
  <div id="app">
    <router-view />
    <div style="position: fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:2001;display:flex;justify-content: center;align-items: center;" v-if="dialogVisible">
      <div style="width:50%;margin:0 auto;background:#fff;">
        <div style="height:80px;background:rgb(177,3,3);padding:0 30px;color: #fff;line-height:80px;font-size: 20px;">
            <i class="el-icon-warning" style="margin-right:10px;"></i>
            <span>欠压报警</span>
        </div>
        <div style="position:relative;padding:50px;">
          <div style="width:50px;height:50px;background:yellow;position:absolute;right:60px;top:-65px;">
            <img src="/img/deng.gif" style="width:100%;height:100%;"/>
          </div>
          <p style="color:rgb(177,3,3)">{{deviceName}} ({{id}})</p>
          <p style="color:rgb(177,3,3)">设备类型：{{deviceType}}</p>
          <p style="color:rgb(177,3,3)">所属区域：{{address}}</p>
          <p style="color:rgb(177,3,3)">地址：{{bulidingName}}-{{floor}}</p>
          <p style="color:rgb(177,3,3)">报警时间：{{createTime}}</p>
          <p style="color:rgb(177,3,3)">负责人：{{safetyManager}}</p>
          <p style="color:rgb(177,3,3)">电话：{{safetyManagerPhone}}</p>
        </div>
        <div style="height:80px;">
            <el-button type="warning" plain @click="dialogVisible = false" style="float: right;margin-right:30px;">取 消</el-button>
            <el-button type="warning" @click="deal" style="float: right;margin-right:30px;">立即处理</el-button>
        </div>
      </div>
      <audio :autoplay="true" :controls="false" :loop="false" :src="src"></audio>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { getObj } from '@/api/unit/baseinfo.js'
import { dateformat } from '@/util/date.js';
export default {
  name: 'app',
  data () {
    return {
      screenHeight:document.body.clientHeight,
      orgId:'',
      dialogVisible:false,
      address:'',
      bulidingName:'',
      createTime:'',
      deviceName:'',
      deviceType:'',
      floor:'',
      safetyManager:'',
      safetyManagerPhone:'',
      id:'',
      src:'',
      goEasy:''
    }
  },
  watch: {
    // screenHeight(){
    //   let app = document.getElementById('app');
    //   app.style.height = document.body.clientHeight + 'px';
    //   console.log(document.body.clientHeight)
    // }
  },
  created () {
    var that=this
    console.log(document.body.clientHeight)
    dateformat()
    that.handleGoEasy()
    
    that.goEasy = new GoEasy({
      appkey: "BC-d37b456029a34135aca224cddb3da88f"
    });

    if(window.location.hash.replace(/#\//,'')!='login'){
      getObj().then(res=>{
        if(res && res.data && res.data.code==='0'){
          that.orgId=res.data.data.id

          console.log('开始订阅'+'channel',that.orgId.toString())

          window.localStorage.setItem('orgId',that.orgId.toString())

          that.goEasy.subscribe({
            channel: that.orgId.toString(),
            onMessage: function (message) {
              console.log('接收订阅成功')
              that.dialogVisible=true
              that.address=JSON.parse(message.content).address
              that.id=JSON.parse(message.content).id
              that.bulidingName=JSON.parse(message.content).bulidingName
              that.createTime=JSON.parse(message.content).createTime
              that.deviceName=JSON.parse(message.content).deviceName
              that.floor=JSON.parse(message.content).floor
              that.safetyManager=JSON.parse(message.content).safetyManager
              that.safetyManagerPhone=JSON.parse(message.content).safetyManagerPhone
            },
            onFailed: function (error) {
              console.log(error)
            }
          });
        }
      })
    }else{
      if(window.localStorage.getItem('orgId') && window.localStorage.getItem('orgId')!='null'){
        that.goEasy.unsubscribe({
          channel: window.localStorage.getItem('orgId'),
          onSuccess: function (res) {
              console.log('取消订阅')
          }
        });
      }
    }
  },
  mounted () {

  },
  methods:{
    say(){
//       $.ajax({
//         type:"GET",
//         url:"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=bBcLHNsgjazbRZuAYVgnWMQ3&client_secret=HASc5Yj6A8uHcDt5EnlqNAUfCK0BfbM1&",
//         dataType:"json", 
//         beforeSend: function(xhr) {
//           xhr.setRequestHeader("organId:'1333333333'");
//         },
//         success:function(res){
//            console.log(res)
//         }
//       });
    },
    deal(){
      this.$router.push('/monitor/industry')
      this.dialogVisible=false
    },
    handleGoEasy () {
      
    }
  },
  computed: {}
}
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  // height: 100%;
  // height: 943px;
  // background-color: #f1f1f1;
  /* overflow: scroll; */
      
}
</style>