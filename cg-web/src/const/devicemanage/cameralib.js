export const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        display: true,
        disabled:false,
    },
    {
        title: '设备名称',
        dataIndex: 'dataDicDesc',
        rules:[
            {
                required: true,
                message: '请输入数据类型!',
            },
        ],
        maxLength: '255',
        disabled:false,
    },
    {
        title: '所属系统',
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
        title: '设备类型',
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
        title: '设备型号',
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
        title: '所属建筑',
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
        title: '楼层区域',
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
        title: '安装位置',
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
