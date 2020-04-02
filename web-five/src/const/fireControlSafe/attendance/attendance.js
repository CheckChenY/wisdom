const status = [{
    label: '上班打卡',
    value: '0'
},{
    label: '下班打卡',
    value: '1'
}]
export const  attendanceOption = {
    emptyBtn:false,
    submitBtn:false,
    labelWidth: 240,
    column: [{
        label: "考勤开始时间",
        prop: "startTime",
        type: "time",
        format:'HH:mm',
        valueFormat:'HH:mm',
        tip: '每天几点开始新一天的考勤',
        span:12,
        valueDefault:'08:00',
        rules: [{
            required: true,
            message: "请选择考勤开始时间",
            trigger: "blur"
        }],
    },{
        label: "一天打卡次数",
        prop: "clockCount",
        tip: '1次上下班需要打卡2次',
        span: 12,
        type:'select',
        dicData:[{
            label:'2次',
            value:2
        },{
            label:'4次',
            value:4
        },{
            label:'6次',
            value:6
        }],
        rules: [{
            required: true,
            message: "请选择一天打卡次数",
            trigger: "blur"
        }],
    },{
        label: "上班打卡后间隔",
        prop: "intervalTime",
        type:'select',
        dicData:[{
            label:'不限',
            value:0
        },{
            label:'半小时',
            value:30
        },{
            label:'一小时',
            value:60
        },{
            label:'一个半小时',
            value:90
        },{
            label:'二个小时',
            value:120
        },{
            label:'二个半小时',
            value:150
        },{
            label:'三个小时',
            value:180
        },{
            label:'三个半小时',
            value:210
        },{
            label:'四个小时',
            value:240
        },],
        tip: '防止误操作，勿打下班卡',
        span: 12,
        rules: [{
            required: true,
            message: "请输入上班打卡后间隔",
            trigger: "blur"
        }],
    }]
    
}

export const TableOption = {
    labelWidth: 100,
    border: true,
    index: true,
    indexLabel: '序号',
    menu:false,
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
    column: [{
        label: '姓名',
        prop: 'userId',
        type:'select',
        dicData: [],
        rules: {
            required: true,
            trigger: 'blur',
            message: '请选择设备类型'
        },
        valueDefault: '',
        search:true
    }, {
        label: '部门',
        prop: 'deptId',
        dicData: [],
    }, {
        label: '打卡时间',
        type: 'date',
        prop: 'createTime',
        format: 'yyyy-MM-dd HH:mm:ss'
    }, {
        label: '打卡次数',
        prop: 'clockCount',
        slot: true,
    }, {
        label: '打卡结果',
        prop: 'clockState',
        dicData: status,
    }, {
        label: '打卡地址',
        prop: 'clockAddress',
    }, {
        label: '打卡图片',
        slot:true,
        prop: 'clockPhoto',
    }, {
        label: '打卡备注',
        prop: 'clockRemak',
    }, {
        label: '开始日期',
        prop: 'startTime',
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm:ss',
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        search:true,
        hide:true
    }, {
        label: '结束日期',
        prop: 'endTime',
        type: "datetime",
        format: 'yyyy-MM-dd HH:mm:ss',
        valueFormat: "yyyy-MM-dd HH:mm:ss",
        search:true,
        hide:true

    }]
}
