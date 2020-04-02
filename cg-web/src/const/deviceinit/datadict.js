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
        change: "",
        maxLength: 45,
        disabled:false,
    },
    {
        title: '数据值(16进制)',
        dataIndex: 'dataDicCode',
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
        dataIndex: 'dataDicCodeTen',
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
        title: '倍数',
        dataIndex: 'dataMultiple',
        type: 'select',
        disData: [
            {value: '0', label: 0},
            {value: '10', label: 10},
            {value: '100', label: 100},
        ],
        disabled:false,
    },
    {
        title: '倍数保留小数',
        dataIndex: 'reserved',
        type: 'select',
        disData: [
            {value: '0', label: 0},
            {value: '1', label: 1},
            {value: '2', label: 2},
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
