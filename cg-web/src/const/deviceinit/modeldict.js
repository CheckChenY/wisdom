export const columns = [
    {
        title: '序号',
        dataIndex: 'id',
    },
    {
        title: '所属系统',
        dataIndex: 'system',
    },
    {
        title: '设备类型',
        dataIndex: 'type',
    },
    {
        title: '设备型号',
        dataIndex: 'model',
    },
    {
        title: '应用服务类型',
        dataIndex: 'serviceName',
    },
    {
        title: '协议号',
        dataIndex: 'licence',
    },
    {
        title: '对应前缀',
        dataIndex: 'prefix',
    },
    {
        title: '对应后缀',
        dataIndex: 'suffix',
    },
    {
        title: '是否是主设备',
        dataIndex: 'isMain',
        scopedSlots: { customRender: 'isMain' },
    },
    {
        title: '是否是联动设备',
        dataIndex: 'isLink',
        scopedSlots: { customRender: 'isLink' },
    },
    {
        title: '是否需要激活',
        dataIndex: 'isActivate',
        scopedSlots: { customRender: 'isActivate' },
    },
    {
        title: '是否注册IOT',
        dataIndex: 'isIot',
        scopedSlots: { customRender: 'isIot' },
    },
    {
        title: '型号图',
        dataIndex: 'modelImg',
        scopedSlots: { customRender: 'modelImg' },
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: 180,
        scopedSlots: { customRender: 'operation' },
    },
]
export const columnForm = [
    {
        title: '序号',
        dataIndex: 'id',
        display: true,
        disabled:false,
    },
    {
        title: '所属系统',
        dataIndex: 'deviceSystem',
        type: 'select',
        disData: [],
        rules:[
            {
            required: true,
            message: '请选择所属系统!',
            },
        ],
        disabled:false,
    },
    {
        title: '设备类型',
        dataIndex: 'deviceType',
        type: 'select',
        disData: [],
        rules:[
            {
            required: true,
            message: '请选择设备类型!',
            },
        ],
        disabled:false,
    },
    {
        title: '设备型号',
        dataIndex: 'deviceModel',
        type: 'select',
        disData: [],
        rules:[
            {
                required: true,
                message: '请输入设备型号!',
            },
        ],
        disabled:false,
    },
    {
        title: '应用服务类型',
        dataIndex: 'appSystemType',
        type: 'select',
        disData: [],
        rules:[
            {
                required: true,
                message: '请选择应用服务类型!',
            },
        ],
        disabled:false,
    },
    {
        title: '协议号',
        dataIndex: 'licence',
        rules:[
            {
                required: true,
                message: '请输入协议号!',
            },
        ],
        maxLength: 45,
        disabled:false,
    },
    {
        title: '对应前缀',
        dataIndex: 'prefix',
        maxLength: 200,
        disabled:false,
    },
    {
        title: '对应后缀',
        dataIndex: 'suffix',
        maxLength: 200,
        disabled:false,
    },
    {
        title: '是否是主设备',
        dataIndex: 'isMain',
        type: 'radio',
        disData: [{
            label: '是',
            value: 1
        },{
            label: '否',
            value: 2
        }],
        rules:[
            {
                required: true,
                message: '请选择是否是主设备!',
            },
        ],
        disabled:false,
    },
    {
        title: '是否是联动设备',
        dataIndex: 'isLink',
        type: 'radio',
        disData: [{
            label: '是',
            value: 1
        },{
            label: '否',
            value: 2
        }],
        rules:[
            {
            required: true,
            message: '请选择是否是联动设备!',
            },
        ],
        disabled:false,
    },
    {
        title: '是否需要激活',
        dataIndex: 'isActivate',
        type: 'radio',
        disData: [{
            label: '是',
            value: 1
        },{
            label: '否',
            value: 2
        }],
        rules:[
            {
                required: true,
                message: '请选择是否需要激活!',
            },
        ],
        disabled:false,
    },
    {
        title: '是否注册IOT',
        dataIndex: 'isIot',
        type: 'radio',
        disData: [{
            label: '是',
            value: 1
        },{
            label: '否',
            value: 2
        }],
        rules:[
            {
            required: true,
            message: '请选择是否注册IOT!',
            },
        ],
        disabled:false,
    },
    {
        title: '型号图',
        dataIndex: 'modelImg',
        type: 'upload',
        rules:[
            {
                required: true,
                message: '请上传型号图!',
            },
        ],
        disabled:false,
    }    
]
