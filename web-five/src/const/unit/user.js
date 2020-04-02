// import { getDetails } from '@/api/admin/user'

// var validateUsername = (rule, value, callback) => {
//   getDetails(value).then(response => {
//     if (window.boxType === 'edit') callback()
//     let result = response.data.data
//     if (result !== null) {
//       callback(new Error('用户名已经存在'))
//     } else {
//       callback()
//     }
//   })
// }
export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  column: [{
    fixed: true,
    label: '真实姓名',
    prop: 'realName',
    span: 24,
    rules: [{
      required: true,
      message: '请输入真实姓名'
    },
    {
      min: 2,
      max: 20,
      message: '长度在 2 到 20 个字符',
      trigger: 'blur'
    },
    // { validator: validateUsername, trigger: 'blur' }
    ]
  }, {
    fixed: true,
    label: '手机号',
    prop: 'userName',
    editDisabled: true,
    type: 'phone',
    slot: true,
    search: true,
    span: 24,
    rules: [{
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },{
      min: 11,
      max: 11,
      message: '长度在 11 个字符',
      trigger: 'blur'
    }]
  }, {
    label: '密码',
    prop: 'password',
    type: 'password',
    hide: true,
    editVisdiplay: false,
    span: 24,
  }, {
    label: '职务',
    prop: 'post',
    value: '',
    span: 24,
    rules: [{
      required: true,
      message: '请填写职务',
      trigger: 'blur'
    },{
      max: 20,
      message: '长度在 20 个字符',
      trigger: 'blur'
    }]
  }, {
    label: '性别',
    prop: 'gender',
    type: 'radio',
    value: '',
    width: 80,
    span: 12,
    rules: [{
      required: true,
      message: '请选择性别',
      trigger: 'blur'
    }],
    dicData: [{
      label: '男',
      value: '0'
    }, {
      label: '女',
      value: '1'
    }],
    valueDefault: '0',
  }, {
    label: '所属部门',
    prop: 'deptId',
    type: 'tree',
    slot: true,
    span: 24,
    rules: [{
      required: true,
      message: '请选择部门',
      trigger:'change'
    }],
    props: {
      label: "name",
      value: 'id',
    },
    dicData: [],
  }, {
    label: '角色',
    prop: 'roleId',
    type:'select',
    minWidth:130,
    slot: true,
    span: 24,
    rules: [{
      required: true,
      message: '请选择角色',
      trigger:'blur'
    }],
    dicData: [],
  }, {
    label: '状态',
    prop: 'delFlag',
    type: 'select',
    slot: true,
    span: 24,
    rules: [{
      required: true,
      message: '请选择状态',
      trigger: 'blur'
    }],
    dicData: [{
      label: '有效',
      value: '0'
    }, {
      label: '锁定',
      value: '9'
    }],
    valueDefault: '0',
  }]
}
