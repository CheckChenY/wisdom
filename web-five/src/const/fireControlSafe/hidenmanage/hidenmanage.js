
export const dealOption = {
    labelWidth: 120,
    indexLabel:'序号',
    index:true,
    emptyBtn: false,
    refreshBtn:false,
    editBtn:false,
    delBtn:false,
    addBtn:false,
    clearBtn:false,
    border:true,
    align:'center',
    column: [{
        label: "隐患上传时间",
        type:'date',
        prop: "reportTime",
        minWidth:100,
        span: 12,
    },{
        label: "上传人员",
        type:'select',
        dicData:[],
        prop: "userId",
        span: 12,
    },{
        label: "所在建筑",
        type:'select',
        dicData:[],
        prop: "buildingId",
        span: 12,
    },{
        label: "楼层/区域",
        type:'select',
        dicData:[],
        prop: "floorId",
        span: 12,
    },{
        label: "所在位置",
        prop: "position",
        span: 12,
    },{
        label: "隐患来源",
        type:'select',
        dicData:[{
            label:'一键上报',
            value:'1'
        },{
            label:'巡查上报',
            value:'2'
        }],
        prop: "source",
        search:true,
        span: 12,
    },{
        label: "隐患上报日期",
        type:'daterange',
        hide:true,
        prop:'dealReport',
        search:true,
        span: 12,
    },{
        label: "隐患图片",
        slot:true,
        prop: "scenePhoto",
        span: 12,
    },]
}

export const recordOption = {
    labelWidth: 120,
    indexLabel:'序号',
    index:true,
    emptyBtn: false,
    refreshBtn:false,
    editBtn:false,
    delBtn:false,
    addBtn:false,
    clearBtn:true,
    border:true,
    align:'center',
    column: [{
        label: "隐患上传时间",
        minWidth:100,
        type:'date',
        prop: "reportTime",
        span: 12,
    },{
        label: "上传人员",
        type:'select',
        dicData:[],
        prop: "userId",
        span: 12,
    },{
        label: "所在建筑",
        type:'select',
        dicData:[],
        prop: "buildingId",
        span: 12,
    },{
        label: "楼层/区域",
        type:'select',
        dicData:[],
        prop: "floorId",
        span: 12,
    },{
        label: "所在位置",
        prop: "position",
        span: 12,
    },{
        label: "隐患来源",
        type:'select',
        dicData:[{
            label:'一键上报',
            value:'1'
        },{
            label:'巡查上报',
            value:'2'
        }],
        prop: "source",
        span: 12,
    },{
        label: "处理人",
        type:'select',
        prop:'hander',
        dicData:[],
        search:true,
        span: 12,
    },{
        label: "隐患上报日期",
        type:'daterange',
        hide:true,
        prop:'recordReport',
        search:true,
        span: 12,
    },]
}
