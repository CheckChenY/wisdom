export const tableOption = {
    'labelWidth': 100,
    'border': true,
    'index': true,
    'indexLabel': '序号',
    'stripe': true,
    'menuAlign': "left",
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
        rules: {
            required: true,
            trigger: 'blur',
            message: '请填写设备标识码'
        }
    },{
        label: '设备名称',
        prop: 'deviceName',
        // width: 200,
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
        type: 'select',
        // search: false,
        dicData: [],
        rules: {
            required: true,
            trigger: 'blur',
            message: '请选择设备类型'
        },
        click: '',
        valueDefault: '1213'
    },{
        label: '所在建筑',
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
        label: '楼层/区域',
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
        type: 'date',
        more:true,
    },{
        label: '当前状态',
        prop: 'warnState',
        span: 12,
        type: 'select',
        search: true,
        dicData: [],
        valueDefault: '0'
    },{
        label: '状态描述',
        prop: 'statusDes',
        hide: true,
        span: 12,
        type: 'radio',
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
        prop: 'createTime',
        span: 12,
        type: 'date',
        format: 'yyyy-MM-dd HH:mm:ss',
        more:true,
    },{
        label: '设备状态',
        prop: 'warnState',
        span: 12,
        type: 'select',
        dicData: [],
        valueDefault: '0'
    },{
        label: '状态描述',
        prop: 'stateDesc',//后期拼接 或者修改
        span: 12,
    }]
} 