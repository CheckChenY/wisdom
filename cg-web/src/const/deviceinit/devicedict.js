export const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        display: true,
        disabled:false,
    },
    {
        title: '数据类型',
        dataIndex: 'type',
        type: 'select',
        disData: [{
            value: 1,
            label: '设备系统'
        },{
            value: 2,
            label: '设备类型'
        },{
            value: 3,
            label: '设备型号'
        }],
        rules:[
            {
                required: true,
                message: '请选择数据类型!',
            },
        ],
        disabled:false,
        scopedSlots: { customRender: 'type' },
    },
    {
        title: '数据名称',
        dataIndex: 'dataDicDesc',
        rules:[
            {
                required: true,
                message: '请输入数据名称!',
            },
        ],
        maxLength: 45,
        disabled:false,
    },
    {
        title: '数据编号',
        dataIndex: 'dataDicCode',
        rules:[
            {
                required: true,
                message: '请输入数据编号!',
            },
        ],
        maxLength: 45,
        disabled:false,
    },
    {
        title: '父级',
        dataIndex: 'parentId',
        type: 'select',
        disData: [{
            label: '无',
            value: 0
        }],
        rules:[
            {
                required: true,
                message: '请选择所属系统!',
            },
        ],
        disabled:false,
        scopedSlots: { customRender: 'parentId' },
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: 180,
        scopedSlots: { customRender: 'operation' },
        disabled:false,
    },
]
