export const tableOption = {
  labelWidth: 120,
  indexLabel: '序号',
  menuWidth: 300,
  index:true,
  border:true,
  emptyBtn: false,
  addBtn:false,
  editBtn:false,
  cellBtn: false,
  delBtn: false,
  columnBtn: false,
  refreshBtn: false,
  align: "center",
  keyId: 'id',
  column: [{
    prop: 'id',
    hide: true,
    display: false,
  },{
    prop: 'orgId',
    hide: true,
    display: false,
  },{
    label:'任务名称',
    prop: 'patrolName',
    span: 24,
    search: true,
    rules: [
      {
        required: true,
        message: '请输入任务名称',
        trigger: 'blur'
      }
    ]
  },{
    label:'巡查点个数',
    prop: 'pointCount',
    addDisplay:false,
    editDisplay:false,
    valueDefault: 0,
  },{
    label:'巡查人',
    prop: 'userId',
    type: 'select',
    span: 24,
    dicData: [],
    search: true,
    rules: [{
      required: true,
      message: '请选择巡查人',
      trigger: 'blur'
    }],
  },{
    label:'备注说明',
    span: 24,
    prop: 'remark',
    type: 'textarea',
    hide: true,
  },{
    label: '配置任务巡查点',
    span: 24,
    prop: 'protalList',
    addDisplay: false,
    hide: true,
    formslot: true,
  }]
}
