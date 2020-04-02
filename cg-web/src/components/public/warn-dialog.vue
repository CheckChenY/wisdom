<template>
  <transition name="fade">
    <div
      style="position: fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:2001;display:flex;justify-content: center;align-items: center;"
      v-if="dialogVisible">
      <div style="width:900px;background:#fff;border-radius: 16px;">
        <div
          style="height:50px;background:rgb(30,157,236);padding:0 30px;color: #fff;line-height:50px;border-radius:16px 16px 0 0;position: relative;">
          <i style="display:block;width:30px;height:30px;font-size: 30px;text-align: center;line-height: 10px;cursor: pointer;position: absolute;right:20px;top:20px;z-index: 100;"
            @click="dialogVisible = false">×</i>
          <p style="position: absolute;left:50px;color:#fff;font-weight: 900;">警情信息</p>
          <div style="width:120px;height:50px;position:absolute;right:50px;top:0;">
            <img src="/img/deng.gif" style="width:100%;height:100%;" />
          </div>
        </div>
        <div style="position:relative;padding:20px 50px;background:#f7fbff;">
          <div style="display: flex;">
            <div style="width:100%;">
              <div style="display:flex;">
                <div
                  style="width:50%;color:#333;font-size:16px;line-height:20px;height:20px;margin-bottom:10px;display:flex;">
                  <div>上报时间：{{warndata.createTime}}</div>
                </div>
                <div
                  style="width:50%;color:#333;font-size:16px;line-height:20px;height:20px;margin-bottom:10px;display:flex;">
                  <div>设备名称：{{warndata.deviceName}}</div>
                </div>
              </div>
              <div style="display:flex;">
                <div
                  style="width:50%;color:#333;font-size:16px;line-height:20px;height:20px;margin-bottom:10px;display:flex;">
                  <div>所属系统：{{warndata.system}}</div>
                </div>
                <div
                  style="width:50%;color:#333;font-size:16px;line-height:20px;height:20px;margin-bottom:10px;display:flex;">
                  <div>设备类型：{{warndata.deviceType}}</div>
                </div>
              </div>
              <div style="display:flex;">
                <div
                  style="width:50%;color:#333;font-size:16px;line-height:20px;height:20px;margin-bottom:10px;display:flex;">
                  <div>所在建筑：{{warndata.building}}</div>
                </div>
                <div
                  style="width:50%;color:#333;font-size:16px;line-height:20px;height:20px;margin-bottom:10px;display:flex;">
                  <div>楼层/区域：{{warndata.floor}}</div>
                </div>
              </div>
              <div style="display:flex;">
                <div
                  style="width:50%;color:#333;font-size:16px;line-height:20px;height:20px;margin-bottom:10px;display:flex;">
                  <div>安装位置：{{warndata.location}}</div>
                </div>
                <div
                  style="width:50%;color:#333;font-size:16px;line-height:20px;height:20px;margin-bottom:10px;display:flex;">
                  <div>设备状态：{{warnTypeList[warndata.alarmType]}}</div>
                </div>
              </div>
              <div style="display:flex;">
                <div
                  style="width:50%;color:#333;font-size:16px;line-height:20px;min-height:20px;margin-bottom:10px;display:flex;">
                  <div>报警类型：{{warndata.alarmDetails}}</div>
                </div>
                <div
                  style="width:50%;color:#333;font-size:16px;line-height:20px;height:20px;margin-bottom:10px;display:flex;">
                  <div>警情程度：{{warndata.alarmLevel}}</div>
                </div>
              </div>
              <div style="display:flex;">
                <div
                  style="width:50%;color:#333;font-size:16px;line-height:20px;height:20px;margin-bottom:10px;display:flex;">
                  <div>联系人：{{companyInfo.userName}}</div>
                </div>
                <div
                  style="width:50%;color:#333;font-size:16px;line-height:20px;height:20px;margin-bottom:10px;display:flex;">
                  <div>联系电话：{{companyInfo.phone}}</div>
                </div>
              </div>
              <div style="display:flex;">
                <LinkVideo ref="childComponent"/>
              </div>
            </div>
          </div>
        </div>
        <div
          style="height:60px;display: flex;justify-content:flex-end;align-items: center;padding:0 30px;rgb(247, 251, 255)">
          <a-button @click="deal" type="primary">处 理</a-button>
        </div>
      </div>
      <audio autoplay loop :src="src"></audio>
    </div>
  </transition>
