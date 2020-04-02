export const dict = {
    USESTATE: [
        {label:'正常',value:'0'},
        {label:'报警',value:1},
        {label:'故障',value:2},
        {label:'报警&故障',value:3},
        {label:'离线',value:4},
        {label:'温湿度传感器故障',value:11}
    ],
    REMOTEDICT: [
        {label:'检查设备情况，设备自检',value:'a'},
        {label:'设备报警，消音并处理',value:'b'},
        {label:'设备故障，屏蔽并处理',value:'c'},
        {label:'系统更新，远程升级',value:'d'},
        {label:'隐患排除，远程复位',value:'e'},
        {label:'短路过载，紧急断电',value:'f'},
        {label:'断电恢复，远程上电',value:'g'},
        {label:'设备启动',value:'i'},
        {label:'设备输出',value:'j'},
        {label:'其他，请填写说明',value:'h'},
    ],
    ALARMLEVEL: [
        {label:'无报警',value:'0'},
        {label:'一般',value:'1'},
        {label:'重要',value:'2'},
        {label:'严重',value:'3'},
        {label:'其他',value:'5'},
    ],
    BINDSTATE: [
        {label:'绑定',value:'1'},
        {label:'未绑定',value:'2'},
    ],
    PUSHTYPE: [
        {label:'APP推送',value:'1'},
        {label:'web端推送',value:'2'},
        {label:'短信推送',value:'3'}
    ],
    NOTICETYPE: [
        // {label:'警情消息',value:1},
        {label:'业务消息',value:'2'},
        {label:'通知消息',value:'3'},
        // {label:'内部通知',value:31},
        // {label:'单位通知',value:32},
        // {label:'真实火警',value:33},
        {label:'系统消息',value:'4'},
        // {label:'设备消息',value:5},
    ],
    SENDOBJECT: [
        {label:'内部消息',value:31},
        {label:'单位消息',value:32},
    ],
    POINTTYPE: [
        {label:'消火栓',value:'1'},
        {label:'防火门',value:'2'},
        {label:'安全出口',value:'3'},
        {label:'配电箱',value:'4'},
        {label:'疏散通道',value:'5'},
        {label:'灭火器',value:'6'},
        {label:'应急照明灯',value:'7'},
        {label:'消防水泵',value:'8'},
        {label:'水泵房',value:'9'},
        {label:'配电室',value:'10'},
        {label:'应急疏散标志',value:'11'},
        {label:'其他',value:'0'}
    ],
    IMGURL: "http://192.168.0.186:60080/"
}