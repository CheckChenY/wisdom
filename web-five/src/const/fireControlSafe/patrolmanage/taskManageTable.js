export const tableOption = {
  labelWidth: 220,
  menuWidth:100,
  // border:true,
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
    prop: 'patrolTaskId',
    hide: true,
    display: false,
  },{
    label:'巡查点名称',
    prop: 'patrolPointName',
  },{
    label:'巡查点类型',
    prop: 'patrolPointType',
    type: 'select',
    dicData: [],
    search: true,
  },{
    label:'巡查卡编码',
    prop: 'cardCode',
  },{
    label:'所在建筑',
    type:'select',
    prop: 'buildingId',
    dicData: [],
  },{
    label:'所属楼层',
    type:'select',
    prop: 'floorId',
    dicData: [],
  },{
    label:'所在位置',
    prop: 'location',
    hide: true,
  },{
    label:'巡查状态',
    prop: 'patrolStatus',
    type: 'select',
    search: true,
    dicData: [{
      label:'已巡查',
      value:'1'
    },{
      label:'待巡查',
      value:'2'
    }],
  },{
    label:'巡查时间',
    prop: 'createTime',
    hide: true,
  },{
    label:'巡查描述',
    type: 'textarea',
    prop: 'patrolRemark',
    hide: true,
  },{
    label:'巡查结果',
    prop: 'patrolResult',
  },{
    label:'现场图片',
    prop: 'patrolPhoto',
    hide: true,
    formslot: true,
    valueDefault: 'http://pic25.nipic.com/20121205/10197997_003647426000_2.jpg',
  }]
}
 