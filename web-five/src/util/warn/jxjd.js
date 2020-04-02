// 获取报警信息
export const getJXJDMsg = (obj) => {
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
        }else if(show.type === 0){
            noticeMsg += '无报警; '
        }else if(show.type === 1){
            noticeMsg += '智件告警; '
        }else if(show.type === 2){
            noticeMsg += '当前电池低电压; '
        }else if(show.type === 13){
            noticeMsg += '智件测试; '
        }else if(show.type === 17){
            noticeMsg += '当前智件报警恢复; '
        }else if(show.type === 18){
            noticeMsg += '当前智件电池电压恢复; '
        }else if(show.type === 19){
            noticeMsg += '当前智件防拆报警; '
        }else if(show.type === 20){
            noticeMsg += '当前智件防拆恢复; '
        }
    })

    return noticeMsg
}