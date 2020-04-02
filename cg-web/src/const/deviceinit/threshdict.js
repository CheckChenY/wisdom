export const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        display: true,
        disabled:false,
    },
    {
        title: '阈值类型',
        dataIndex: 'thresholdDicDesc',
        rules:[
            {
                required: true,
                message: '请输入数据类型!',
            },
        ],
        maxLength: 45,
        disabled:false,
    },
    {
        title: '数据值(16进制)',
        dataIndex: 'thresholdDicCode',
        // rules:[
        //     {
        //         required: true,
        //         message: '请输入数据值(16进制)!',
        //     },
        // ],
        maxLength: 45,
        disabled:false,
    },
    {
        title: '数据值(10进制)',
        dataIndex: 'thresholdDicCodeTen',
        type: 'number',
        maxLength: 45,
        display:false,
    },
    {
        title: '协议号',
        dataIndex: 'licence',
        type: 'select',
        disData: [],
        rules:[
            {
            required: true,
            message: '请选择协议号!',
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
        maxLength: 45,
        disabled:false,
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: 180,
        scopedSlots: { customRender: 'operation' },
        disabled:false,
    },
]
