let paramBridge = {}
// 设备数据解析
export const dataAnalisys = (stutasData) => {
    console.log(stutasData)
    let deviceParams = {}
    let arrobj = [];
    paramBridge.stutasData = stutasData
    if (!stutasData.detailData) {
        return deviceParams
    }
    let data = JSON.parse(stutasData.detailData)
    // let arrobj = [];
    for (let i = 0; i < data.length; i++) {
        let objstr = {};
        if (data[i].type == 16) {
            deviceParams.type16 = (data[i].datas[0]/1000).toFixed(2) + 'Mpa'
            deviceParams.label16 = '实时压力';
            objstr['label'] = deviceParams.label16;
            objstr['value'] = deviceParams.type16;
            arrobj.push(objstr)
        }
        if (data[i].type == 28) {
            deviceParams.type28 = (data[i].datas[0]/100).toFixed(2) + 'W'
            deviceParams.label28 = '实时功率'
            objstr['label'] = deviceParams.label28;
            objstr['value'] = deviceParams.type28;
            arrobj.push(objstr)
        }
        if (data[i].type == 30) {
            deviceParams.type30 = (data[i].datas[0]/100).toFixed(2) + 'Kw·h'
            deviceParams.label30 = '实时电能'
            objstr['label'] = deviceParams.label30;
            objstr['value'] = deviceParams.type30;
            arrobj.push(objstr)
        }
        if (data[i].type == 144) {
            deviceParams.type144 = (data[i].datas[0]/1000).toFixed(2) + 'Mpa'
            deviceParams.label144 = '上限阈值'
            objstr['label'] = deviceParams.label144;
            objstr['value'] = deviceParams.type144;
            arrobj.push(objstr)
        }
        if (data[i].type == 146) {
            deviceParams.type146 = (data[i].datas[0]/1000).toFixed(2) + 'Mpa'
            deviceParams.label146 = '下限阈值'
            objstr['label'] = deviceParams.label146;
            objstr['value'] = deviceParams.type146;
            arrobj.push(objstr)
        }
        if (data[i].type == 23) {
            deviceParams.type23 = (data[i].datas[0]/1000).toFixed(3) + 'm'
            deviceParams.label23 = '实时液位'
            objstr['label'] = deviceParams.label23;
            objstr['value'] = deviceParams.type23;
            arrobj.push(objstr)
        }
        if (data[i].type == 140) {
            deviceParams.type140 = (data[i].datas[0]/1000).toFixed(3) + 'm'
            deviceParams.label140 = '上限阈值'
            objstr['label'] = deviceParams.label140;
            objstr['value'] = deviceParams.type140;
            arrobj.push(objstr)
        }
        if (data[i].type == 141) {
            deviceParams.type141 = (data[i].datas[0]/1000).toFixed(3) + 'm'
            deviceParams.label141 = '下限阈值'
            objstr['label'] = deviceParams.label141;
            objstr['value'] = deviceParams.type141;
            arrobj.push(objstr)
        }
        if (data[i].type == 1) {
            paramBridge.type = 1
            deviceParams.type1 = moreDataString(data[i].datas, 'mA')
            deviceParams.label1 = '漏电电流'
            objstr['label'] = deviceParams.label1;
            objstr['value'] = deviceParams.type1;
            arrobj.push(objstr)
        }
        if (data[i].type == 129) {
            deviceParams.type129 = (data[i].datas[0]) + 'mA'
            deviceParams.label129 = '漏电报警阈值'
            objstr['label'] = deviceParams.label129;
            objstr['value'] = deviceParams.type129;
            arrobj.push(objstr)
        }
        if (data[i].type == 2) {
            deviceParams.type2 = moreDataString(data[i].datas, '°C')
            deviceParams.label2 = '四路温度'
            objstr['label'] = deviceParams.label2;
            objstr['value'] = deviceParams.type2;
            arrobj.push(objstr)
        }
        if (data[i].type == 130) {
            deviceParams.type130 = data[i].datas[0] + '°C'
            deviceParams.label130 = '温度报警阈值'
            objstr['label'] = deviceParams.label130;
            objstr['value'] = deviceParams.type130;
            arrobj.push(objstr)
        }
        if (data[i].type == 3) {
            if(data[i].len == 6){
                deviceParams.type3 = moreDataString(data[i].datas, 'V')
                deviceParams.label3 = '三相电压值'
                objstr['label'] = deviceParams.label3;
                objstr['value'] = deviceParams.type3;
                arrobj.push(objstr)
            }
            if(data[i].len == 2){
                deviceParams.type3 = (data[i].datas[0]/10).toFixed(1)+'V'
                deviceParams.label3 = '三相电压值'
                objstr['label'] = deviceParams.label3;
                objstr['value'] = deviceParams.type3;
                arrobj.push(objstr)
            }
        }
        if (data[i].type == 131) {
            deviceParams.type131 = '过压' + data[i].datas[0] + 'V,  ' + '欠压' + data[i].datas[1] + 'V'
            deviceParams.label131 = '电压报警阈值'
            objstr['label'] = deviceParams.label131;
            objstr['value'] = deviceParams.type131;
            arrobj.push(objstr)
        }
        if (data[i].type == 4) {
            // paramBridge.bridgeType4 = data[i].datas
            // paramBridge.bridgeLabel4 = '三相电流值'
            if(data[i].len == 6){
                deviceParams.type4 = moreDataString(data[i].datas, 'A', 1)
                deviceParams.label4 = '三相电流值'
                objstr['label'] = deviceParams.label4;
                objstr['value'] = deviceParams.type4;
                arrobj.push(objstr)
            }
            if(data[i].len == 2){
                deviceParams.type4 = (data[i].datas[0]/100).toFixed(2)+'A'
                deviceParams.label4 = '三相电流值'
                objstr['label'] = deviceParams.label4;
                objstr['value'] = deviceParams.type4;
                arrobj.push(objstr)
            }
        }
        if (data[i].type == 132) {
            deviceParams.type132 = data[i].datas[0] + 'A'
            deviceParams.label132 = '电流过载阈值'
            objstr['label'] = deviceParams.label132;
            objstr['value'] = deviceParams.type132;
            arrobj.push(objstr)
        }
        if (data[i].type == 139) {
            // paramBridge.bridgeType139 = data[i].datas[0]
            // deviceParams.type4 = moreDataString(paramBridge.bridgeType4, 'A', 1)
            // deviceParams.label4 = paramBridge.bridgeLabel4
        }
        if (data[i].type == 5) {
            deviceParams.type5 = data[i].datas[0]
            deviceParams.label5 = '电弧数量'
            objstr['label'] = deviceParams.label5;
            objstr['value'] = deviceParams.type5;
            arrobj.push(objstr)
        }
        if (data[i].type == 133) {
            deviceParams.type133 = data[i].datas[0]
            deviceParams.label133 = '电弧数量报警阈值'
            objstr['label'] = deviceParams.label133;
            objstr['value'] = deviceParams.type133;
            arrobj.push(objstr)
        }
        if (data[i].type == 88) {
            deviceParams.type88 = data[i].datas[0]
            deviceParams.label88 = '信号强度'
            objstr['label'] = deviceParams.label88;
            objstr['value'] = deviceParams.type88;
            arrobj.push(objstr)
        }
        if (data[i].type == 99) {
            deviceParams.type99 = data[i].datas[0]
            deviceParams.label99 = '电池电量'
            objstr['label'] = deviceParams.label99;
            objstr['value'] = deviceParams.type99;
            arrobj.push(objstr)
        }
        if (data[i].type == 2) {
            deviceParams.type99 = ''
            deviceParams.label99 = '智件电池低电压'
            objstr['label'] = deviceParams.label99;
            objstr['value'] = deviceParams.type99;
            arrobj.push(objstr)
        }
        if (data[i].type == 17) {
            deviceParams.type17 = ''
            deviceParams.label17 = '智件报警恢复'
            objstr['label'] = deviceParams.label17;
            objstr['value'] = deviceParams.type17;
            arrobj.push(objstr)
        }
        if (data[i].type == 18) {
            deviceParams.type18 = ''
            deviceParams.label18 = '智件电池低电压恢复'
            objstr['label'] = deviceParams.label18;
            objstr['value'] = deviceParams.type18;
            arrobj.push(objstr)
        }
        if (data[i].type == 20) {
            deviceParams.type20 = ''
            deviceParams.label20 = '智件防拆恢复'
            objstr['label'] = deviceParams.label20;
            objstr['value'] = deviceParams.type20;
            arrobj.push(objstr)
        }
    }
    // let obj = onchangeDeviceParams(deviceParams)
    return arrobj
}


