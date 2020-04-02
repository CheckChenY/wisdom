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
export const baseOption = {
  labelWidth: 240,
  emptyBtn: false,
  column: [{
    label: "单位名称",
    prop: "orgName",
    span: 12,
    rules: [{
      required: true,
      message: '请填写单位名称',
      trigger: 'blur'
    }],
    disabled:true
  },{
    label: "单位类型",
    prop: "orgType",
    type: "select",
    dicData: [],
    span: 12,
    rules: [{
      required: true,
      message: '请填写单位类型',
      trigger: 'blur'
    }],
    disabled:true
  },{
    label: "统一社会信用代码/组织机构代码",
    prop: "orgCode",
    span: 12,
    rules: [{
      required: true,
      message: '请填写机构代码',
      trigger: 'blur'
    }],
    disabled:true
  },{
    label: "所在地区",
    prop: "regionId",
    // formslot: true,
    disabled:true,
    span: 12,
    rules: [{
      required: true,
      message: '请填写所在地区',
      trigger: 'blur'
    }]
  },{
    label: "单位地址",
    prop: "address",
    span: 12,
    rules: [{
      required: true,
      message: '请填写单位地址',
      trigger: 'blur'
    }],
    disabled:true
  },{
    label: "地理位置坐标",
    prop: "position",
    formslot: true,
    span: 12,
    rules: [{
      required: true,
      message: '请选择地理位置坐标',
      trigger: 'blur'
    }]
  },{
    label: "成立时间",
    prop: "joinDate",
    type: "date",
    span: 12,
    format:'yyyy-MM-dd',
    valueFormat:'yyyy-MM-dd',
  },{
    label: "法定代表人/法人联系电话",
    type: 'phone',
    prop: "legalPersonPhone",
    span: 12,
    disabled:true,
    rules: [{
      required: true,
      message: '请填写法定代表人/法人联系电话',
      trigger: 'blur'
    }],
  },{
    label: "邮箱地址",
    prop: "email",
    span: 12,
  },{
    label: "法定代表人/法人",
    prop: "legalPerson",
    span: 12,
    disabled:true,
    rules: [{
      required: true,
      message: '请填写法定代表人/法人',
      trigger: 'blur'
    }],
  },
  // {
  //   label: "单位责任人电话",
  //   type: 'phone',
  //   prop: "legalPersonPhone",
  //   span: 12,
  // },
  {
    label: "经营范围（工作范围）",
    placeholder: '企业输入经营范围；非企业单位输入主要工作范围',
    type: 'textarea',
    maxRows: 3,
    prop: "businessScope",
    span: 15,
  },{
    label: "单位Logo",
    prop: "logo",
    formslot: true,
    span: 12
  },{
    label: "单位正面图",
    prop: "frontImg",
    formslot: true,
    span: 12
  },{
    label: "营业执照/组织机构代码证",
    prop: "orgImg",
    formslot: true,
    span: 12,

  }]
}
export const keyOption = {
  labelWidth: 220,
  indexLabel: '编号',
  index:true,
  selection: true,
  border:true,
  emptyBtn: false,
  addBtn:false,
  editBtn:false,
  // addRowBtn:true,
  cellBtn: false,
  delBtn: false,
  keyId: 'id',
  column: [{
    prop: 'id',
    hide: true
  },{
    prop: 'orgId',
    hide: true
  },{
    label:'名称',
    prop: 'name',
    search: true,
    cell: true,
    rules: [
      {
        required: true,
        message: '请输入重点部位名称',
        trigger: 'blur'
      }
    ]
  },{
    label:'所在位置',
    prop: 'location',
    cell: true,
    rules: [
      {
        required: true,
        message: '请输入所在位置',
        trigger: 'blur'
      }
    ]
  },{
    label:'区域面积',
    prop: 'regionArea',
    cell: true,
    rules: [
      {
        required: true,
        message: '请输入区域面积',
        trigger: 'blur'
      }
    ]
  },{
    label:'是否涉危化品',
    prop: 'isDangerous',
    type: 'select',
    dicData: DIC.VAILD,
    cell: true,
    rules: [{
      required: true,
      message: '请选择是否涉危化品',
      trigger: 'blur'
    }],
  },{
    label:'设置原因',
    prop: 'settingReason',
    type: 'select',
    dicData: [],
    cell: true,
    rules: [{
      required: true,
      message: '请设置原因',
      trigger: 'blur'
    }],
  }]
}
export const fireOption = {
  labelWidth: 220,
  emptyBtn: false,
  column: [{
    type:'number',
    label: "灭火器数量",
    prop: "extinguisherAmount",
    type: 'number',
    span: 12,
  },{
    type:'number',
    label: "室内消火栓数量",
    prop: "hydrantAmount",
    type: 'number',
    span: 12
  },{
    type:'number',
    label: "安全出口数量",
    prop: "exitAmount",
    type: 'number',
    span: 12
  },{
    label: "疏散指示标记情况",
    prop: "indicatorMark",
    type: "select",
    dicData: [{label: '合格', value: '1'},{label: '不合格', value: '2'},{label: '缺陷', value: '3'}],
    span: 12
  },{
    type:'number',
    label: "疏散楼梯数量",
    prop: "stairsAmount",
    type: 'number',
    span: 12
  },{
    label: "疏散楼梯形式",
    prop: "staircaseForm",
    type: "select",
    dicData: [],
    span: 12,
  },{
    label: "疏散示意图",
    prop: "evacuationDiagram",
    formslot: true,
    span: 12,
  }]
}
export const buildingOption = {
  labelWidth: 220,
  indexLabel: '序号',
  index:true,
  border:true,
  emptyBtn: false,
  addBtn:false,
  editBtn:false,
  cellBtn: false,
  delBtn: false,
  align: 'center',
  menuWidth:300,
  menuAlign: 'center',
  keyId: 'id',
  column: [{
    label:'建筑编号',
    prop: 'buildingCode',
    search: true,
  },{
    label:'使用性质',
    prop: 'usageNature',
    type: 'select',
    dicData: [],
    valueDefault: '0',
  },{
    label:'结构类型',
    type: 'select',
    prop: 'structure',
    dicData: [],
    valueDefault: '0',
  },{
    label:'建筑层数',
    prop: 'floor',
  },{
    label:'占地面积(㎡)',
    prop: 'areaCovered',
  }]
}
export const floorOption = {
  labelWidth: 180,
  indexLabel: '序号',
  index:true,
  border:true,
  emptyBtn: false,
  addBtn:false,
  align: 'center',
  menuAlign: 'center',
  menuWidth:300,
  viewBtn: false,
  editBtn:false,
  delBtn: false,
  keyId: 'id',
  column: [{
    label:'楼层/区域编号',
    prop: 'floorCode',
    width: '150',
    search: true,
    rules: [
      {
        required: true,
        message: '请输入楼层/区域编号',
        trigger: 'blur'
      }
    ]
  },{
    label:'楼层/区域面积',
    prop: 'floorArea',
    width: '120',
    type: 'number',
    rules: [
      {
        required: true,
        message: '请输入楼层/区域面积',
        trigger: 'blur'
      }
    ]
  },{
    label:'楼层/区域使用功能(用途)',
    prop: 'purpose',
    width: '200',
    rules: [
      {
        required: true,
        message: '请输入用途',
        trigger: 'blur'
      }
    ]
  },{
    label:'所属建筑物',
    width: '250',
    type: 'select',
    prop: 'buildingId',
    dicData: [],
    rules: [{
      required: true,
      message: '请选择所属建筑物',
      trigger: 'blur'
    }],
  },{
    label:'楼层/区域平面图',
    prop: 'plan',
    width: '150',
    span: 24,
    slot: true,
    formslot: true,
    rules: [
      {
        required: true,
        message: '请选择楼层/区域平面图',
        trigger: 'blur'
      }
    ]
  }]
}