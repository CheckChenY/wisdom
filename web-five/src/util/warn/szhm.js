// 获取报警信息
export const getSZHMMsg = (obj) => {
    let noticeMsg = ''
    let item = JSON.parse(obj.detailData);
    if (!item) {
        return
    }
    item.forEach(show => {
        if(show.type === 88){
            noticeMsg += '当前信号强度:' + show.datas + '; '
        }else if(show.type === 99){
            noticeMsg += '当前电量:' + show.datas + '%; '
        }else if(show.type === 100){
            noticeMsg += '烟雾浓度:' + show.datas + '%; '
        }else if(show.type === 0){
            noticeMsg += '无报警; '
        }else if(show.type === 1){
            noticeMsg += '烟雾报警; '
        }else if(show.type === 2){
            noticeMsg += '烟雾报警解除; '
        }else if(show.type === 3){
            noticeMsg += '温度报警; '
        }else if(show.type === 4){
            noticeMsg += '温度报警解除; '
        }else if(show.type === 5){
            noticeMsg += '烟感低电量报警解除; '
        }else if(show.type === 6){
            noticeMsg += '烟感低电量报警解除; '
        }else if(show.type === 7){
            noticeMsg += 'NB低电量报警; '
        }else if(show.type === 8){
            noticeMsg += 'NB低电量报警解除; '
        }else if(show.type === 9){
            noticeMsg += '烟雾传感器故障; '
        }else if(show.type === 10){
            noticeMsg += '烟雾传感器故障解除; '
        }else if(show.type === 11){
            noticeMsg += '温湿度传感器故障; '
        }else if(show.type === 12){
            noticeMsg += '温湿度传感器故障解除; '
        }else if(show.type === 13){
            noticeMsg += '自检测试开始; '
        }else if(show.type === 14){
            noticeMsg += '自检测试完成; '
        }else if(show.type === 15){
            noticeMsg += '防拆触发; '
        }else if(show.type === 16){
            noticeMsg += '防拆恢复; '
        }else if(show.type === 17){
            noticeMsg += '烟雾板连接断开; '
        }else if(show.type === 18){
            noticeMsg += '烟雾板连接恢复; '
        }
    })

    return noticeMsg
}