let moreDataString = (dataList, unit, comput) => {
    let string = ''
    for (let i = 0; i < dataList.length; i++){
        if (dataList[i] == 4081 && unit == '°C') {
            string += abcd[i] + "相温度传感器断路故障  "
        } else if (dataList[i] == 4080 && unit == '°C') {
            string += abcd[i] + "相温度传感器短路故障  "
        } else if (dataList[i] == 4081 && unit == 'A') {
            string += abcd[i] + "漏电探测器断路故障  "
        } else if (dataList[i] == 4080 && unit == 'A') {
            string += abcd[i] + "漏电探测器短路故障  "
        } else if (dataList[i] == 4081 && unit == 'mA') {
            string += "漏电断路故障  "
        } else if (dataList[i] == 4080 && unit == 'mA') {
            string += "漏电短路故障  "
        } else {
            if (comput) {
                if (paramBridge.stutasData.systemId == 3 || paramBridge.stutasData.systemId == 8) {
                    string += abcd[i] + ((dataList[i]/10)).toFixed(2) + unit
                } else {
                    string += abcd[i] + ((dataList[i]/1000)).toFixed(3) + unit
                }
                
                if ((i + 1) != dataList.length) {
                    string += ',  '
                }
            } else {
                if (paramBridge.type == 1) {
                    string += dataList[i] + unit
                } else {
                    string += abcd[i] + dataList[i] + unit
                }
                if ((i + 1) != dataList.length) {
                    string += ',  '
                }
            }
        }
    }
    return string
}

