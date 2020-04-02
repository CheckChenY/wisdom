
export const dataSource = [];
export const dataModal = [];
export const columns = [
    {
        title: '序号',
        align:'center',
        dataIndex: 'id',
        key:'id',
        status:false
    },
    {
        title: '单位名称',
        align:'center',
        dataIndex: 'orgName',
        key:'orgName',
        status:true,
    },
    {
        title: '统一社会信用代码',
        dataIndex: 'orgCode',
        key:'orgCode',
        status:true,
    },
    {
        title: '单位类型',
        dataIndex: 'orgType',
        key:'orgType',
        status:true,
        // width: 100
    },
    {
        title: '联系人',
        dataIndex: 'userName',
        key:'userName',
        status:true,
        // width: 100
    },
    {
        title: '联系电话',
        dataIndex: 'phone',
        key:'phone',
        status:true,
        // width: 100
    },
    // {
    //     title: '单位初始化角色',
    //     dataIndex: 'role',
    //     key:'6',
    //     status:true,
    //     // width: 100
    // },
    {
        title: '操作',
        // dataIndex: 'operation',
        key:'operation',
        width: 260,
        scopedSlots: { customRender: 'operation' },
        status:false
    },
];
export const columnsModal = [
    {
        title: '序号',
        dataIndex: 'packageId',
    },
    {
        title: '功能包名称',
        dataIndex: 'packageName',
    },
    {
        title: '功能包价格',
        dataIndex: 'packagePrice',
    },
    {
        title: '到期时间',
        dataIndex: 'expireDate',
        width:100,
        scopedSlots: { customRender: 'expireDate' },
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width:100,
        scopedSlots: { customRender: 'operation' },
    },
];
