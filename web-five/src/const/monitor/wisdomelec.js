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
        label: '设备ID',
        prop: 'deviceId',
        span: 12,
        width: 180,
        rules: {
            required: true,
            trigger: 'blur',
            message: '请填写设备标识码'
        }
    }, {
        label: '设备名称',
        prop: 'deviceName',
        span: 12,
        rules: {
            required: true,
            trigger: 'blur',
            message: '请填写设备名称'
        }
    }, {
        label: '设备类型',
        prop: 'deviceType',
        span: 12,
        type: 'select',
        // search: true,
        dicData: [],
        rules: {
            required: true,
            trigger: 'blur',
            message: '请选择设备类型'
        },
        valueDefault: ''
    }, {
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
    }, {
        label: '楼层/区域',
        prop: 'floorId',
        span: 12,
        type: 'select',
        search: true,
        width: 130,
        dicData: [],
        valueDefault: '',
    }, {
        label: '具体位置',
        prop: 'location',
        span: 12,
        type: 'text',
        format: 'yyyy-MM-dd',
        more: true,
    }, {
        label: '当前状态',
        prop: 'warnState',
        width: 140,
        span: 12,
        type: 'select',
        more: true,
        search: true,
        dicData: [],
        valueDefault: '0'
    }, {
        label: '状态描述',
        prop: 'statusDes',
        hide: true,
        span: 12,
        type: 'text',
        // dicData: STATUS,
        // valueDefault: '0'
    }]
}
export const dialogTable = {
    // 'labelWidth': 100,
    'border': true,
    'index': false,
    // 'indexLabel': '序号',
    "menu": false,
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
    "column": [{
            label: '时间',
            prop: 'createTime',
            span: 12,
            type: 'date',
            format: 'yyyy-MM-dd HH:mm:ss',
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            width: 180,
            dicData: [],
            children: []
        },
        {
            label: '设备状态',
            prop: 'warnState',
            span: 12,
            dicData: DEVICESTATUS,
            type: 'text',
            search: false,
            more: true,

        },
        {
            label: '状态描述',
            prop: 'statusDes',
            span: 12,
            // hide: true,
            // width: 180,
            type: 'text',
            search: false,
            more: true,

        },
    ]
  } 