export const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        display: true,
        disabled:false,
    },
    {
        title: '数据类型',
        dataIndex: 'dataDicDesc',
        rules:[
            {
                required: true,
                message: '请输入数据类型!',
            },
        ],
        disabled:false,
    },
    {
        title: '数据值(16进制)',
        dataIndex: 'dataDicCode',
        rules:[
            {
                required: true,
                message: '请输入数据值(16进制)!',
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
            message: '请选择设备型号!',
            },
        ],
        disabled:false,
    },
    {
        title: '单位',
        dataIndex: 'unit',
        rules:[
            {
            required: true,
            message: '请输入单位!',
            },
        ],
        disabled:false,
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: 250,
        scopedSlots: { customRender: 'operation' },
        disabled:false,
    },
]
