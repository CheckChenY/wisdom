import { info } from '@/api/fireControlSafe/patrolManage/patrolPoint'
export const tableOption = {
  labelWidth: 220,
  indexLabel: '序号',
  menuWidth: 300,
  index:true,
  selection: true,
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
    prop: 'patrolTaskId',
    hide: true,
    display: false,
  },{
    label:'巡查点名称',
    prop: 'patrolPointName',
    rules: [
      {
        required: true,
        message: '请输入巡查点名称',
        trigger: 'blur'
      }
    ]
  },{
    label:'巡查点类型',
    prop: 'patrolPointType',
    type: 'select',
    dicData: [],
    search: true,
    rules: [
      {
        required: true,
        message: '请选择巡查点类型',
        trigger: 'blur'
      }
    ]
  },{
    label:'巡查卡编码',
    prop: 'cardCode',
    editDisabled: true,
    search: true,
    rules: [
      {
        required: true,
        trigger: 'blur',
        validator:(rule, value, callback) => {
          info(value).then(res=>{
            if (res && res.data && res.data.code === '0') {
              callback()
            }else{
              callback(new Error('该巡查卡不存在'))
            }
          })
        }
      }
    ]
  },{
    label:'所在建筑',
    prop: 'buildingId',
    type: 'select',
    dicData: [],
    rules: [{
      required: true,
      message: '请选择建筑',
      trigger: 'blur'
    }],
    change: ''
  },{
    label:'所在楼层区域',
    prop: 'floorId',
    type: 'select',
    dicData: [],
    rules: [{
      required: true,
      message: '请选择楼层',
      trigger: 'blur'
    }],
  },{
    label:'所在位置',
    prop: 'location',
    rules: [{
      required: true,
      message: '请填写所在位置',
      trigger: 'blur'
    }],
  },{
    label:'绑定状态',
    prop: 'bindingState',
    hide: true,
    display: false,
  }]
}
 