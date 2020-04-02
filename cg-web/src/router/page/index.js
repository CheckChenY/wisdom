import userinfo from '@/pages/userinfo/index.vue'
import index_sg from '@/pages/home/index.vue'
//基础信息部分组件
import baseinfo from '@/pages/baseInfo/baseinfo/index.vue'
import platformcust from '@/pages/baseInfo/platformcust/index.vue'
import appupload from '@/pages/baseInfo/appupload/index.vue'
import buildinginfo from '@/pages/baseInfo/buildinginfo/index.vue'
import unitdevice from '@/pages/baseInfo/unitdevice/index.vue'
import keyfacilities from '@/pages/baseInfo/keyfacilities/index.vue'
import rolemanage from '@/pages/baseInfo/rolemanage/index.vue'
import rolemoney from '@/pages/baseInfo/rolemoney/index.vue'
import usermanage from '@/pages/baseInfo/usermanage/index.vue'
import menumanage from '@/pages/baseInfo/menumanage/index.vue'
import linkdevice from '@/pages/baseInfo/linkdevice/index.vue'
import childunit from '@/pages/baseInfo/childunit/index.vue'
import systemmanage from '@/pages/baseInfo/systemmanage/index.vue'
import alarmpushsetting from '@/pages/baseInfo/alermsetting/alarmpushsetting.vue'
//用户管理
import unitmanage from '@/pages/unitmanage/unitmanage/index.vue'
import unitreview from '@/pages/unitmanage/unitreview/index.vue'
import auditrecord from '@/pages/unitmanage/auditrecord/index.vue'
import unitassociation from '@/pages/unitmanage/unitassociation/index.vue'
//设备管理
import deviceinit from '@/pages/devicemanage/deviceinit/index.vue'
import devicelink from '@/pages/devicemanage/devicelink/index.vue'
import unitdevicemanage from '@/pages/devicemanage/unitdevicemanage/index.vue'
import deviceupgrade from '@/pages/devicemanage/deviceupgrade/index.vue'
import threshinit from '@/pages/devicemanage/threshinit/threshinit.vue'
import devicelib from '@/pages/devicemanage/devicelib/devicelib.vue'
import devmanage from '@/pages/devicemanage/devicemanage/devmanage.vue'
import devicepass from '@/pages/devicemanage/devicepass/devicepass.vue'
import patrollib from '@/pages/devicemanage/patrollib/patrollib.vue'
//远程监控部分组件
import currentdata from '@/pages/monitor/currentdata/currentdata.vue'
import firealarm from '@/pages/monitor/firealarm/firealarm.vue'
import firecock from '@/pages/monitor/firecock/firecock.vue'
import electricfire from '@/pages/monitor/electricfire/electricfire.vue'
import firewireless from '@/pages/monitor/firewireless/firewireless.vue'
import chargingpile from '@/pages/monitor/chargingpile/chargingpile.vue'
import firedoor from '@/pages/monitor/firedoor/firedoor.vue'
import firepower from '@/pages/monitor/firepower/firepower.vue'
import wisdomelec from '@/pages/monitor/wisdomelec/wisdomelec.vue'
import wisdomswitch from '@/pages/monitor/wisdomswitch/wisdomswitch.vue'
import firesurveil from '@/pages/monitor/firesurveil/firesurveil.vue'
import rtmonitor from '@/pages/monitor/rtmonitor/rtmonitor.vue'
//消防安全部分组件
import attendance from '@/pages/fireSafe/attendance/index.vue'
import patrolmanage from '@/pages/fireSafe/patrolmanage/patrolmanage.vue'
import hiddenmanage from '@/pages/fireSafe/hiddenmanage/index.vue'
//字典管理组件
import dictmanage from '@/pages/baseInfo/dictmanage/index.vue'
//警情中心
import warnscan from '@/pages/warncenter/warnscan/index.vue'
import fireautowarn from '@/pages/warncenter/fireautowarn/index.vue'
import firewaterwarn from '@/pages/warncenter/firewaterwarn/index.vue'
import elecfirewarn from '@/pages/warncenter/elecfirewarn/index.vue'
import wirelessfirewarn from '@/pages/warncenter/wirelessfirewarn/index.vue'
import chargingfirewarn from '@/pages/warncenter/chargingfirewarn/index.vue'
import firedoorwarn from '@/pages/warncenter/firedoorwarn/index.vue'
import firepowerwarn from '@/pages/warncenter/firepowerwarn/index.vue'
import wisdomelecwarn from '@/pages/warncenter/wisdomelecwarn/index.vue'
import wisdomswitchwarn from '@/pages/warncenter/wisdomswitchwarn/index.vue'
import companywarn from '@/pages/warncenter/companywarn/index.vue'
//推送通知
import warninfo from '@/pages/pushcenter/warninfo/index.vue'
import message from '@/pages/pushcenter/message/message.vue'

