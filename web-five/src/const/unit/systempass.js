export const option = {
  border:true,
  index: true,
  indexLabel: '序号',
  emptyBtn: false,
  addBtn:false,
  delBtn:false,
  editBtn:false,
  addRowBtn:false,
  cellBtn:false,
  align: 'center',
  keyId: 'id',
  column: [{
    label:'设备类型',
    prop: 'deviceTypeId',
    type: 'select',
    dicData: [],
    cell: true,
    rules: [
      {
        required: true,
        message: '请选择设备类型',
        trigger: 'blur'
      }
    ],
    search:true,
  },{
    label:'远程操作验证密码',
    prop: 'password',
    cell: true,
    rules: [
      {
        required: true,
        message: '请输入远程操作验证密码',
        trigger: 'blur'
      }
    ]
  }]
}