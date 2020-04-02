
// export default({
//     'JTL-ZHR2P/C':2,
//     'JTL-ZH4P/CL':4,
//     'JTL-M8L-125/3N':3,
//     'JTL-M8L-400/3N':3,
//     'JTL-M8L-250/3N':3,
//     'JTL-M8L-630/3N':3,
//     'JTL-M8L-800/3N':3,
// })
import moment from 'moment';

const data = [

    {label:'JTL-ZN1P/C',value:1},
    
    {label:'JTL-ZHR2P/C',value:2},
    {label:'JTL-ZHR2P/CL',value:2},
    {label:'JTL-ZH2P/CL',value:2},
    {label:'JTL-JD2PL',value:2},
    
    {label:'JTL-ZN3P/C',value:3},

    // {label:'JTL-WG/ZD',value:4},
    {label:'JTL-ZH4P/CL',value:4},
    {label:'JTL-ZDC4PL',value:4},
    
    // {label:'JTL-WG/CHZ',value:5},
    {label:'JTL-M8L-125/3N',value:5},
    {label:'JTL-M8L-400/3N',value:5},
    {label:'JTL-M8L-250/3N',value:5},
    {label:'JTL-M8L-800/3N',value:5},
    {label:'JTL-M8L-630/3N',value:5},]

export const getDeviceModal = (modal) => {
    let num;
    data.forEach(item=>{
        if(item.label === modal){
            // debugger
            num = item.value
        }
    })
    return num
}


export const getDeviceModalList = (nub) => {
    let list=[];
    if(nub === 1){
        list = [{EchartsType: '电压',select: true,id:'3',unit:'V'
            // }, {EchartsType: '电流',select: false,id:'4',unit:'A'
        }]
    }else if(nub === 2){
        list = [{EchartsType: '电压',select: true,id:'3',unit:'V'
            }, {EchartsType: '电流',select: false,id:'4',unit:'A'
            }, {EchartsType: '温度',select: false,id:'2',unit:'℃'
            }, {EchartsType: '漏电',select: false,id:'1',unit:'A'
            }, {EchartsType: '功率',select: false,id:'7',unit:'Kw.h'
            }, {EchartsType: '电能',select: false,id:'8',unit:'A'
        }]
    }else if(nub === 3){
        list = [{EchartsType: '电压',select: true,id:'3,51,67',unit:'V'
            // }, {EchartsType: '电流',select: false,id:'4,52,68',unit:'A'
            // }, {EchartsType: '温度',select: false,id:'2',unit:'A'
            // }, {EchartsType: '漏电',select: false,id:'1',unit:'A'
            // }, {EchartsType: '功率',select: false,id:'7',unit:'A'
            // }, {EchartsType: '电能',select: false,id:'8',unit:'A'
        }]
    }else if(nub === 4){
        list = [{EchartsType: '电压',select: true,id:'3,51,67',unit:'V'
            }, {EchartsType: '电流',select: false,id:'4,52,68',unit:'A'
            }, {EchartsType: '温度',select: false,id:'2,50,66,',unit:'℃'
            }, {EchartsType: '漏电',select: false,id:'1',unit:'A'
            }, {EchartsType: '功率',select: false,id:'33,34,35',unit:'Kw.h'
            }, {EchartsType: '电能',select: false,id:'8',unit:'A'
        }]
    }else if(nub === 5){
        list = [{EchartsType: '电压',select: true,id:'3,51,67',unit:'V'
            }, {EchartsType: '电流',select: false,id:'4,52,68',unit:'A'
            }, {EchartsType: '漏电',select: false,id:'1',unit:'A'
        }]
    }
    return list
}

export const getEchartModal = (data,i) => {
    let legend=[],arrtime=[];
    let obj = {};
    if(i === 2){
        console.log(data)
        let arrdata=[],arrtime=[];
        data.length > 0 && data.forEach((item,i)=>{
            let arr = item.numericalAnalysisVo;
            arrdata.push(arr[0].data);
            arrtime.push(moment(arr[0].createTime).format('LT'))
            legend.push(arr[0].remark)
            // arr.forEach((show,i)=>{
            //     arrdata.push(show.data);
            //     arrtime.push(moment(show.createTime).format('LT'))
            //     legend.push(show.remark)
            // })
        })
        obj.data = arrdata;
        obj.time = arrtime;
        obj.legend = legend;
    }else if(i === 4 || i === 5){
        
        console.log(data)
        let arrdata1=[],arrdata2=[],arrdata3=[];
        data.length > 0 && data.forEach((item,i)=>{
            let arr = item.numericalAnalysisVo;
            arrdata1.push(arr[0].data);
            arrdata2.push(arr[1].data);
            arrdata3.push(arr[2].data);
            legend.push(arr[0].remark)
            arrtime.push(moment(arr[0].createTime).format('LT'))
        })
        obj.arrdata1 = arrdata1;
        obj.arrdata2 = arrdata2;
        obj.arrdata3 = arrdata3;
        obj.legend = legend;
        obj.time = arrtime;
    }
    console.log(obj)
    return obj
}

