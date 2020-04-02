// 获取报警信息
export const getJTLMsg = (obj) => {
  console.log(obj)
  let warn, deviceParams, noticeMsg = ''
  let goodsData = require('./warn.json')
  try {
    deviceParams = dataAnalisys(JSON.parse(obj.detailData))
  } catch (e) {
    deviceParams = {}
  }
  if (obj.controCmd == 17 || obj.controCmd == 30) {
    if ( !goodsData[obj.deviceModel]) {
      return
    }
    warn = goodsData[obj.deviceModel][obj.controCmd]
    // debugger;
    if (!warn) {
      return
    }
    
    if (obj.warn01 == 1) {
      if (deviceParams.warn3a) {
        noticeMsg += warn['warn01'] + " " + deviceParams.warn3a + "; "
      } else {
        noticeMsg += warn['warn01'] + "; "
      }
    }
    if (obj.warn02 == 1) {
      if (deviceParams.warn3b) {
        noticeMsg += warn['warn02'] + " " + deviceParams.warn3b + "; "
      } else {
        noticeMsg += warn['warn02'] + "; "
      }
    }
    if (obj.warn03 == 1) {
      if (deviceParams.warn3c) {
        noticeMsg += warn['warn03'] + " " + deviceParams.warn3c + "; "
      } else {
        noticeMsg += warn['warn03'] + "; "
      }
    }
    if (obj.warn04 == 1) {
      noticeMsg += warn['warn04'] + "; "
    }
    if (obj.warn05 == 1) {
      noticeMsg += warn['warn05'] + "; "
    }
    if (obj.warn06 == 1) {
      noticeMsg += warn['warn06'] + "; "
    }
    if (obj.warn07 == 1) {
      noticeMsg += warn['warn07'] + "; "
    }
    if (obj.warn08 == 1) {
      noticeMsg += warn['warn08'] + "; "
    }
    if (obj.warn09 == 1) {
      noticeMsg += warn['warn09'] + "; "
    }
    if (obj.warn10 == 1) {
      noticeMsg += warn['warn10'] + "; "
    }
    if (obj.warn11 == 1) {
      noticeMsg += warn['warn11'] + "; "
    }
    if (obj.warn12 == 1) {
      noticeMsg += warn['warn12'] + "; "
    }
    if (obj.warn13 == 1) {
      noticeMsg += warn['warn13'] + "; "
    }
    if (obj.warn14 == 1) {
      noticeMsg += warn['warn14'] + "; "
    }
    if (obj.warn15 == 1) {
      noticeMsg += warn['warn15'] + "; "
    }
    if (obj.warn16 == 1) {
      noticeMsg += warn['warn16'] + "; "
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
    // debugger;
    if (!warn) {
      return
    }
    if (obj.warn02 == 1) {
      noticeMsg += warn['warn02'] + "; "
    }
    if (obj.warn03 == 1) {
      noticeMsg += warn['warn03'] + "; "
    }
    if (obj.warn04 == 1) {
      noticeMsg += warn['warn04'] + "; "
    }
    if (obj.warn05 == 1) {
      noticeMsg += warn['warn05'] + "; "
    }
    if (obj.warn06 == 1) {
      noticeMsg += warn['warn06'] + "; "
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
  return noticeMsg;
}
  
// 设备数据解析
const dataAnalisys = (data) => {
  let deviceParams = {}
  let param = {}
  if (!data) {
    return
  }

  for (let i = 0; i < data.length; i++) {
      if (data[i].type == 16) {
          param.type16 = data[i].datas[0] + 'Mpa'
          param.label16 = '实时压力'
      }
      if (data[i].type == 144) {
          param.type144 = data[i].datas[0] + 'Mpa'
          param.label144 = '上限阈值'
      }
      if (data[i].type == 146) {
          param.type146 = data[i].datas[0] + 'Mpa'
          param.label146 = '下限阈值'
      }
      if (data[i].type == 23) {
          param.type23 = (data[i].datas[0]/1000).toFixed(2) + 'm'
          param.label23 = '实时液位'
      }
      if (data[i].type == 140) {
          param.type140 = (data[i].datas[0]/1000).toFixed(2) + 'm'
          param.label140 = '上限阈值'
      }
      if (data[i].type == 141) {
          param.type141 = (data[i].datas[0]/1000).toFixed(2) + 'm'
          param.label141 = '下限阈值'
      }
      if (data[i].type == 1) {
          param.type1 = (data[i].datas[0]*1000) + 'A'
          param.label1 = '漏电电流'
      }
      if (data[i].type == 129) {
          param.type129 = data[i].datas[0] + 'A'
          param.label129 = '漏电报警阈值'
      }
      if (data[i].type == 2) {
          param.type2 = moreDataString(data[i].datas, '°C')
          param.label2 = '四相温度'
      }
      if (data[i].type == 130) {
          param.type130 = data[i].datas[0] + '°C'
          param.label130 = '温度报警阈值'
      }
      if (data[i].type == 3) {
          param.type3 = data[i].datas
          param.label3 = '三相电压值'
      }
      if (data[i].type == 131) {
          param.type131a = data[i].datas[0]
          param.type131b = data[i].datas[1]
          param.label131a = '电压过压报警阈值'
          param.label131b = '电压欠压报警阈值'
      }
      if (data[i].type == 4) {
          param.type4 = moreDataString(data[i].datas, 'A', 1)
          param.label4 = '三相电流值'
      }
      if (data[i].type == 132) {
          param.type132 = data[i].datas[0] + 'A'
          param.label132 = '电流过载阈值'
      }
      if (data[i].type == 5) {
          param.type5 = data[i].datas[0]
          param.label5 = '电弧数量'
      }
      if (data[i].type == 133) {
          param.type133 = data[i].datas[0]
          param.label133 = '电弧数量报警阈值'
      }
      if (data[i].type == 13) {
        param.type13 = data[i].datas
        param.label13 = '电压频率'
      }
  }
  if (param.type3) {
    if (param.type3[0] == 0 && param.type3[1] == 0 && param.type3[2] == 0) {
      deviceParams.warn3a = " 中断供电 "
      deviceParams.warn3b = " 中断供电 "
      deviceParams.warn3c = " 中断供电 "
    } else {
      if (param.type3[0] == 0) {
        deviceParams.warn3a = " 缺相 "
      } else {
        if (param.type3[0] > param.type131a) deviceParams.warn3a = "过压"
        if (param.type3[0] < param.type131b) deviceParams.warn3a = "欠压"
      }
      if (param.type3[1] == 0) {
        deviceParams.warn3b = " 缺相 "
      } else {
        if (param.type3[1] > param.type131a) deviceParams.warn3b = "过压"
        if (param.type3[1] < param.type131b) deviceParams.warn3b = "欠压"
      }
      if (param.type3[2] == 0) {
        deviceParams.warn3c = " 缺相 "
      } else {
        if (param.type3[2] > param.type131a) deviceParams.warn3c = "过压"
        if (param.type3[2] < param.type131b) deviceParams.warn3c = "欠压"
      }
    }
  }
  return deviceParams
}
  
let moreDataString = (dataList, unit, comput) => {
  let string = ''
  for (let i = 0; i < dataList.length; i++){
      if (comput) {
          string += dataList[i]*1000 + unit + ',  '
      } else {
          string += dataList[i] + unit + ',  '
      }
  }
  return string
}