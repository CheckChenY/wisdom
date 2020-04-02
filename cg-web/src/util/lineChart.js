// 获取报警信息
export const getLine = (obj) => {
    let seriesData = [],serTime = [];
    let lineArryOne = [],lineArryTwo = [],lineArryTre = [],lineArryFou = [],lineArryFive = [],lineArrySix = [];
    for(let i=0;i<obj.length;i++){
        let listData = JSON.parse(obj[i].detailData);
        let tempOne = [],tempTwo = [],tempTre = [],tempFou = [],tempFive = [],tempSix = [];
        serTime.push(obj[i].createTime.substring(obj[i].createTime.length-8,obj[i].createTime.length))
        for(let j=0;j<listData.length;j++){
            let dataList = listData[j].datas;

            if(listData[j].type == 3 ){
                for(let k in dataList ){
                    tempOne.push(dataList[k])
                }
            }else if(listData[j].type == 131){
                for(let k in dataList ){
                    tempOne.push(dataList[k])
                }
            }else if(listData[j].type == 4){
                for(let k in dataList ){
                    tempTwo.push(dataList[k] / 1000)
                }
            }else if(listData[j].type == 132){
                for(let k in dataList ){
                    tempTwo.push(dataList[k])
                }
            }else if(listData[j].type == 1){
                for(let k in dataList ){
                    if (dataList[k] == 4080 || dataList[k] == 4081) {
                        tempTre.push(0)
                    } else {
                        tempTre.push(dataList[k])
                    }
                }
            }else if(listData[j].type == 129){
                for(let k in dataList ){
                    tempTre.push(dataList[k])
                }
            }else if(listData[j].type == 2){
                for(let k in dataList ){
                    if (dataList[k] == 4080 || dataList[k] == 4081) {
                        tempFou.push(0)
                    } else {
                        tempFou.push(dataList[k])
                    }
                }
            }else if(listData[j].type == 130){
                for(let k in dataList ){
                    tempFou.push(dataList[k])
                }
            }else if(listData[j].type == 23){
                for(let k in dataList ){
                    tempFive.push(dataList[k])
                }
            }else if(listData[j].type == 140){
                for(let k in dataList ){
                    tempFive.push(dataList[k])
                }
            }else if(listData[j].type == 141){
                for(let k in dataList ){
                    tempFive.push(dataList[k])
                }
            }else if(listData[j].type == 16){
                for(let k in dataList ){
                    tempSix.push(dataList[k])
                }
            }else if(listData[j].type == 144){
                for(let k in dataList ){
                    tempSix.push(dataList[k])
                }
            }else if(listData[j].type == 146){
                for(let k in dataList ){
                    tempSix.push(dataList[k])
                }
            }
        }
        lineArryOne.push(tempOne)
        lineArryTwo.push(tempTwo)
        lineArryTre.push(tempTre)
        lineArryFou.push(tempFou)
        lineArryFive.push(tempFive)
        lineArrySix.push(tempSix)
    }
    let resOne = compare(lineArryOne);
    let resTwo = compare(lineArryTwo);
    let resTre = compare(lineArryTre);
    let resFou = compare(lineArryFou);
    let resFive = compare(lineArryFive);
    let resSix = compare(lineArrySix);
    let resObj = {};
    resObj['resOne'] = resOne;
    resObj['resTwo'] = resTwo;
    resObj['resTre'] = resTre;
    resObj['resFou'] = resFou;
    resObj['resFive'] = resFive;
    resObj['resSix'] = resSix;
    resObj['serTime'] = serTime;
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
            if (!arr[n][m]) arr[n][m] = 0;
            temp.push(arr[n][m]);
        }
        result.push(temp);
    }
    return result;
}