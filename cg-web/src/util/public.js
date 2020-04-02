import { dict } from '@/const/dict'
import { message } from 'ant-design-vue';
import { isvalidatemobile } from "@/util/validate"

export const  dataSpec = (data) => {
    for (let key in data) {
        if (key === 'modelImg' || 
            key === 'surroundingPhoto' || 
            key === 'orgImg' || 
            key === 'modelPhoto' || 
            key === 'floorPicture' || 
            key === 'warnDealResultPhoto' || 
            key === 'patrolPhoto' || 
            key === 'plantformLog' || 
            key === 'backgroundImg' || 
            key === 'logo' || 
            key === 'avatar' || 
            key === 'handPhoto' || 
            key === 'scenePhoto' ||
            key === 'plan') {
            if (data[key]) data[key] = data[key].replace(new RegExp(dict.IMGURL,"gm"),'')
        }
    }
    return data
}

const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
export const  validateparam = (data) => {
    for (let key in data) {
        if ((key === "orgName" 
            || key === "orgCode" 
            || key === "username" 
            || key === "legalPerson" 
            || key === "packageName" 
            || key === "deviceName" 
            || key === "deviceCode" 
            || key === "realName" )
            && data[key] && pattern.test(data[key])) {
            message.error("参数中不能有特殊字符")
            return true
        }
        switch (key) {
            case 'orgName':
                if (data[key] && !/[\u4e00-\u9fa5]/.test(data[key])) {
                    message.error("单位名称必须是汉字")
                    return true
                } else {
                    return false
                }
            case 'orgCode':
                if (data[key] && !/^[A-Za-z0-9]+$/.test(data[key])) {
                    message.error("统一社会信用代码/组织机构代码只能是数字加字母")
                    return true
                } else {
                    return false
                }
            case 'phone':
                if(data[key] && isvalidatemobile(data[key])[0]){
                    message.error(isvalidatemobile(data[key])[1])
                    return
                } else {
                    return false
                }
        }
    }
    return false
}

// 远程操作说明解析
export const remoteAnalys = (handle) => {
    switch(handle){
        case '消音':
            return dict.REMOTEDICT[1]
        case '自检':
            return dict.REMOTEDICT[0]
        case '远程消音':
            return dict.REMOTEDICT[1]
        case '远程复位':
            return dict.REMOTEDICT[4]
        case '远程自检':
            return dict.REMOTEDICT[0]
        case '远程升级数据包':
            return dict.REMOTEDICT[3]
        case '远程上电':
            return dict.REMOTEDICT[6]
        case '远程断电':
            return dict.REMOTEDICT[5]
        case '远程升级':
            return dict.REMOTEDICT[3]
        case '启动':
            return dict.REMOTEDICT[7]
        case '输出':
            return dict.REMOTEDICT[8]
        default:
            return dict.REMOTEDICT[9]
    }
}