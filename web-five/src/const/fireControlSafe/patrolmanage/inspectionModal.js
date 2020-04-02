const status = [{
    label: '待巡查',
    value: '2'
},{
    label: '已巡查',
    value: '1'
}]
const result = [{
    label: '不合格',
    value: '2'
},{
    label: '合格',
    value: '1'
}]

export const TableOptionModal = {
    // labelWidth: 100,
    border: false,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: "center",
    align: "center",
    columnBtn: false,
    refreshBtn: false,
    editBtn: false,
    delBtn: false,
    addBtn: false,
    dic: [],
    searchBtn: true,
    viewBtn:true,
    menuWidth:100,
    column: [{
        label: '巡查点名称',
        prop: 'patrolPointName',
        dicData: [],
        width:120,
        rules: [
          {
            required: true,
            message: '请输入巡查点名称',
            trigger: 'blur'
          }
        ]
    }, {
        label: '巡查点类型',
        prop: 'patrolPointType',
        dicData: [],
        search:true,
        type:'select'
    }, {
        label: '巡查卡编码',
        prop: 'cardCode',
        span: 12,
    }, {
        label: '所在建筑',
        prop: 'buildingId',
    }, {
        label: '所属楼层',
        prop: 'floorId',
    }, {
        label: '巡查状态',
        prop: 'patrolStatus',
        dicData: status,
        search:true,
        type:'select'
    }, {
        label: '巡查结果',
        prop: 'patrolResult',
        dicData: result,
    }, {
        label: '巡查图片',
        prop: 'patrolPhoto',
        hide:true,
        formslot: true,
    }]
}
