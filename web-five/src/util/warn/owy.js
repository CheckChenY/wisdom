// 获取报警信息
export const getOWYMsg = (obj) => {
    let noticeMsg = ''
    let item = JSON.parse(obj.detailData);
    if (!item) {
        return
    }
    item.forEach(show => {
        if(show.type === 5){
            noticeMsg += '当前信号强度:' + show.datas + '; '
        }else if(show.type === 42){
            noticeMsg += '电池低压:' + (show.datas == 1? '正常':'低压') + '; '
        }else if(show.type === 53){
            noticeMsg += 'NB地址电池情况:' + (show.datas == 1? '正常':'低压') + '; '
        }else if(show.type === 54){
            noticeMsg += '烟感底座烟感电池状况:' + (show.datas == 1? '正常':'低压') + '; '
        }else if(show.type === 55){
            noticeMsg += '门状态:' + (show.datas == 1? '打开':'关闭') + '; '
        }else if(show.type === 56){
            noticeMsg += '消防手报状态:' + (show.datas == 1? '弹起':'压下') + '; '
        }else if(show.type === 62){
            noticeMsg += '喷淋状态:' + (show.datas == 1? '打开':'关闭') + '; '
        }else if(show.type === 65){
            noticeMsg += '防拆状态:' + (show.datas == 1? '打开':'压下') + '; '
        }else if(show.type === 111){
            noticeMsg += '烟雾报警; '
        }else if(show.type === 384){
            noticeMsg += '低压报警; '
        }else if(show.type === 993){
            noticeMsg += '底座上的烟感低压; '
        }else if(show.type === 992){
            noticeMsg += 'NB 底座低压报警; '
        }else if(show.type === 991){
            noticeMsg += '燃气报警; '
        }else if(show.type === 990){
            noticeMsg += '消防手报按钮报警; '
        }else if(show.type === 989){
            noticeMsg += '门打开; '
        }else if(show.type === 988){
            noticeMsg += '门关闭; '
        }else if(show.type === 987){
            noticeMsg += '门长时间未关闭; '
        }else if(show.type === 986){
            noticeMsg += '高温报警; '
        }else if(show.type === 985){
            noticeMsg += '漏电报警; '
        }else if(show.type === 984){
            noticeMsg += '温感低压; '
        }else if(show.type === 969){
            noticeMsg += '水浸报警; '
        }else if(show.type === 966){
            noticeMsg += '喷淋打开; '
        }else if(show.type === 965){
            noticeMsg += '喷淋关闭; '
        }else if(show.type === 963){
            noticeMsg += '防拆报警; '
        }
    })

    return noticeMsg
}