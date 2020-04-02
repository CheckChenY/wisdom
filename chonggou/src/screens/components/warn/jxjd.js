// 获取报警信息
export const getJXJDMsg = (obj) => {
    let noticeMsg = ''
    let item = JSON.parse(obj.detailData); 
    if (!item) {
        return
    }
    var tempNullDatas=item.filter(s=>!s.datas)
    var tempDatas=item.filter(s=>s.datas)
    var resItem=[]
    tempNullDatas.forEach(s=>{
        resItem.push(s)
    })
    tempDatas.forEach(s=>{
        resItem.push(s)
    })
    if (!resItem) {
        return
    }
    resItem.forEach(show => {
        if(show.type === 0){
            noticeMsg += '无报警; '
        }else if(show.type === 1){
            noticeMsg += '设备告警; '
        }else if(show.type === 2){
            noticeMsg += '电池电量低告警; '
        }else if(show.type === 13){
            noticeMsg += '自检测试; '
        }else if(show.type === 17){
            noticeMsg += '设备报警恢复; '
        }else if(show.type === 18){
            noticeMsg += '设备电池电压恢复; '
        }else if(show.type === 19){
            noticeMsg += '设备防拆报警; '
        }else if(show.type === 20){
            noticeMsg += '设备防拆恢复; '
        }else if(show.type === 88){
            noticeMsg += '信号强度:' + show.datas + '; '
        }else if(show.type === 99){
            noticeMsg += '电量:' + show.datas + '%; '
        }
    })

    return noticeMsg
}