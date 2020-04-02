const DEVICESTATUS = [{
  label: '正常',
  value: '0'
},{
  label: '报警',
  value: '1'
},{
  label: '故障',
  value: '2'
},{
  label: '离线',
  value: '4'
}] 
export const tableOption = {
  'labelWidth': 100,
  'border': true,
  'index': true,
  'indexLabel': '序号',
  'stripe': true,
  'menuAlign': "center",
  'align': "center",
  'columnBtn': false,
  'refreshBtn': false,
  'editBtn': false,
  'delBtn': false,
  'addBtn': false,
  'dic': [],
  'searchBtn': false,
  'column': [{
    label: '设备标识码(SN)',
    prop: 'deviceCode',
    width: 200,
    span: 12,
    rules: {
      required: true,
      trigger: 'blur',
      message: '请填写设备标识码'
    }
  },{
    label: '设备名称',
    prop: 'deviceName',
    span: 12,
    rules: {
      required: true,
      trigger: 'blur',
      message: '请填写设备名称'
    }
  },{
    label: '设备类型',
    prop: 'deviceType',
    span: 12,
    width: 200,
    type: 'select',
    // search: true,
    dicData: [],
    rules: {
      required: true,
      trigger: 'blur',
      message: '请选择设备类型'
    },
    valueDefault: ''
  },{
    label: '所属建筑',
    prop: 'buildingId',
    span: 12,
    type: 'select',
    search: true,
    dicData: [],
    rules: {
      required: true,
      trigger: 'blur',
      message: '请选择所属建筑'
    },
    change: '',
    valueDefault: ''
  },{
    label: '所在楼层/区域',
    prop: 'floorId',
    span: 12,
    type: 'select',
    search: true,
    dicData: [],
    valueDefault: '',
  },{
    label: '具体位置',
    prop: 'location',
    span: 12,
    more:true,
  },{
    label: '模拟量值',
    prop: 'status',
    span: 12,
    valueDefault: '0'
  },{
    label: '当前状态',
    prop: 'warnState',
    span: 12,
    type: 'select',
    search: true,
    dicData: DEVICESTATUS,
    valueDefault: '0'
  },{
    label: '状态描述',
    prop: 'status',
    hide: true,
    span: 12,
    valueDefault: '0'
  }]
}
export const statusOption = {
  'border': true,
  'stripe': true,
  'menuAlign': "center",
  'align': "center",
  'menu': false,
  'addBtn': false,
  'dic': [],
  'searchBtn': false,
  'column': [{
    label: '时间',
    prop: 'time',
    span: 12,
    type: 'date',
    format: 'yyyy-MM-dd',
    more:true,
  },{
    label: '设备状态',
    prop: 'status',
    span: 12,
    type: 'select',
    dicData: DEVICESTATUS,
    valueDefault: '0'
  },{
    label: '状态描述',
    prop: 'description',
    span: 12,
  }]
} 