const status = [{
    label: '已完成',
    value: '1'
},{
    label: '未完成',
    value: '2'
}]

export const TableOption = {
    labelWidth: 100,
    indexLabel: '序号',
    index: true,
    border: true,
    emptyBtn: false,
    addBtn: false,
    editBtn: false,
    cellBtn: false,
    delBtn: false,
    columnBtn: false,
    refreshBtn: false,
    align: "center",
    // menu:false,
    // viewBtn:true,
    submitBtn:false,
    keyId: 'id',
    searchBtn:true,
    column: [{
        label: '巡查开始时间',
        minWidth:100,
        prop: 'startTime',
        type:'datetime',
        dicData: [],
        search:true,
        labelWidth:150,
        disabled:true,
    }, {
        label: '巡查结束时间',
        minWidth:100,
        prop: 'endTime',
        type:'datetime',
        dicData: [],
        labelWidth:150,
        search:true,
        disabled:true,
        // rules: [
        //   {
        //     required: true,
        //     message: '请输入巡查结束时间',
        //     trigger: 'blur'
        //   }
        // ]
    }, {
        label: '任务名称',
        prop: 'patrolName',
        span: 12,
        search:true,
        labelWidth:150,
        disabled:true,
        // rules: [
        //   {
        //     required: true,
        //     message: '请输入任务名称',
        //     trigger: 'blur'
        //   }
        // ]
    }, {
        label: '巡查总点数',
        prop: 'pointCount',
        labelWidth:150,
        search:false,
        disabled:true,
        // rules: [
        //   {
        //     required: true,
        //     message: '请输入巡查总点数',
        //     trigger: 'blur'
        //   }
        // ]
    }, {
        label: '巡查人',
        prop: 'userId',
        search:false,
        disabled:true,
        labelWidth:150,
        dicData:[],
        // rules: [
        //   {
        //     required: true,
        //     message: '请输入巡查人',
        //     trigger: 'blur'
        //   }
        // ]
    }, {
        label: '已巡查',
        prop: 'finish',
        labelWidth:150,
        disabled:true,
        // rules: [
        //   {
        //     required: true,
        //     message: '请输入已巡查点数',
        //     trigger: 'blur'
        //   }
        // ]
    }, {
        label: '漏巡查点数',
        prop: 'pointCount',
        labelWidth:150,
        disabled:true,
        // rules: [
        //   {
        //     required: true,
        //     message: '请输入漏巡查点数',
        //     trigger: 'blur'
        //   }
        // ]
    },  {
        label: '巡查情况',
        prop: 'patrolResult',
        dicData: status,
        labelWidth:150,
        type: 'select',
        search:false,
        disabled:true,
        // rules: [
        //   {
        //     required: true,
        //     message: '请输入巡查情况',
        //     trigger: 'blur'
        //   }
        // ]
    }]
}