export default [{
    path: '/userinfo',
    name: 'userinfo',
    component: userinfo,
  },{
    path: '/index_sg',
    name: 'index_sg',
    component: index_sg,
  },{
    path: '/baseinfo',
    name: 'baseinfo',
    component: baseinfo,
  },{
    path: '/platformcust',
    name: 'platformcust',
    component: platformcust,
  },{
    path: '/appupload',
    name: 'appupload',
    component: appupload,
  },{
    path: '/buildinginfo',
    name: 'buildinginfo',
    component: buildinginfo,
  },{
    path: '/unitdevice',
    name: 'unitdevice',
    component: unitdevice,
  },{
    path: '/keyfacilities',
    name: 'keyfacilities',
    component: keyfacilities,
  },{
    path: '/rolemanage',
    name: 'rolemanage',
    component: rolemanage,
  },{
    path: '/rolemoney',
    name: 'rolemoney',
    component: rolemoney,
  },{
    path: '/usermanage',
    name: 'usermanage',
    component: usermanage,
  },{
    path: '/menumanage',
    name: 'menumanage',
    component: menumanage,
  },{
    path: '/linkdevice',
    name: 'linkdevice',
    component: linkdevice,
  },{
    path: '/childunit',
    name: 'childunit',
    component: childunit,
  },{
    path: '/systemmanage',
    name: 'systemmanage',
    component: systemmanage,
  },{
    path: '/unitmanage',
    name: 'unitmanage',
    component: unitmanage,
  },{
    path: '/unitreview',
    name: 'unitreview',
    component: unitreview,
  },{
    path: '/auditrecord',
    name: 'auditrecord',
    component: auditrecord,
  },{
    path: '/unitassociation',
    name: 'unitassociation',
    component: unitassociation,
  },{
    path: '/wisdomswitch',
    name: 'wisdomswitch',
    component: wisdomswitch,
  },{
    path: '/firealarm',
    name: 'firealarm',
    component: firealarm,
  },{
    path: '/electricfire',
    name: 'electricfire',
    component: electricfire,
  },{
    path: '/firecock',
    name: 'firecock',
    component: firecock,
  },{
    path: '/firewireless',
    name: 'firewireless',
    component: firewireless,
  },{
    path: '/firesurveil',
    name: 'firesurveil',
    component: firesurveil,
  },{
    path: '/rtmonitor',
    name: 'rtmonitor',
    component: rtmonitor,
  },{
    path: '/chargingpile',
    name: 'chargingpile',
    component: chargingpile,
  },{
    path: '/firedoor',
    name: 'firedoor',
    component: firedoor,
  },{
    path: '/firepower',
    name: 'firepower',
    component: firepower,
  },{
    path: '/wisdomelec',
    name: 'wisdomelec',
    component: wisdomelec,
  },{
    path: '/currentdata',
    name: 'currentdata',
    component: currentdata,
  },{
    path: '/attendance',
    name: 'attendance',
    component: attendance,
  },{
    path: '/patrolmanage',
    name: 'patrolmanage',
    component: patrolmanage,
  },{
    path: '/hiddenmanage',
    name: 'hiddenmanage',
    component: hiddenmanage,
  },{
    path: '/dictmanage',
    name: 'dictmanage',
    component: dictmanage,
  },{
    path: '/deviceinit',
    name: 'deviceinit',
    component: deviceinit,
  },{
    path: '/devicelink',
    name: 'devicelink',
    component: devicelink,
  },{
    path: '/unitdevicemanage',
    name: 'unitdevicemanage',
    component: unitdevicemanage,
  },{
    path: '/deviceupgrade',
    name: 'deviceupgrade',
    component: deviceupgrade,
  },{
    path: '/threshinit',
    name: 'threshinit',
    component: threshinit,
  },{
    path: '/devicelib',
    name: 'devicelib',
    component: devicelib,
  },{
    path: '/devmanage',
    name: 'devmanage',
    component: devmanage,
  },{
    path: '/devicepass',
    name: 'devicepass',
    component: devicepass,
  },{
    path: '/warnscan',
    name: 'warnscan',
    component: warnscan,
  },{
    path: '/fireautowarn',
    name: 'fireautowarn',
    component: fireautowarn,
  },{
    path: '/firewaterwarn',
    name: 'firewaterwarn',
    component: firewaterwarn,
  },{
    path: '/elecfirewarn',
    name: 'elecfirewarn',
    component: elecfirewarn,
  },{
    path: '/wirelessfirewarn',
    name: 'wirelessfirewarn',
    component: wirelessfirewarn,
  },{
    path: '/chargingfirewarn',
    name: 'chargingfirewarn',
    component: chargingfirewarn,
  },{
    path: '/firedoorwarn',
    name: 'firedoorwarn',
    component: firedoorwarn,
  },{
    path: '/firepowerwarn',
    name: 'firepowerwarn',
    component: firepowerwarn,
  },{
    path: '/wisdomelecwarn',
    name: 'wisdomelecwarn',
    component: wisdomelecwarn,
  },{
    path: '/wisdomswitchwarn',
    name: 'wisdomswitchwarn',
    component: wisdomswitchwarn,
  },{
    path: '/alarmpushsetting',
    name: 'alarmpushsetting',
    component: alarmpushsetting,
  },{
    path: '/warninfo',
    name: 'warninfo',
    component: warninfo,
  },{
    path: '/message',
    name: 'message',
    component: message,
  },{
    path: '/patrollib',
    name: 'patrollib',
    component: patrollib,
  },{
    path: '/companywarn',
    name: 'companywarn',
    component: companywarn,
  }]