// import console = require("console");
import moment from 'moment';

export const changeTime = (time) => {
    if( !time){
        return ''
    }
    let nativeDate2 = new Date(time)
    let t = moment(nativeDate2).format('YYYY[-]MM[-]DD')
    return t;
}
// 获取报警信息
export const getLine = (obj,systemId) => {
    // debugger;
    // if(obj.length === 0){
    //     return
    // }
    console.log(systemId)
    let seriesData = [],serTime = [];
    let lineArryOne = [],lineArryTwo = [],lineArryTre = [],lineArryFou = [],line_water23=[],line_water140=[],line_water141=[];
    for(let i=0;i<obj.length;i++){
        let listData = JSON.parse(obj[i].detailData);
        let tempOne = [],tempTwo = [],tempTre = [],tempFou = [],temp_wate23=[],temp_wate140=[],temp_wate141=[];
        // debugger;
        // serTime.push(obj[i].createTime.substring(obj[i].createTime.length-8,obj[i].createTime.length))
        serTime.push(changeTime(obj[i].createTime))
        for(let j=0;j<listData.length;j++){

            let dataList = listData[j].datas;

            if(listData[j].type === 3 || listData[j].type == 131){
                for(let k in dataList ){
                    tempOne.push(dataList[k])
                }
            }else if(listData[j].type === 4 || listData[j].type == 132){
                for(let k in dataList ){
                    tempTwo.push(dataList[k])
                }
                // console.log(tempOne)
            }else if(listData[j].type === 1 || listData[j].type == 129){
                for(let k in dataList ){
                    tempTre.push(dataList[k])
                }
                // console.log(tempOne)
            }else if(listData[j].type === 2 || listData[j].type == 130){
                for(let k in dataList ){
                    tempFou.push(dataList[k])
                }
                // console.log(tempOne)
            }else if(listData[j].type === 23 || listData[j].type === 16){
                for(let k in dataList ){
                    line_water23.push(dataList[k])
                }
            }else if(listData[j].type === 140 || listData[j].type === 144){
                for(let k in dataList ){
                    line_water140.push(dataList[k])
                }
                // console.log(tempOne)
            }else if(listData[j].type === 141 || listData[j].type === 146){
                for(let k in dataList ){
                    line_water141.push(dataList[k])
                }
            }
        }

        

        lineArryOne.push(tempOne)
        lineArryTwo.push(tempTwo)
        lineArryTre.push(tempTre)
        lineArryFou.push(tempFou)

        // line_water23 = temp_water23
        // line_water140 = temp_water140
        // line_water141 = temp_water141

        // console.log(line_water23);
        // console.log(lineArryTwo);         
        // this.dynamicTime.push(data[i].createTime.substring(data[i].createTime.length-8,data[i].createTime.length))
    }
    
    // debugger;
    //             // let goodsData = require('./warn.json')

    let resOne = compare(lineArryOne);
    let resTwo = compare(lineArryTwo);
    let resTre = compare(lineArryTre);
    let resFou = compare(lineArryFou);
    // let resName = ['Ua1','Ub1','Uc1','Ua2','Ub2','Uc2','过压','欠压'];
    // let resColor = ['#2f4554','#61a0a8','#d48265','#91c7ae','#38a3ec','#5cdd00','#ffbb2a','#fd3e3c'];
    // console.log(lineArryOne);
    // console.log(lineArryTwo);
    // console.log(resOne);
    // console.log(resTwo);

    let resObj = {};
    if(Number(systemId) === 3){

        resObj['resOne'] = resOne;
        resObj['resTwo'] = resTwo;
        resObj['resTre'] = resTre;
        resObj['resFou'] = resFou;
    }else if(Number(systemId) === 2){
        resObj['water23'] = line_water23;
        resObj['water140'] = line_water140;
        resObj['water141'] = line_water141;

        // line_water23.push(temp_water23)
        // line_water140.push(temp_water140)
        // line_water141.push(temp_water141)
    }else if(Number(systemId) === 8){
        resObj['resOne'] = resOne;
        resObj['resTwo'] = resTwo;
        resObj['resTre'] = resTre;
        resObj['resFou'] = resFou;
    }
    resObj['serTime'] = serTime;
    // resObj['resName'] = resName;
    // resObj['resColor'] = resColor;
    
    
    console.log(resObj)

    
    return resObj;
}


export const compare = (arr) => {
    let maxlen = 0;
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > maxlen) {
            maxlen = arr[i].length;
        }
    }
    //maxlen  取最大数组长度
    for (let m = 0; m < maxlen; m++) {
        let temp = [];
        for (let n = 0; n < arr.length; n++) {
            // if (!arr[n][m]){
            //     arr[n][m] = 0;
            // } else{
            //     temp.push(arr[n][m]);
            // }
            
            if (!arr[n][m]) arr[n][m] = 0;
            temp.push(arr[n][m]);
        }
        result.push(temp);
    }
    return result;
}