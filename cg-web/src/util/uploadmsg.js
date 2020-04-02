import Vue from 'vue'
import uploadmsg from '@/components/device/uploadmsg-pop'

const uploadmsgBox = Vue.extend(uploadmsg)

uploadmsg.install = function (data) {
  let instance = new uploadmsgBox({
    data
  }).$mount()

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.previewVisible = true
    // previewVisible 和弹窗组件里的previewVisible对应，用于控制显隐
  })
}

export default uploadmsg