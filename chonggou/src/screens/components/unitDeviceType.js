
import FetchManager from '../fetch/index';
import { getSigleFloor } from './getSystex';
import { dataAnalisys } from './analisys';
export const unitDevice = (deviceId) => {
    var _params={
        deviceId:deviceId
    }
    return new Promise((resolve, reject) => {

        let obj = {};

        FetchManager.get('1/unitdevice/pageAndWarnLevel',_params, (set) => {
            // console.log(set)
            let paramList = dataAnalisys(JSON.parse(set.data[0].deviceParam));
            // console.log(paramList)
            if(!parseInt(set.code)){
                if(set.data[0]){
                    getSigleFloor(set.data[0].buildingId).then(res=>{
                        if(res.length){
                            res.forEach(s=>{
                                if(parseInt(s.value)==set.data[0].floorId){
                                    set.data[0].floorId=s.label
                                }   
                            })
                        }
                    })
                    set.data[0].createTime=set.data[0].createTime.replace('T',' ')
                    // var obj=set.data[0]
                    obj['paramList'] = paramList;
                    obj['deviceParam'] = set.data[0];

                    //根据deviceType判断操作类型
                    var options={
                        zijian:false,
                        fuwei:false,
                        xiaoyin:false
                    }
                    var num=parseInt(set.data[0].deviceType)
                    if(num==20||num==21||num==22||num==23||num==24||num==37||num==38||num==39){
                        options.fuwei=true
                        options.zijian=true
                    }else if(num==25||num==36||num==40||num==41||num==42||num==43){
                        options.fuwei=true
                        options.zijian=true
                        options.xiaoyin=true
                    }else if(num==26){
                        options.xiaoyin=true
                    }else if(num==34||num==35){
                        options.fuwei=true
                    }
    
                    //判断是否有操作记录
                    var haveRecord=false
                    for(let i in options){
                        if(options[i]){
                            haveRecord=true
                        }
                    }
                    
                    obj['options'] = options;
                    obj['haveRecord'] = haveRecord;
                    
                    resolve(obj)

                    // this.props.navigation.navigate(url,{
                    //     // data:obj,
                    //     options:options,
                    //     haveRecord:haveRecord
                    // })
                }
            }
        })
    })
}