</template>
<script>
import LinkVideo from "@/components/public/LinkVideo.vue"
import {
  myUser,
  voice,
  findOrgByUserId
} from "@/api/public";
import {
  findDetailById,
} from '@/api/warncenter/warnpublic'
import { dict } from '@/const/dict'
export default {
  name: "warnDialog",
  components: {
    LinkVideo
  },
  data() {
    return {
      dialogVisible: false,
      alertInfo: '',
      createTime: '',
      location: '',
      systemName: '',
      status: '',
      deviceName: '',
      getWayName: '',
      src: '',
      goEasy: '', //推送实例
      warndata: {}, //报警数据
      warnTypeList: { //设备状态
        '0': '测试',
        '1': '报警',
        '2': '故障',
        '3': '报警&故障',
        '4': '离线',
      },
      surroundingPhoto: '', //设备现场图
      companyInfo:{},//company信息
      record:{},
    };
  },
  created() {
    // 实例一个推送对象
    this.goEasy = new GoEasy({
      appkey: "BS-0a6486cd8a66404a9549fa5b4db8914e"
    });
    //刷新重新订阅推送
    var hash = window.location.hash.replace('#/', '')
    if (hash && hash != 'login' && hash != 'register' && hash != 'forgetPass') {
      this.handleGoEasy()
    }
  },
  computed: {},
  watch: {
    //监听路由，登录开始推送，退出取消推送
    $route(to, from) {
      if (to.path.replace('/', '') == 'login') {
        this.cancelGoEasy()
      }
      if (from.path.replace('/', '') != 'login' && (to.path.replace('/', '') != 'register' && to.path.replace('/',
          '') != 'forgetPass')) {
        this.handleGoEasy()
      }
    }
  },
  methods: {
    // login页面  取消订阅推送
    cancelGoEasy() {
      var that = this
      if (window.localStorage.getItem('orgIdForPush') && window.localStorage.getItem('orgIdForPush') != 'null') {
        that.goEasy.unsubscribe({
          channel: 'lxyniubi-' + window.localStorage.getItem('orgIdForPush'),
          onSuccess: function (res) {
            console.log('取消订阅')
          }
        });
      }
    },
    // 订阅推送
    handleGoEasy() {
      let that = this
      myUser().then(res => {
        if (res && res.data && res.data.success) {
          that.orgId = res.data.value.orgId
          console.log('开始订阅' + 'channel', that.orgId.toString())
          window.localStorage.setItem('orgIdForPush', that.orgId.toString())
          that.goEasy.subscribe({
            channel: 'lxyniubi-' + that.orgId,
            onMessage: function (message) {
              //发起请求，看token是否失效，失效取消订阅
              myUser().then(r => {
                if (r && r.data && r.data.success) {
                  console.log('接收订阅成功')
                  let warnobj=JSON.parse(message.content)
                  console.log(warnobj)
                  that.record=warnobj
                  that.getWarnInfo(warnobj)
                  that.$store.dispatch("findCount")
                } else {
                  that.cancelGoEasy()
                }
              })
            },
            onFailed: function (error) {
              console.log(error)
            }
          });
        }
      })
    },
    getWarnInfo(warnobj) {
      console.log(warnobj)
      console.log('根据报警对象获取报警设备信息')
      var that = this
      findDetailById({
        param: warnobj.alarmId
      }).then(res => {
        if (res && res.data && res.data.success) {
          that.getVoice(res.data.value)
          that.warndata = res.data.value
          that.warndata.alarmDetails = that.warndata.alarmDetails.join(',')
          let alarm = dict.ALARMLEVEL.filter(item => item.value == res.data.value.alarmLevel)
          console.log('alarm', alarm)
          if (alarm.length > 0) {
            that.warndata.alarmLevel = alarm[0].label
          }
          that.dialogVisible = true
          that.$nextTick(()=>{
            that.$refs.childComponent.getCameraList(that.warndata)
          })
        }
      })
      findOrgByUserId().then(res=>{
          console.log( res.data.value)
          if(res.data.success){
              this.companyInfo=res.data.value
          }
      })
    },
    getVoice(data) {
      var that = this
      voice({
        grant_type: 'client_credentials',
        client_id: 'exGgEq28ZBlBAXf4TF1GzhV8',
        client_secret: 'KvhCI9LlSKE4DFgsxZM4GweDP0Aqu68u'
      }).then(res => {
        var textStr=`${data.building}${data.floor}${data.location}${data.deviceName}${data.alarmDetails}`
        textStr=textStr.replace(/;/g,',').replace(/:/g,'').replace(/%/g,'')
        that.src =
          `http://tsn.baidu.com/text2audio?tex=${textStr}&lan=zh&per=3&cuid=${that.orgId}&ctp=1&tok=${res.data.access_token}`
        console.log(that.src)
      })
    },
    deal(){
      let path=window.location.hash.replace('#/','')
      if(path=='warnscan'){
        this.dialogVisible = false
      }else{
        this.dialogVisible = false
        this.$router.push('warnscan')
      }
    }
  }
}
</script>
