// 设备数据解析
export const dataAnalisys = (data) => {
    let deviceParams = {}
    for (let i = 0; i < data.length; i++) {
        if (data[i].type == 16) {
            deviceParams.type16 = data[i].datas[0] + 'Mpa'
            deviceParams.label16 = '实时压力'
        }
        if (data[i].type == 144) {
            deviceParams.type144 = data[i].datas[0] + 'Mpa'
            deviceParams.label144 = '上限阈值'
        }
        if (data[i].type == 146) {
            deviceParams.type146 = data[i].datas[0] + 'Mpa'
            deviceParams.label146 = '下限阈值'
        }
        if (data[i].type == 23) {
            deviceParams.type23 = (data[i].datas[0]/1000).toFixed(3) + 'm'
            deviceParams.label23 = '实时液位'
        }
        if (data[i].type == 140) {
            deviceParams.type140 = (data[i].datas[0]/1000).toFixed(3) + 'm'
            deviceParams.label140 = '上限阈值'
        }
        if (data[i].type == 141) {
            deviceParams.type141 = (data[i].datas[0]/1000).toFixed(3) + 'm'
            deviceParams.label141 = '下限阈值'
        }
        if (data[i].type == 1) {
            deviceParams.type1 = moreDataString(data[i].datas, 'mA')
            deviceParams.label1 = '漏电电流'
        }
        if (data[i].type == 129) {
            deviceParams.type129 = (data[i].datas[0]) + 'mA'
            deviceParams.label129 = '漏电报警阈值'
        }
        if (data[i].type == 2) {
            deviceParams.type2 = moreDataString(data[i].datas, '°C')
            deviceParams.label2 = '四路温度'
        }
        if (data[i].type == 130) {
            deviceParams.type130 = data[i].datas[0] + '°C'
            deviceParams.label130 = '温度报警阈值'
        }
        if (data[i].type == 3) {
            deviceParams.type3 = moreDataString(data[i].datas, 'V')
            deviceParams.label3 = '三相电压值'
        }
        if (data[i].type == 131) {
            deviceParams.type131 = '过压' + data[i].datas[0] + 'V,  ' + '欠压' + data[i].datas[1] + 'V'
            deviceParams.label131 = '电压报警阈值'
        }
        if (data[i].type == 4) {
            deviceParams.type4 = moreDataString(data[i].datas, 'A', 1)
            deviceParams.label4 = '三相电流值'
        }
        if (data[i].type == 132) {
            deviceParams.type132 = data[i].datas[0] + 'A'
            deviceParams.label132 = '电流过载阈值'
        }
        if (data[i].type == 5) {
            deviceParams.type5 = data[i].datas[0]
            deviceParams.label5 = '电弧数量'
        }
        if (data[i].type == 133) {
            deviceParams.type133 = data[i].datas[0]
            deviceParams.label133 = '电弧数量报警阈值'
        }
    }
    return deviceParams
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
                if ((i + 1) == dataList.length) {
                  string += abcd[i] + (dataList[i]/1000).toFixed(3) + unit
                } else {
                  string += abcd[i] + (dataList[i]/1000).toFixed(3) + unit + ',  '
                }
            } else {
                if ((i + 1) == dataList.length) {
                  string += abcd[i] + dataList[i] + unit
                } else {
                  string += abcd[i] + dataList[i] + unit + ',  '
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
            deviceParams.type140 = (data[i].datas[0]/1000).toFixed(2)
            deviceParams.label140 = '上限阈值'
        }
        if (data[i].type == 141) {
            deviceParams.type141 = (data[i].datas[0]/1000).toFixed(2)
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
            deviceParams.type132 = data[i].datas[0]
            deviceParams.label132 = '电流过载阈值'
        }
        if (data[i].type == 133) {
            deviceParams.type133 = data[i].datas[0]
            deviceParams.label133 = '电弧数量报警阈值'
        }
    }
    return deviceParams
}