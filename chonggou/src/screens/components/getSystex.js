import FetchManager from '../fetch/index';

export const getSystem = () => {
    //获取系统类型
    let systemArry = [{label:'系统类别(全部)',value:0}];
    let obj = {
        type:1
    }
    return new Promise((resolve, reject) => {
        FetchManager.post('/device/inner/jtlDeviceSystemDic/findListApp',obj, (set) => {
            //下面的就是请求来的数据
            // console.log(set)
            let data = set.value;
            if(set&&set.value){
                for(let i=0;i<data.length;i++ ){
                    // let systemObj = {};
                    data[i].label = data[i].dataDicDesc;
                    data[i].value = data[i].id;
                    systemArry.push(data[i])
                }
            }
            resolve(systemArry)
        }) 
    })
}

export const getDevice = () => {
    //获取设备类型
    let systemArry = [];
    return new Promise((resolve, reject) => {
        FetchManager.get('1/dict/type/device_type','', async (set) => {
            //下面的就是请求来的数据
            let data = set.data;
            if(set&&set.data){
                for(let i=0;i<data.length;i++ ){
                    // let systemObj = {};
                    // systemObj['label'] = data[i].label;
                    // systemObj['value'] = data[i].value;
                    data[i].label = data[i].dataDicDesc;
                    data[i].value = data[i].id;
                    systemArry.push(systemObj)
                }
            }
            resolve(systemArry)
        }) 
    })
}

export const getDict = (key) => {
    //获取设备类型
    let dictArry = [];
    return new Promise((resolve, reject) => {
        FetchManager.get('1/dict/type/' + key,'', async (set) => {
            //下面的就是请求来的数据
            let data = set.data;
            if(set&&set.data){
                for(let i=0;i<data.length;i++ ){
                    let dictObj = {};
                    dictObj['label'] = data[i].label;
                    dictObj['value'] = data[i].value;
                    dictArry.push(dictObj)
                }
            }
            resolve(dictArry)
        }) 
    })
}



//获取全部楼层
export const getAllFloor = () => {
    let systemArry = [];
    return new Promise((resolve, reject) => {
        FetchManager.get('/company/inner/jtlCompanyBuilding/findList','', async (set) => {
            //下面的就是请求来的数据
            // console.log(set)
            if(set&&set.success&&set.value.length > 0){
                let data = set.value;
                for(let i=0;i<data.length;i++ ){
                    // let systemObj = {};
                    // systemObj['label'] = data[i].buildingCode;
                    // systemObj['value'] = data[i].id;
                    // systemObj['buildingCode'] = data[i].usageNature;
                    
                    // systemArry.push(systemObj)

                    data[i].label = data[i].buildingCode;
                    data[i].value = data[i].id;
                    systemArry.push(data[i])
                }
            }
            resolve(systemArry)
        }) 
    })
}

export const getSigleFloor = (code) => {
    //获取单个楼层
    let systemArry = [];
    return new Promise((resolve, reject) => {
        let obj = {
            buildingCode:code
        }
        FetchManager.get('/company/inner/jtlCompanyFloor/findByBuildCode',obj, async (set) => {
            //下面的就是请求来的数据
            console.log(set)
            if(set&&set.success){
                let data = set.value;
                for(let i=0;i<data.length;i++ ){
                    // let systemObj = {};
                    // systemObj['label'] = data[i].floorCode;
                    // systemObj['value'] = data[i].id;
                    // systemArry.push(systemObj)

                    data[i].label = data[i].floorCode;
                    data[i].value = data[i].id;
                    systemArry.push(data[i])
                }
            }
            resolve(systemArry)
        }) 
    })
}

export const getAllFloorName = () => {
    //获取全部楼层
    let systemArry = [];
    return new Promise((resolve, reject) => {
        FetchManager.get('1/unitbuilding/tree',{limit:100}, async (set) => {
            //下面的就是请求来的数据
            let data = set.data.building;
            if(set&&set.data){
                for(let i=0;i<data.length;i++ ){
                    let systemObj = {};
                    systemObj[data[i].id] = data[i].buildingCode;
                    // systemObj['value'] = data[i].id;
                    systemArry.push(systemObj)
                }
            }
            resolve(systemArry)
        }) 
    })
}