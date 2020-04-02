// 获取报警信息
export const getJTLMsgD = (obj) => {
  let warn, noticeMsg = ''
  let goodsData = require('./warn.json')

  if (obj.controCmd == 17 || obj.controCmd == 30) {
    if (!goodsData[obj.deviceModel]) {
      return
    }
    warn = goodsData[obj.deviceModel][obj.controCmd]
    if (!warn) {
      return
    }
    if (obj.warn01 == 1) {
      noticeMsg += warn['warn01'] + " "
    }
    if (obj.warn02 == 1) {
      noticeMsg += warn['warn02'] + " "
    }
    if (obj.warn03 == 1) {
      noticeMsg += warn['warn03'] + " "
    }
    if (obj.warn04 == 1) {
      noticeMsg += warn['warn04'] + " "
    }
    if (obj.warn05 == 1) {
      noticeMsg += warn['warn05'] + " "
    }
    if (obj.warn06 == 1) {
      noticeMsg += warn['warn06'] + " "
    }
    if (obj.warn07 == 1) {
      noticeMsg += warn['warn07'] + " "
    }
    if (obj.warn08 == 1) {
      noticeMsg += warn['warn08'] + " "
    }
    if (obj.warn09 == 1) {
      noticeMsg += warn['warn09'] + " "
    }
    if (obj.warn10 == 1) {
      noticeMsg += warn['warn10'] + " "
    }
    if (obj.warn11 == 1) {
      noticeMsg += warn['warn11'] + " "
    }
    if (obj.warn12 == 1) {
      noticeMsg += warn['warn12'] + " "
    }
    if (obj.warn13 == 1) {
      noticeMsg += warn['warn13'] + " "
    }
    if (obj.warn14 == 1) {
      noticeMsg += warn['warn14'] + " "
    }
    if (obj.warn15 == 1) {
      noticeMsg += warn['warn15'] + " "
    }
    if (obj.warn16 == 1) {
      noticeMsg += warn['warn16'] + " "
    }
    if (obj.warn01 == 0 
      && obj.warn02 == 0 
      && obj.warn03 == 0
      && obj.warn04 == 0
      && obj.warn05 == 0
      && obj.warn06 == 0
      && obj.warn07 == 0
      && obj.warn08 == 0
      && obj.warn09 == 0
      && obj.warn10 == 0
      && obj.warn11 == 0
      && obj.warn12 == 0
      && obj.warn13 == 0
      && obj.warn14 == 0
      && obj.warn15 == 0
      && obj.warn16 == 0) {
      noticeMsg = '无'
    }
  } else {
    warn = goodsData['deviceModel'][obj.deviceType]
    // debugger
    if (!warn) {
      return
    }
    if (obj.warn02 == 1) {
      noticeMsg += warn['warn02'] + " "
    }
    if (obj.warn03 == 1) {
      noticeMsg += warn['warn03'] + " "
    }
    if (obj.warn04 == 1) {
      noticeMsg += warn['warn04'] + " "
    }
    if (obj.warn05 == 1) {
      noticeMsg += warn['warn05'] + " "
    }
    if (obj.warn06 == 1) {
      noticeMsg += warn['warn06'] + " "
    }
    if (obj.warn01 == 0 
      && obj.warn02 == 0 
      && obj.warn03 == 0
      && obj.warn04 == 0
      && obj.warn05 == 0
      && obj.warn06 == 0) {
      noticeMsg = '正常'
    }
    
    if (obj.warn01 == null
      && obj.warn02 == null 
      && obj.warn03 == null
      && obj.warn04 == null
      && obj.warn05 == null
      && obj.warn06 == null) {
      noticeMsg = '无'
    }
  }
  return noticeMsg
}
