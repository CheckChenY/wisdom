import { getJTLMsg } from './warn/jtl'
import { getJXJDMsg } from './warn/jxjd'
import { getSZHMMsg } from './warn/szhm'
import { getOWYMsg } from './warn/owy'
// 获取报警信息
// getOWYMsg(obj)
export const getWarnMsg = (obj) => {
  switch (obj.statusDes) {
    case '1':
      return getJXJDMsg(obj)
    case '2':
      return getJTLMsg(obj)
    case '3':
      return getJTLMsg(obj)
    case '4':
      return getSZHMMsg(obj)
    default:
      return ''
  }
}
