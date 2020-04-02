export const tableOption = {
  // labelWidth: 220,
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
    addDisplay: false,
  },{
    label:'巡查点类型',
    prop: 'patrolPointType',
    type: 'select',
    dicData: [],
    search: true,
    addDisplay: false,
  },{
    label:'巡查卡编码',
    prop: 'cardCode',
    search: true,
    addDisplay: false,
  },{
    label:'所在建筑',
    prop: 'buildingId',
    type: 'select',
    dicData: [],
    addDisplay: false,
    change: '',
  },{
    label:'所在楼层区域',
    prop: 'floorId',
    type: 'select',
    dicData: [],
    addDisplay: false,
  },{
    prop: 'dialog',
    span: 24,
    hide: true,
    formslot:true,
  }]
}
 