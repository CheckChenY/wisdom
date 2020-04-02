export const columns = [
    {
        title: '设备识别码',
        dataIndex: 'deviceCode',
        width:150,
    },
    {
        title: '设备名称',
        dataIndex: 'deviceName',
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
        title: '所属建筑',
        dataIndex: 'buildingCode',
    },
    {
        title: '楼层/区域',
        dataIndex: 'floorCode',
    },
    {
        title: '安装位置',
        dataIndex: 'location',
        scopedSlots: { customRender: 'location' },
    },
    {
        title: '是否过期',
        dataIndex: 'activate',
        scopedSlots: { customRender: 'activate' },
    },
    {
        title: '现场设备图',
        dataIndex: 'surroundingPhoto',
        scopedSlots: { customRender: 'surroundingPhoto' },
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: 200,
        scopedSlots: { customRender: 'operation' },
        fixed:'right'
    },
]
export const columnsForm = [
    {
        title: '设备识别码',
        dataIndex: 'deviceCode',
        width:150,
        rules:[
            {
                required: true,
                message: '请输入设备识别码!',
            }
        ],
        disabled:false,
        editDisable: true,
    },
    {
        title: '设备名称',
        dataIndex: 'deviceName',
        fixed:'left',
        maxLength: '255',
        width:150,
    },
    {
        title: '所属系统',
        dataIndex: 'system',
        type: 'select',
        disData: [],
        addDisabled:true,
        editDisable: true,
    },
    {
        title: '设备类型',
        dataIndex: 'type',
        type: 'select',
        disData: [],
        addDisabled:true,
        editDisable: true,
    },
    {
        title: '设备型号',
        dataIndex: 'model',
        type: 'select',
        disData: [],
        addDisabled:true,
        editDisable: true,
    },
    {
        title: '所属建筑',
        dataIndex: 'buildingId',
        rules:[
            {
            required: true,
            message: '请选择所属建筑!',
            },
        ],
        type: 'select',
        disData: [],
        disabled:false,
    },
    {
        title: '楼层/区域',
        dataIndex: 'floorId',
        rules:[
            {
            required: true,
            message: '请选择楼层/区域!',
            },
        ],
        type: 'select',
        disData: [],
        disabled:false,
    },
    {
        title: '安装位置',
        dataIndex: 'location',
        disabled:false,
    },
    {
        title: '点位标注',
        dataIndex: 'pointSign',
        disabled:false,
        type:'div',
        click:null
    },
    {
        title: '设备回路号',
        dataIndex: 'loopNumber',
        disabled:false,
    },
    {
        title: '设备点位号',
        dataIndex: 'pointNumber',
        disabled:false,
    },
    {
        title: '版本',
        dataIndex: 'version',
        addDisabled:true,
        editDisable: true,
    },
    {
        title: '现场设备图',
        dataIndex: 'surroundingPhoto',
        type: 'upload',
        disabled:false,
        scopedSlots: { customRender: 'surroundingPhoto' },
    },
]
