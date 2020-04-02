
export const tableOption = {
  'labelWidth': 140,
  'border': true,
  'stripe': true,
  'selection': true,
  'menuAlign': "center",
  'menuWidth':400,
  'menuAlign':'left',
  'align': "center",
  'editBtn': false,
  'delBtn': false,
  'addBtn': false,
  'dic': [],
  'column': [{
    label: '设备ID',
    prop: 'deviceId',
    search: true,
    span: 12,
    rules: [{
      required: true,
      message: '请输入设备ID'
    }],
  },
  {
    label: '设备名称',
    prop: 'deviceName',
    span: 12,
    hide:true,
    addDisplay:true,
    editDisplay:true,
    placeholder:''
  },{
    label: '所属系统',
    prop: 'systemId',
    search: true,
    type:'select',
    span: 12,
    dicData: [],
    disabled:true,
    placeholder:''
  },{
    label: '设备类型',
    prop: 'deviceType',
    type:'select',
    width: 200,
    search: true,
    parent:false,
    span: 12,
    dicData: [],
    disabled:true,
    placeholder:''
  },{
    label: '所在建筑',
    prop: 'buildingId',
    type:'select',
    width: 170,
    search: true,
    span: 12,
    dicData: [],
    rules:[{
      required:true,
      message:'请选择建筑'
    }],
  },{
    label: '设备楼层/区域',
    width: 170,
    search: true,
    type:'select',
    prop: 'floorId',
    span: 12,
    dicData: [],
    disabled:true
  },{
    label: '具体位置',
    prop: 'location',
    span: 12,
  },{
    label: '点位标注',
    prop: 'pointSign',
    hide:true,
    formslot: true,
    addDisplay:true,
    editDisplay:true,
    span: 12,
    rules: [{
      required: true,
      message: '请输入点位标注',
      trigger: 'blur',
    }],
  },{
    label: '服务到期时间',
    prop: 'validityTerm',
    hide:true,
    addDisplay:true,
    editDisplay:true,
    span: 12,
    disabled:true,
    placeholder:''
  },
  // {
  //   label: '设备状态',
  //   prop: 'useStatus',
  //   type: 'select',
  //   search: true,
  //   span: 12,
  //   dicData:[],
  //   rules: [{
  //     required: true,
  //     message: '请选择设备状态',
  //     trigger: 'blur',
  //   }],
  // },
  {
    label: '摄像机ip',
    prop: 'deviceIp',
    span: 12,
    addDisplay: false,
    editDisplay: false,
    viewDisplay: false,
    hide: true,
    disabled:true,
    placeholder:''
  },{
    label: '摄像机端口号',
    prop: 'devicePort',
    span: 12,
    addDisplay: false,
    editDisplay: false,
    viewDisplay: false,
    hide: true,
    disabled:true,
    placeholder:''
  },{
    label: '摄像机用户名',
    prop: 'deviceCusername',
    span: 12,
    addDisplay: false,
    editDisplay: false,
    viewDisplay: false,
    hide: true,
    disabled:true,
    placeholder:''
  },{
    label: '摄像机密码',
    prop: 'deviceCpassword',
    span: 12,
    addDisplay: false,
    editDisplay: false,
    viewDisplay: false,
    hide: true,
    disabled:true,
    placeholder:''
  },{
    label: '是否过期',
    prop: 'isLate',
    search:true,
    span: 12,
    type:'select',
    dicData:[{
      label:'有效期',
      value:1
    },{
      label:'即将过期',
      value:2
    },{
      label:'已过期',
      value:3
    }],
    disabled:true,
    placeholder:''
  },{
    label: '设备型号',
    prop: 'deviceModel',
    hide:true,
    addDisplay:true,
    editDisplay:true,
    span: 12,
    disabled:true,
    placeholder:''
  },{
    label: '生产日期',
    prop: 'manufactureDate',
    hide:true,
    addDisplay:true,
    editDisplay:true,
    span: 12,
    disabled:true,
    placeholder:''
  },{
    label: '生产厂家',
    prop: 'manufacturer',
    hide:true,
    addDisplay:true,
    editDisplay:true,
    span: 12,
    disabled:true,
    placeholder:''
  },{
    label: '软件版本',
    prop: 'softwareVersion',
    hide:true,
    addDisplay:true,
    editDisplay:true,
    span: 12,
    disabled:true,
    placeholder:''
  },{
    label: '设备区号',
    prop: 'areaCode',
    hide:true,
    addDisplay:true,
    editDisplay:true,
    span: 12,
    disabled:true,
    placeholder:''
  },{
    label: '设备回路号',
    prop: 'loopNumber',
    hide:true,
    addDisplay:true,
    editDisplay:true,
    span: 12,
    disabled:true,
    placeholder:''
  },{
    label: '点位号',
    prop: 'pointNumber',
    hide:true,
    addDisplay:true,
    editDisplay:true,
    span: 12,
    disabled:true,
    placeholder:''
  },{
    label: '安装时间',
    prop: 'installTime',
    hide:true,
    type:'date',
    disabled:true,
    span: 12,
  },{
    label: '设备型号图',
    prop: 'modelPhoto',
    span: 24,
    hide: true,
    formslot: true,
  },{
    label: '设备周边环境图',
    prop: 'surroundingPhoto',
    span: 24,
    hide: true,
    slot: true,
    formslot: true,
  },
  {
    label: 'ID',
    prop: 'id',
    span: 24,
    hide: true,
    addDisplay:false,
    editDisplay:false,
    placeholder:''
  },
  // {
  //     label: '设备标识码(SN码)',
  //     prop: 'deviceCode',
  //     width: 250,
  //     search: true,
  //     span: 12,
  //     // rules: [{
  //     //   required: true,
  //     //   message: '请输入设备标识码(SN码)',
  //     //   trigger: 'blur',
  //     // }],
  //   },{
  //     label: '设备名称',
  //     prop: 'deviceName',
  //     width: 200,
  //     search: true,
  //     span: 12,
  //     // rules: [{
  //     //   required: true,
  //     //   message: '请输入设备名称',
  //     //   trigger: 'blur',
  //     // }],
  //   },{
  //     label: '设备ID',
  //     prop: 'deviceId',
  //     width: 175,
  //     hide: true,
  //     span: 12,
  //     formslot: true,
  //     rules: [{
  //       required: true,
  //       message: '请输入设备ID',
  //       trigger: 'blur',
  //     }],
  //   },{
      // label: '所在建筑',
      // prop: 'buildingId',
      // width: 170,
      // search: true,
      // type: 'select',
      // span: 12,
      // rules: [{
      //   required: true,
      //   message: '请选择所在建筑',
      //   trigger: 'blur',
      // }],
      // dicData: [],
      // change: '',
  //   },{
      // label: '设备楼层/区域',
      // type: 'select',
      // width: 170,
      // search: true,
      // prop: 'floorId',
      // span: 12,
      // formslot: true,
      // rules: [{
      //   required: true,
      //   message: '请选择设备楼层/区域',
      //   trigger: 'blur',
      // }],
      // dicData: [],
      // valueDefault: '',
  //   },{
      // label: '设备类型',
      // prop: 'deviceType',
      // width: 200,
      // type: 'tree',
      // search: true,
      // parent:false,
      // formslot: true,
      // span: 12,
      // // rules: [{
      // //   required: true,
      // //   message: '请选择设备类型',
      // //   trigger: 'blur',
      // // }],
      // dicData: [],
      // valueDefault: '',
  //   },{
  //     label: '生产日期',
  //     prop: 'manufactureDate',
  //     type: 'date',
  //     format: 'yyyy-MM-dd',
  //     span: 12,
  //     hide: true,
  //     // rules: [{
  //     //   required: true,
  //     //   message: '请选择生产日期',
  //     //   trigger: 'blur',
  //     // }],
  //   },{
  //     label: '设备状态',
  //     prop: 'warnState',
  //     type: 'select',
  //     search: true,
  //     hide: true,
  //     span: 12,
  //     props: {
  //       label: 'label',
  //       value: 'value'
  //     },
  //     dicData: [],
  //     rules: [{
  //       required: true,
  //       message: '请选择设备状态',
  //       trigger: 'blur',
  //     }],
  //   },{
  //     label: '设备型号',
  //     prop: 'deviceModel',
  //     span: 12,
  //     hide: true,
  //     // rules: [{
  //     //   required: true,
  //     //   message: '请输入设备型号',
  //     //   trigger: 'blur',
  //     // }],
  //   },{
  //     label: '生产厂家',
  //     prop: 'manufacturer',
  //     span: 12,
  //     hide: true,
  //     // rules: [{
  //     //   required: true,
  //     //   message: '请输入生产厂家',
  //     //   trigger: 'blur',
  //     // }],
  //   },{
  //     label: '有效期(年)',
  //     prop: 'validityTerm',
  //     hide: true,
  //     formslot: true,
  //     span: 12,
  //     // rules: [{
  //     //   required: true,
  //     //   message: '请输入有效期',
  //     //   trigger: 'blur',
  //     // }],
  //     valueDefault: '',
  //   },{
  //     label: '设备安装位置',
  //     prop: 'location',
  //     span: 12,
  //     hide: true,
  //     rules: [{
  //       required: true,
  //       message: '请输入设备安装位置',
  //       trigger: 'blur',
  //     }],
  //   },{
  //     label: '点位标注',
  //     prop: 'pointSign',
  //     span: 12,
  //     hide: true,
  //     formslot: true,
  //     rules: [{
  //       required: true,
  //       message: '请标注点位',
  //       trigger: 'blur',
  //     }],
  //   },{
      // label: '摄像机用户名',
      // prop: 'deviceCusername',
      // span: 12,
      // addDisplay: false,
      // editDisplay: false,
      // viewDisplay: false,
      // hide: true,
      // formslot: true,
      // rules: [{
      //   required: true,
      //   message: '请添加摄像机用户名',
      //   trigger: 'blur',
      // }],
  //   },{
      // label: '摄像机密码',
      // prop: 'deviceCpassword',
      // span: 12,
      // addDisplay: false,
      // editDisplay: false,
      // viewDisplay: false,
      // hide: true,
      // formslot: true,
      // rules: [{
      //   required: true,
      //   message: '请填写摄像机密码',
      //   trigger: 'blur',
      // }],
  //   },{
      // label: '摄像机ip',
      // prop: 'deviceIp',
      // span: 12,
      // addDisplay: false,
      // editDisplay: false,
      // viewDisplay: false,
      // hide: true,
      // formslot: true,
      // rules: [{
      //   required: true,
      //   message: '请填写摄像机ip',
      //   trigger: 'blur',
      // }],
  //   },{
      // label: '摄像机端口号',
      // prop: 'devicePort',
      // span: 12,
      // addDisplay: false,
      // editDisplay: false,
      // viewDisplay: false,
      // hide: true,
      // formslot: true,
      // rules: [{
      //   required: true,
      //   message: '请填写摄像机端口号',
      //   trigger: 'blur',
      // }],
  //   },{
  //     label: '设备区号',
  //     prop: 'areaCode',
  //     span: 12,
  //     hide: true,
  //   },{
  //     label: '设备回路号',
  //     prop: 'loopNumber',
  //     span: 12,
  //     hide: true,
  //   },{
  //     label: '点位号',
  //     prop: 'pointNumber',
  //     span: 12,
  //     hide: true,
  //   },{
  //     label: '软件版本',
  //     prop: 'softwareVersion',
  //     span: 12,
  //     hide: true,
  //   },{
  //     label: '安装时间',
  //     prop: 'installTime',
  //     type: 'date',
  //     span: 12,
  //     hide: true,
  //     format: "yyyy-MM-dd",
  //   },{
  //   //   label: '关联周边摄像头',
  //   //   prop: 'relevantCamera',
  //   //   // props:{
  //   //   //   label:'name',
  //   //   // },
  //   //   span: 12,
  //   //   type: 'tree',
  //   //   multiple: true,
  //   //   parent: false,
  //   //   dicData: [],
  //   //   hide: true,
  //   // },{
      // label: '设备型号图',
      // prop: 'modelPhoto',
      // span: 24,
      // hide: true,
      // formslot: true,
  //   },{
      // label: '设备周边环境图',
      // prop: 'surroundingPhoto',
      // span: 24,
      // hide: true,
      // slot: true,
      // formslot: true,
  //   },{
  //     label: '是否过期',
  //     prop: 'isInvalid',
  //     width: 80,
  //     span: 12,
  //     slot: true,
  //     addDisplay: false,
  //     editDisplay: false,
  //   },
  ]
}
export const optionUpload = {
  props: {
    label: 'label',
    value: 'value'
  },
  emptyBtn:false,
  submitBtn:false,
  column: [{
    label: "上传文件",
    prop: "upload",
    type: 'upload',
    loadText: '文件上传中，请稍等',
    span: 24,
    rules: [{
        required: true,
        message: "请上传文件",
        trigger: "blur"
    }],
    tip: '提示：.请按照模板格式进行填写，并上传文件。仅支持Excel文件。',
  },{
    prop: "download",
    span: 24,
    formslot: true,
  },{
    label: "建筑名称",
    prop: "buildingId",
    type: 'select',
    dicData: [],
    span: 24,
    rules: [{
        required: true,
        message: "请选择建筑名称",
        trigger: "blur"
    }],
  }]
}