const abcd = {
    "0": "A: ",
    "1": "B: ",
    "2": "C: ",
    "3": "N: ",
}

// 是否可以修改参数
export const canUpdateParam = (type) => {
    switch (type) {
        case 1:
            return false;
        case 2:
            return false;
        case 3:
            return false;
        case 4:
            return false;
        default: 
            return false;

    }
}

// 设备阈值解析
export const thresholdAnalisys = (data) => {
    let deviceParams = {}
    for (let i = 0; i < data.length; i++) {
        if (data[i].type == 144) {
            deviceParams.type144 = data[i].datas[0]
            deviceParams.label144 = '上限阈值'
        }
        if (data[i].type == 146) {
            deviceParams.type146 = data[i].datas[0]
            deviceParams.label146 = '下限阈值'
        }
        if (data[i].type == 140) {
            deviceParams.type140 = data[i].datas[0]
            deviceParams.label140 = '上限阈值'
        }
        if (data[i].type == 141) {
            deviceParams.type141 = data[i].datas[0]
            deviceParams.label141 = '下限阈值'
        }
        if (data[i].type == 129) {
            deviceParams.type129 = data[i].datas[0]
            deviceParams.label129 = '漏电报警阈值'
        }
        if (data[i].type == 130) {
            deviceParams.type130 = data[i].datas[0]
            deviceParams.label130 = '温度报警阈值'
        }
        if (data[i].type == 131) {
            deviceParams.type131a = data[i].datas[0]
            deviceParams.label131a = '电压过压报警阈值'
            deviceParams.type131b = data[i].datas[1]
            deviceParams.label131b = '电压欠压报警阈值'
        }
        if (data[i].type == 132) {
            if (data[i].datas.length > 1) {
                deviceParams.type132a = data[i].datas[0]
                deviceParams.label132a = '电流过载阈值1'
                deviceParams.type132b = data[i].datas[1]
                deviceParams.label132b = '电流过载阈值2'
            } else {
                deviceParams.type132 = data[i].datas[0]
                deviceParams.label132 = '电流过载阈值'
            }
            
        }
        if (data[i].type == 133) {
            deviceParams.type133 = data[i].datas[0]
            deviceParams.label133 = '电弧数量报警阈值'
        }
    }
    return deviceParams
}