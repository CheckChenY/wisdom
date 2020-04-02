export const tableOption = {
labelWidth: 120,
border:true,
emptyBtn: false,
addBtn:false,
editBtn:false,
cellBtn: false,
delBtn: false,
columnBtn: true,
refreshBtn: false,
menuWidth:300,
align: "center",
column: [{
    label:'巡查开始时间',
    prop: 'startTime',
    type:'datetime',
    span: 12,
    format: 'yyyy-MM-dd HH:mm:ss',
    valueFormat: "yyyy-MM-ddTHH:mm:ss",
    search: true,
    rules: [
        {
            required: true,
            trigger: 'blur',
            validator:(rule, value, callback) => {
                if(!value){
                    callback(new Error('请选择巡查开始时间'));
                    return 
                }
                if (Date.parse(new Date(value)) <= Date.now()) {
                  callback(new Error('开始时间不能早于当下时间'));
                } else {
                  callback();
                }
            }
        }
    ]
},{
    label:'巡查结束时间',
    prop: 'endTime',
    type:'datetime',
    span: 12,
    format: 'yyyy-MM-dd HH:mm:ss',
    valueFormat: "yyyy-MM-ddTHH:mm:ss",
    search: true,
    rules: [
        {
            required: true,
            trigger: 'blur',
            validator:(rule, value, callback) => {
                if(!value){
                    callback(new Error('请选择巡查结束时间'));
                    return 
                }
                if (Date.parse(new Date(value)) <= Date.now()) {
                  callback(new Error('结束时间不能早于当下时间'));
                } else {
                  callback();
                }
            }
        }
    ]
},{
    label:'任务名称',
    prop: 'patrolTaskId',
    type:'select',
    dicData:[],
    span: 12,
    search: true,
    rules: [
        {
            required: true,
            message: '请选择任务名称',
            trigger: 'blur'
        }
    ]
},{
    label:'巡查点总数',
    prop: 'pointCount',
    span: 12,
    addDisplay: false,
    editDisplay: false,
},{
    label:'巡查人',
    prop: 'userId',
    type: 'select',
    span: 12,
    dicData:[],
    addDisplay: false,
    editDisplay: false,
},{
    label:'已巡查点数',
    prop: 'finish',
    span: 12,
    addDisplay: false,
    editDisplay: false,
},{
    label:'待巡查点数',
    prop: 'waitPoint',
    span: 12,
    addDisplay: false,
    editDisplay: false,
},{
    label:'巡查情况',
    prop: 'executiveCondition',
    type: 'select',
    span: 12,
    addDisplay: false,
    editDisplay: false,
    dicData:[{
        label:'巡查中',
        value:'1'
    },{
        label:'待巡查',
        value:'2'
    }],
    search: true,
},{
    label: '巡查点巡查情况',
    span: 24,
    prop: 'pointList',
    addDisplay: false,
    editDisplay: false,
    hide: true,
    formslot: true,
}]
}

export const addOption = {
    submitBtn:false,
    emptyBtn:false,
    labelWidth:120,
    column: [{
            label: '任务名称',
            disabled:false,
            prop: 'patrolTaskId',
            span:20,
            type:'select',
            dicData:[],
        },{
            label: '巡查开始时间',
            span:20,
            prop: 'startTime',
            type:'date',
            rules: [{
                required: true,
                message: '请选择巡查开始时间',
                trigger: 'change'
            }]
        },{
            label: '巡查结束时间',
            span:20,
            prop: 'endTime',
            type:'date',
            rules: [{
                required: true,
                message: '请选择巡查结束时间',
                trigger: 'change'
            }]
        }
    ]
}

export const patrolCaseOption = {
    submitBtn:false,
    emptyBtn:false,
    labelWidth:120,
    column: [{
            label: '巡查开始时间',
            prop: 'startTime',
            disabled:true
        },{
            label: '巡查结束时间',
            prop: 'endTime',
            disabled:true
        },{
            label: '巡查任务',
            prop: 'patrolTaskId',
            disabled:true
        },{
            label: '巡查人',
            prop: 'userId',
            disabled:true
        },{
            label: '巡查情况',
            prop: 'executiveCondition',
            disabled:true
        },{
            label: '巡查点总数',
            prop: 'pointCount',
            disabled:true
        },{
            label: '已巡查点数',
            prop: 'finish',
            disabled:true
        },{
            label: '待巡查点数',
            prop: 'waitPoint',
            disabled:true
        },
    ]
}

export const pointListOption = {
    addBtn:false,
    border:true,
    align:'center',
    menuAlign:'center',
    editBtn:false,
    delBtn:false,
    menuWidth:120,
    refreshBtn:false,
    column:[{
            label:'巡查点名称',
            minWidth:150,
            prop:'patrolPointName'
        },{
            label:'巡查点类型',
            prop:'patrolPointType',
            search:true,
            type:'select',
            dicData:[]
        },{
            label:'巡查卡编码',
            prop:'cardCode'
        },{
            label:'所属建筑',
            prop:'buildingId',
            type:'select',
            dicData:[]
        },{
            label:'所属楼层',
            prop:'floorId',
            type:'select',
            dicData:[]
        },{
            label:'巡查状态',
            prop:'patrolStatus',
            search:true,
            type:'select',
            dicData:[{
                label:'已巡查',
                value:'1'
            },{
                label:'待巡查',
                value:'2'
            },]
        },{
            label:'巡查结果',
            prop:'patrolResult',
            type:'select',
            dicData:[{
                label:'合格',
                value:'1'
            },{
                label:'不合格',
                value:'2'
            }]
        }
    ]
}

export const pointDetailOption = {
    submitBtn:false,
    emptyBtn:false,
    labelWidth:120,
    column: [{
            label: '巡查开始时间',
            prop: 'patrolTaskId',
            disabled:true
        },{
            label: '巡查结束时间',
            prop: 'patrolTaskId',
            disabled:true
        }
    ]
}