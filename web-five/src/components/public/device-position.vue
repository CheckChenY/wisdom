<template>
  <div class="device_position" style="height:500px">
    <div class="dialog_div" id="dialogPlan" style="height:500px">
      <img :src="planFloor" @click="getPoint" class="dialog_point_img" style="height:500px">
    </div>
  </div>
</template>
<script>
export default {
  name: 'DevicePosition',
  props: {
    // 所在弹窗距离可是窗口顶部距离
    offsetY: {
      type: Number,
      default: 42,
    },
    // 所在弹窗距离可是窗口左侧距离
    offsetX: {
      type: Number,
      default: 10,
    },
    // 楼层图片
    planFloor: {
      type: String,
    },
    // 回显用标记坐标
    pointSign: {
      type: String,
    },
    // 是否执行标记操作
    pointClick: {
      type: Boolean,
    }
  },
  data() {
    return {
    }
  },
  created () {
  },
  mounted() {
    setTimeout(() => {
      this.setPoint()
    }, 800)
  },
  methods: {
    // 获取坐标
    getPoint (e) {
      if (!this.pointClick) {
        return
      }
      let plan = document.getElementById('dialogPlan'); 
      let offsetY2 = plan.offsetTop
      let offsetX2 = plan.offsetLeft
      let imgWidth = e.target.clientWidth
      let imgHeight = e.target.clientHeight
      let ilist = document.getElementsByClassName('point_dialog_div')
      for (let j = 0, len = ilist.length; j < len; j++) {
        plan.removeChild(ilist[j])
      }
      let att = document.createAttribute("class");
      att.value = "point_dialog_icon";
      let attDiv = document.createAttribute("class");
      attDiv.value = "point_dialog_div";
      let div = document.createElement("div")
      div.setAttributeNode(attDiv)
      let i = document.createElement("i");
      i.setAttributeNode(att);
      let left = ((e.clientX - this.offsetX - offsetX2 - 14) / imgWidth) * 100
      let top = ((e.clientY - this.offsetY - offsetY2 - 32) / imgHeight) * 100
      left = left.toFixed(2)
      top = top.toFixed(2)
      div.style.left = left + '%'
      div.style.top = top + '%'
      div.style.display = 'inline'
      div.appendChild(i)
      plan.appendChild(div)
      this.addRedPoint()
      this.$emit("getPoinValue", {'pointSign': left + ',' + top})
    },
    // 回显标注
    setPoint () {
      if (!this.planFloor) {
        return
      }
      let plan = document.getElementById('dialogPlan'); 
      let ilist = document.getElementsByClassName('point_dialog_icon')
      for (let j = 0, len = ilist.length; j < len; j++) {
        if (ilist[j]) {
          plan.removeChild(ilist[j])
        }
      }
      
      if (!this.pointSign) {
        return
      }
      let points = this.pointSign.split(',')
      let att = document.createAttribute("class");
      att.value = "point_dialog_icon";
      let attDiv = document.createAttribute("class");
      attDiv.value = "point_dialog_div";
      let div = document.createElement("div")
      div.setAttributeNode(attDiv)
      let i = document.createElement("i");
      i.setAttributeNode(att)
      div.style.left = points[0] + '%'
      div.style.top = points[1] + '%'
      div.style.display = 'inline'
      div.appendChild(i)
      plan.appendChild(div)
      this.addRedPoint()
    },
    // 添加红点
    addRedPoint () {
      let divEl = document.getElementsByClassName('point_dialog_div')
      let attDiv = document.createAttribute("class");
      attDiv.value = "notify";
      let div = document.createElement("div")
      div.setAttributeNode(attDiv)

      let attSpan1 = document.createAttribute("class");
      attSpan1.value = "heartbit";
      let span1 = document.createElement("span")
      span1.setAttributeNode(attSpan1)
      div.appendChild(span1)

      let attSpan2 = document.createAttribute("class");
      attSpan2.value = "point";
      let span2 = document.createElement("span")
      span2.setAttributeNode(attSpan2)
      div.appendChild(span2)

      divEl[0].appendChild(div)
    },
  }
}
</script>
<style lang="scss">
.device_position{
  .dialog_div{
    position: relative;
  }
  .dialog_point_img{
    width: 100%;
  }
  .point_dialog_div{
    display: none;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 100000;
  }
  .point_dialog_icon::before{
    content: '';
    height: 8px; width: 35px; background: #000; opacity: .2; border-radius: 50%;
    position: absolute;
    top: 47px;
    left: -3px;
    animation: shadow .9s linear infinite;
  }
  .point_dialog_icon::after{
    background-image: url('../../../public/img/icon/position.png');
    background-repeat:no-repeat; 
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    animation: rotate .9s linear infinite;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 30px;
    width: 30px;
  }
  .notify {
    display: none;
    position: relative;
    bottom: 32px;
    left: 12px;
    .heartbit{
      position: absolute;
      top: -14px;
      right: -19px;
      width: 24px;
      height: 24px;
      border-radius: 40px;
      border: #f62d51 solid 5px;
      animation: heartbit 1s ease-out;
      animation-iteration-count: infinite;
      -moz-animation: heartbit 1s ease-out;
      -moz-animation-iteration-count: infinite;
      -o-animation: heartbit 1s ease-out;
      -o-animation-iteration-count: infinite;
      -webkit-animation: heartbit 1s ease-out;
      -webkit-animation-iteration-count: infinite;
      animation-iteration-count: infinite
    }
    .point {
      position: absolute;
      z-index: 1024;
      width: 6px;
      height: 6px;
      border-radius: 3px;
      background-color: #f62d51;
    }
  }
}
@keyframes shadow {
  0%, 100% {transform: scaleX(1);}
  50% {transform: scaleX(1.2);}
}

@keyframes rotate {
  0% {
    transform: translateY(0) ;
  }
  25% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(20px) scale(1.1, 0.9);
  }
  75% {
    transform: translateY(10px) ;
  }
  100% {
    transform: translateY(0) ;
  }
}

@keyframes heartbit {
  0% {
    transform: scale(0);
    opacity: 0.0
  }
  25% {
    transform: scale(0.1);
    opacity: 0.1
  }
  50% {
    transform: scale(0.5);
    opacity: 0.3
  }
  75% {
    transform: scale(0.8);
    opacity: 0.5
  }
  100% {
    transform: scale(1);
    opacity: 0.0
  }
}

@-moz-keyframes heartbit {
  0% {
    -moz-transform: scale(0);
    opacity: 0.0
  }
  25% {
    -moz-transform: scale(0.1);
    opacity: 0.1
  }
  50% {
    -moz-transform: scale(0.5);
    opacity: 0.3
  }
  75% {
    -moz-transform: scale(0.8);
    opacity: 0.5
  }
  100% {
    -moz-transform: scale(1);
    opacity: 0.0
  }
}
@-webkit-keyframes heartbit {
  0% {
    -webkit-transform: scale(0);
    opacity: 0.0
  }
  25% {
    -webkit-transform: scale(0.1);
    opacity: 0.1
  }
  50% {
    -webkit-transform: scale(0.5);
    opacity: 0.3
  }
  75% {
    -webkit-transform: scale(0.8);
    opacity: 0.5
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 0.0
  }
}
</style>
