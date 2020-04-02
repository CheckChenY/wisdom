export const columns = [
    {
        title: '序号',
        dataIndex: 'id',
    },
    {
        title: '协议号',
        dataIndex: 'licence',
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
        title: '阈值数量',
        dataIndex: 'size',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: 150,
        scopedSlots: { customRender: 'operation' },
    },
]
