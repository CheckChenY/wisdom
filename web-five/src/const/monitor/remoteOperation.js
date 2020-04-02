// deviceId: "1905110101000002"
// id: 52
// operationDes: "隐患排除，远程复位"
// operationFeedback: "远程消音成功"
// operationTime: "2019-06-11T09:02:27"
// operationType: 1
// operator: 136
// orgId: 63
  export const operationOption = {
    'border': true,
    'stripe': true,
    'menuAlign': "center",
    'align': "center",
    'menu': false,
    'addBtn': false,
    'dic': [],
    'searchBtn': false,
    'column': [{
      label: '操作时间',
      prop: 'operationTime',
      span: 12,
      type: 'date',
      format: 'yyyy-MM-dd HH:mm:ss',
      more:true,
    },{
        label: '操作用户',
        prop: 'operator',
        span: 12,
        type: 'select',
        dicData: [],
      },{
        label: '操作',
        prop: 'operationType',
        search: true,
        span: 12,
        type: 'select',
        dicData: [
          {
            label:'自检',
            value:0
          },{
            label:'消音',
            value:1
          },{
            label:'复位',
            value:2
          },{
            label:'远程上电',
            value:3
          },{
            label:'远程断电',
            value:4
          }
        ],
      },{
        label: '操作说明',
        prop: 'operationDes',
        span: 12,
        type: 'select',
        dicData: [],
      },{
      label: '操作反馈',
      prop: 'operationFeedback',
      span: 12,
      type: 'select',
      dicData: [],
    }]
  } 