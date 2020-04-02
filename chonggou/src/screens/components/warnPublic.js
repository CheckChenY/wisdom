import { getJTLMsg } from './warn/jtl'
import { getJTLMsgD } from './warn/jtld'
import { getJXJDMsg } from './warn/jxjd'
import { getJXJDMsgD } from './warn/jxjdd'
import { getSZHMMsg } from './warn/szhm'
import { getSZHMMsgD } from './warn/szhmd'
import { getOWYMsg } from './warn/owy'
// 获取报警信息
export const getWarnMsg = (obj) => {
  // console.log(obj)
  switch (parseInt(obj.profileId)) {
    case 1:
      return getJXJDMsg(obj.deviceAlertDeal)
    case 2:
      return getJTLMsg(obj.deviceAlertDeal)
    case 3:
      return getJTLMsg(obj.deviceAlertDeal)
    case 4:
      return getSZHMMsg(obj.deviceAlertDeal)
    case 8:
      return getJXJDMsg(obj.deviceAlertDeal)
    case 9:
      return getJTLMsg(obj.deviceAlertDeal)
    default:
      return getJTLMsg(obj.deviceAlertDeal)
  }
}

export const getDialogMsg = (obj) => {
  // console.log(obj)
  switch (parseInt(obj.profileId)) {
    case 1:
      return getJXJDMsgD(obj)
    case 2:
      return getJTLMsg(obj)
    case 3:
      return getJTLMsg(obj)
    case 4:
      return getSZHMMsgD(obj)
    case 8:
      return getJXJDMsgD(obj)
    case 9:
      return getJTLMsg(obj)
    default:
      return getJTLMsgD(obj)
  }
}
