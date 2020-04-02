const DIC = {
    VAILD: [{
      label: '是',
      value: '1'
    }, {
      label: '否',
      value: '0'
    }],
    SEX: [{
      label: '男',
      value: '0'
    }, {
      label: '女',
      value: '1'
    }]
  }
  export const tableOption = {
    labelWidth: 220,
    indexLabel: '序号',
    index:true,
    selection: true,
    border:true,
    emptyBtn: false,
    addBtn:false,
    editBtn:false,
    cellBtn: false,
    delBtn: false,
    menu: false,
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
      search: true,
    },{
      label:'所在建筑',
      prop: 'buildingId',
      type: 'select',
      dicData: [],
    },{
      label:'所在楼层区域',
      prop: 'floorId',
      type: 'select',
      dicData: [],
    },{
      label:'所在位置',
      prop: 'location',
    }]
  }
 