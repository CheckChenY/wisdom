export const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        display: true,
        disabled:false,
    },
    {
        title: '操作指令',
        dataIndex: 'orderDicDesc',
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
        dataIndex: 'orderDicCode',
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
        dataIndex: 'orderDicCodeTen',
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
        title: '操作',
        dataIndex: 'operation',
        width: 180,
        scopedSlots: { customRender: 'operation' },
        disabled:false,
    },
]
