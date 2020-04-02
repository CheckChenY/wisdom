export const columns = [
    {
        title: '序号',
        dataIndex: 'id',
    },
    {
        title: '前缀',
        dataIndex: 'prefixion',
    },
    {
        title: '后缀',
        dataIndex: 'suffix',
    },
    {
        title: '应用名称',
        dataIndex: 'applyName',
    },
    {
        title: '产品名称',
        dataIndex: 'productName',
    },
    {
        title: '产品型号',
        dataIndex: 'productType',
    },
    {
        title: '设备类型',
        dataIndex: 'deviceType',
    },
    {
        title: '厂商名称',
        dataIndex: 'companyName',
    },
    {
        title: '协议类型',
        dataIndex: 'licence',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: 300,
        scopedSlots: { customRender: 'operation' },
    },
]

export const columnsForm = [{
    title: '',
    children:[
        {
            title: '序号',
            dataIndex: 'id',
            display: true,
            disabled:false,
        },
        {
            title: '设备型号',
            dataIndex: 'deviceModel',
            type: 'select',
            disData: [],
            disabled:false,
        },
        {
            title: '前缀',
            dataIndex: 'prefixion',
            rules:[
                {
                    required: true,
                    message: '请输入前缀!',
                },
            ],
            disabled:true,
        },
        {
            title: '后缀',
            dataIndex: 'suffix',
            rules:[
                {
                    required: true,
                    message: '请输入后缀!',
                },
            ],
            disabled:true,
        }
    ]
},{
    title: '应用信息',
    children:[
        {
            title: '设备对接地址', 
            dataIndex: 'deviceAddress',
            rules:[
                {
                    required: true,
                    message: '请输入设备对接地址!',
                },
            ],
            disabled:false,
        },
        {
            title: '端口号',
            dataIndex: 'portNumber',
            rules:[
                {
                    required: true,
                    message: '请输入端口号!',
                },
            ],
            disabled:false,
        },
        {
            title: '应用ID',
            dataIndex: 'applyId',
            rules:[
                {
                required: true,
                message: '请输入应用ID!',
                },
            ],
            disabled:false,
        },
        {
            title: '应用秘钥',
            dataIndex: 'applyPassword',
            rules:[
                {
                    required: true,
                    message: '请输入应用秘钥!',
                },
            ],
            disabled:false,
        },
        {
            title: '应用名称',
            dataIndex: 'applyName',
            rules:[
                {
                required: true,
                message: '请输入应用名称!',
                },
            ],
            disabled:false,
        },
        {
            title: '安全策略',
            dataIndex: 'isSafety',
            type: 'select',
            disData: [{
                value: '1',
                label: '是'
            },{
                value: '2',
                label: '否'
            }],
            rules:[
                {
                    required: true,
                    message: '请选择安全策略!',
                },
            ],
            disabled:false,
        },
    ]
},{
    title: '产品模型信息',
    children:[
        {
            title: '产品模型名称',
            dataIndex: 'productModel',
            rules:[
                {
                required: true,
                message: '请输入产品模型名称!',
                },
            ],
            disabled:false,
        },
        {
            title: '产品名称',
            dataIndex: 'productName',
            rules:[
                {
                required: true,
                message: '请输入产品名称!',
                },
            ],
            disabled:false,
        },
        {
            title: '产品ID',
            dataIndex: 'productId',
            rules:[
                {
                    required: true,
                    message: '请输入产品ID!',
                },
            ],
            disabled:false,
        },
        {
            title: '产品型号',
            dataIndex: 'productType',
            rules:[
                {
                    required: true,
                    message: '请输入产品型号!',
                },
            ],
            disabled:false,
        },
        {
            title: '设备类型',
            dataIndex: 'deviceType',
            rules:[
                {
                required: true,
                message: '请输入设备类型!',
                },
            ],
            disabled:false,
        },
        {
            title: '厂商名称',
            dataIndex: 'companyName',
            rules:[
                {
                    required: true,
                    message: '请输入厂商名称!',
                },
            ],
            disabled:false,
        },
        {
            title: '厂商ID',
            dataIndex: 'companyId',
            rules:[
                {
                    required: true,
                    message: '请输入厂商ID!',
                },
            ],
            disabled:false,
        },
        {
            title: '协议类型',
            dataIndex: 'licence',
            rules:[
                {
                    required: true,
                    message: '请输入协议类型!',
                },
            ],
            disabled:false,
        },
    ]
}]
