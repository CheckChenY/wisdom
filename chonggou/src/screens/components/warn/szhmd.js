// 获取报警信息
export const getSZHMMsgD = (obj) => {
    let item = JSON.parse(obj.detailData);
    if (!item) {
        return
    }
    switch (obj.deviceType) {
        case '26':
          return smokeAgreement(item)
        case '27':
          return pneumaticAgreement(item)
    }
}

// 烟感
let smokeAgreement = (item) => {
    let noticeMsg = ''
    item.forEach(show => {
        if(show.type === 9999){
            if(show.datas[0] === 0){
                noticeMsg += '无报警; '
            }else if(show.datas[0] === 1){
                noticeMsg += '烟雾报警; '
            }else if(show.datas[0] === 2){
                noticeMsg += '烟雾报警解除; '
            }else if(show.datas[0] === 3){
                noticeMsg += '温度报警; '
            }else if(show.datas[0] === 4){
                noticeMsg += '温度报警解除; '
            }else if(show.datas[0] === 5){
                noticeMsg += '烟感低电量报警解除; '
            }else if(show.datas[0] === 6){
                noticeMsg += '烟感低电量报警解除; '
            }else if(show.datas[0] === 7){
                noticeMsg += 'NB低电量报警; '
            }else if(show.datas[0] === 8){
                noticeMsg += 'NB低电量报警解除; '
            }else if(show.datas[0] === 9){
                noticeMsg += '烟雾传感器故障; '
            }else if(show.datas[0] === 10){
                noticeMsg += '烟雾传感器故障解除; '
            }else if(show.datas[0] === 11){
                noticeMsg += '温湿度传感器故障; '
            }else if(show.datas[0] === 12){
                noticeMsg += '温湿度传感器故障解除; '
            }else if(show.datas[0] === 13){
                noticeMsg += '自检测试开始; '
            }else if(show.datas[0] === 14){
                noticeMsg += '自检测试完成; '
            }else if(show.datas[0] === 15){
                noticeMsg += '防拆触发; '
            }else if(show.datas[0] === 16){
                noticeMsg += '防拆恢复; '
            }else if(show.datas[0] === 17){
                noticeMsg += '烟雾板连接断开; '
            }else if(show.datas[0] === 18){
                noticeMsg += '烟雾板连接恢复; '
            }
        }
    })

    return noticeMsg
}
// 气感
let pneumaticAgreement = (item) => {
    let noticeMsg = ''
    item.forEach(show => {
        if(show.type === 9999){
            if(show.datas[0] === 0){
                noticeMsg += '无报警; '
            }else if(show.datas[0] === 1){
                noticeMsg += 'GAS报警恢复; '
            }else if(show.datas[0] === 2){
                noticeMsg += 'GAS轻度泄漏; '
            }else if(show.datas[0] === 3){
                noticeMsg += 'GAS重度泄漏; '
            }else if(show.datas[0] === 4){
                noticeMsg += '短路故障; '
            }else if(show.datas[0] === 5){
                noticeMsg += '开路故障; '
            }else if(show.datas[0] === 6){
                noticeMsg += '机械手故障; '
            }else if(show.datas[0] === 7){
                noticeMsg += '其他故障; '
            }else if(show.datas[0] === 8){
                noticeMsg += '自检完成; '
            }else if(show.datas[0] === 9){
                noticeMsg += '设备断电; '
            }
        }
    })

    return noticeMsg
}