export const columns = [
    {
        title: '操作时间',
        dataIndex: 'createTime',
        // fixed:'left',
        // width:150
    },
    {
        title: '远程操作',
        dataIndex: 'operationCode',
        // fixed:'left',
        // width:150
    },
    {
        title: '操作说明',
        key: 'operationDesc',
        dataIndex: 'operationDesc',
        scopedSlots: { customRender: 'operationDesc' },
    },
    {
        title: '执行状态',
        key: 'operationResult',
        dataIndex: 'operationResult',
        scopedSlots: { customRender: 'operationResult' },
    },
]


export const columnsOther = [
    {
        title: '执行时间',
        dataIndex: 'createTime',
        // fixed:'left',
        // width:150
    },
    {
        title: '执行说明',
        key: 'operationDesc',
        dataIndex: 'operationDesc',
        scopedSlots: { customRender: 'operationDesc' },
    },
    {
        title: '执行状态',
        key: 'operationResult',
        dataIndex: 'operationResult',
        scopedSlots: { customRender: 'operationResult' },
    },
]